import { prisma } from "../lib/prisma.js";
import { slugify } from "../utils/slug.js";
import { fail, ok } from "../utils/response.js";

export const list = async (req, res) => {
  const activeOnly = req.query.active !== "false";
  const tags = await prisma.emotionalTag.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return ok(res, tags);
};

export const getById = async (req, res) => {
  const tag = await prisma.emotionalTag.findUnique({
    where: { id: Number(req.params.id) },
    include: { products: { include: { product: true } } },
  });
  if (!tag) return fail(res, "Tag not found", 404);
  return ok(res, tag);
};

export const create = async (req, res) => {
  const { name, slug, isActive } = req.body;
  if (!name) return fail(res, "Name is required");

  const tag = await prisma.emotionalTag.create({
    data: { name, slug: slug || slugify(name), isActive: isActive ?? true },
  });
  return ok(res, tag, 201);
};

export const update = async (req, res) => {
  const { name, slug, isActive } = req.body;
  const tag = await prisma.emotionalTag.update({
    where: { id: Number(req.params.id) },
    data: {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(isActive !== undefined && { isActive }),
    },
  });
  return ok(res, tag);
};

export const remove = async (req, res) => {
  await prisma.emotionalTag.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Tag deleted" });
};
