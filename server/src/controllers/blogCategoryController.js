import { prisma } from "../lib/prisma.js";
import { slugify } from "../utils/slug.js";
import { fail, ok } from "../utils/response.js";

export const list = async (req, res) => {
  const activeOnly = req.query.active !== "false";
  const categories = await prisma.blogCategory.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });
  return ok(res, categories);
};

export const getById = async (req, res) => {
  const category = await prisma.blogCategory.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: { where: { published: true }, take: 10 } },
  });
  if (!category) return fail(res, "Category not found", 404);
  return ok(res, category);
};

export const getBySlug = async (req, res) => {
  const category = await prisma.blogCategory.findUnique({
    where: { slug: req.params.slug },
    include: { posts: { where: { published: true } } },
  });
  if (!category) return fail(res, "Category not found", 404);
  return ok(res, category);
};

export const create = async (req, res) => {
  const { name, slug, description, isActive } = req.body;
  if (!name) return fail(res, "Name is required");

  const category = await prisma.blogCategory.create({
    data: {
      name,
      slug: slug || slugify(name),
      description,
      isActive: isActive ?? true,
    },
  });
  return ok(res, category, 201);
};

export const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name, slug, description, isActive } = req.body;

  const category = await prisma.blogCategory.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(description !== undefined && { description }),
      ...(isActive !== undefined && { isActive }),
    },
  });
  return ok(res, category);
};

export const remove = async (req, res) => {
  await prisma.blogCategory.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Category deleted" });
};
