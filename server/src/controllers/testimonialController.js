import { prisma } from "../lib/prisma.js";
import { fail, ok } from "../utils/response.js";

export const list = async (req, res) => {
  const publishedOnly = req.query.published !== "false";
  const testimonials = await prisma.testimonial.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return ok(res, testimonials);
};

export const getById = async (req, res) => {
  const testimonial = await prisma.testimonial.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!testimonial) return fail(res, "Testimonial not found", 404);
  return ok(res, testimonial);
};

export const create = async (req, res) => {
  const { name, content, image, rating, published, sortOrder } = req.body;
  if (!name || !content) return fail(res, "Name and content are required");

  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      content,
      image,
      rating: rating ?? 5,
      published: published ?? true,
      sortOrder: sortOrder ?? 0,
    },
  });
  return ok(res, testimonial, 201);
};

export const update = async (req, res) => {
  const { name, content, image, rating, published, sortOrder } = req.body;
  const testimonial = await prisma.testimonial.update({
    where: { id: Number(req.params.id) },
    data: {
      ...(name && { name }),
      ...(content && { content }),
      ...(image !== undefined && { image }),
      ...(rating !== undefined && { rating }),
      ...(published !== undefined && { published }),
      ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
    },
  });
  return ok(res, testimonial);
};

export const remove = async (req, res) => {
  await prisma.testimonial.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Testimonial deleted" });
};
