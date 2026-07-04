import { prisma } from "../lib/prisma.js";
import { slugify } from "../utils/slug.js";
import { fail, ok } from "../utils/response.js";

const postInclude = {
  category: true,
  postsCategory: { include: { category: true } },
};

export const list = async (req, res) => {
  const { published, categoryId, categorySlug, page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const where = {};

  if (req.user?.role === "ADMIN") {
    if (published === "true") where.published = true;
    else if (published === "false") where.published = false;
  } else if (published === "true" || published !== "false") {
    where.published = true;
  } else if (published === "false") {
    where.published = false;
  }

  if (categoryId) where.categoryId = Number(categoryId);
  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: postInclude,
      orderBy: { publishedAt: "desc" },
      skip,
      take: Number(limit),
    }),
    prisma.post.count({ where }),
  ]);

  return ok(res, {
    posts,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    },
  });
};

export const getById = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.id) },
    include: postInclude,
  });
  if (!post) return fail(res, "Post not found", 404);
  if (!post.published && !req.user) return fail(res, "Post not found", 404);
  return ok(res, post);
};

export const getBySlug = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { slug: req.params.slug },
    include: postInclude,
  });
  if (!post) return fail(res, "Post not found", 404);
  if (!post.published && !req.user) return fail(res, "Post not found", 404);
  return ok(res, post);
};

export const create = async (req, res) => {
  const {
    title,
    titleHi,
    slug,
    excerpt,
    excerptHi,
    content,
    contentHi,
    image,
    author,
    published,
    categoryId,
    categoryIds,
  } = req.body;

  if (!title || !content) return fail(res, "Title and content are required");

  const post = await prisma.post.create({
    data: {
      title,
      titleHi: titleHi ?? null,
      slug: slug || slugify(title),
      excerpt,
      excerptHi: excerptHi ?? null,
      content,
      contentHi: contentHi ?? null,
      image,
      author,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
      categoryId: categoryId ? Number(categoryId) : null,
      postsCategory: categoryIds?.length
        ? {
            create: categoryIds.map((id) => ({
              categoryId: Number(id),
            })),
          }
        : undefined,
    },
    include: postInclude,
  });

  return ok(res, post, 201);
};

export const update = async (req, res) => {
  const id = Number(req.params.id);
  const {
    title,
    titleHi,
    slug,
    excerpt,
    excerptHi,
    content,
    contentHi,
    image,
    author,
    published,
    categoryId,
    categoryIds,
  } = req.body;

  const data = {
    ...(title && { title }),
    ...(titleHi !== undefined && { titleHi }),
    ...(slug && { slug }),
    ...(excerpt !== undefined && { excerpt }),
    ...(excerptHi !== undefined && { excerptHi }),
    ...(content && { content }),
    ...(contentHi !== undefined && { contentHi }),
    ...(image !== undefined && { image }),
    ...(author !== undefined && { author }),
    ...(categoryId !== undefined && {
      categoryId: categoryId ? Number(categoryId) : null,
    }),
  };

  if (published !== undefined) {
    data.published = published;
    data.publishedAt = published ? new Date() : null;
  }

  if (categoryIds) {
    await prisma.postsCategory.deleteMany({ where: { postId: id } });
    data.postsCategory = {
      create: categoryIds.map((catId) => ({ categoryId: Number(catId) })),
    };
  }

  const post = await prisma.post.update({
    where: { id },
    data,
    include: postInclude,
  });

  return ok(res, post);
};

export const remove = async (req, res) => {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Post deleted" });
};
