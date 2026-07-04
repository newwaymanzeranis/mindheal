import { prisma } from "../lib/prisma.js";
import { fail, ok } from "../utils/response.js";

export const list = async (req, res) => {
  const publishedOnly = req.query.published !== "false";
  const slides = await prisma.homeSlide.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return ok(res, slides);
};

export const getById = async (req, res) => {
  const slide = await prisma.homeSlide.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!slide) return fail(res, "Slide not found", 404);
  return ok(res, slide);
};

export const create = async (req, res) => {
  const { title, titleHi, subtitle, subtitleHi, image, published, sortOrder } =
    req.body;
  if (!title || !image) return fail(res, "Title and image are required");

  const slide = await prisma.homeSlide.create({
    data: {
      title,
      titleHi: titleHi ?? null,
      subtitle,
      subtitleHi: subtitleHi ?? null,
      image,
      published: published ?? true,
      sortOrder: sortOrder ?? 0,
    },
  });
  return ok(res, slide, 201);
};

export const update = async (req, res) => {
  const { title, titleHi, subtitle, subtitleHi, image, published, sortOrder } =
    req.body;
  const slide = await prisma.homeSlide.update({
    where: { id: Number(req.params.id) },
    data: {
      ...(title && { title }),
      ...(titleHi !== undefined && { titleHi }),
      ...(subtitle !== undefined && { subtitle }),
      ...(subtitleHi !== undefined && { subtitleHi }),
      ...(image && { image }),
      ...(published !== undefined && { published }),
      ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
    },
  });
  return ok(res, slide);
};

export const remove = async (req, res) => {
  await prisma.homeSlide.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Slide deleted" });
};
