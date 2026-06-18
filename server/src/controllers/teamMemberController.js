import { prisma } from "../lib/prisma.js";
import { slugify } from "../utils/slug.js";
import { fail, ok } from "../utils/response.js";

function normalizeSocialUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function pickSocialUrls(body) {
  const fields = ["facebookUrl", "twitterUrl", "linkedinUrl", "instagramUrl"];
  const result = {};
  for (const field of fields) {
    if (body[field] !== undefined) {
      result[field] = normalizeSocialUrl(body[field]);
    }
  }
  return result;
}

function parseSortOrder(value, fallback = 0) {
  if (value === undefined || value === null || value === "") return fallback;
  const num = Number(value);
  return Number.isFinite(num) ? Math.trunc(num) : fallback;
}

async function linkDoctorAccount(email, teamMemberId) {
  if (!email?.trim()) return;
  const doctorUser = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!doctorUser) {
    throw new Error(`No user found with email: ${email}`);
  }
  await prisma.teamMember.updateMany({
    where: { userId: doctorUser.id, id: { not: teamMemberId } },
    data: { userId: null },
  });
  await prisma.user.update({
    where: { id: doctorUser.id },
    data: { role: "DOCTOR" },
  });
  await prisma.teamMember.update({
    where: { id: teamMemberId },
    data: { userId: doctorUser.id },
  });
}

export const list = async (req, res) => {
  const publishedOnly = req.query.published !== "false";
  const members = await prisma.teamMember.findMany({
    where: publishedOnly ? { published: true } : {},
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { user: { select: { email: true } } },
  });
  return ok(res, members);
};

export const getById = async (req, res) => {
  const member = await prisma.teamMember.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!member) return fail(res, "Team member not found", 404);
  return ok(res, member);
};

export const getBySlug = async (req, res) => {
  const member = await prisma.teamMember.findUnique({
    where: { slug: req.params.slug },
  });
  if (!member || (!member.published && req.user?.role !== "ADMIN")) {
    return fail(res, "Team member not found", 404);
  }
  return ok(res, member);
};

export const create = async (req, res) => {
  const {
    name,
    slug,
    degree,
    experience,
    image,
    bio,
    expertise,
    portfolio,
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    instagramUrl,
    published,
    sortOrder,
    doctorLoginEmail,
  } = req.body;

  if (!name) return fail(res, "Name is required");

  const member = await prisma.teamMember.create({
    data: {
      name,
      slug: slug || slugify(name),
      degree,
      experience,
      image,
      bio,
      expertise,
      portfolio,
      ...pickSocialUrls({
        facebookUrl,
        twitterUrl,
        linkedinUrl,
        instagramUrl,
      }),
      published: published ?? true,
      sortOrder: parseSortOrder(sortOrder),
    },
  });

  if (doctorLoginEmail?.trim()) {
    try {
      await linkDoctorAccount(doctorLoginEmail, member.id);
    } catch (err) {
      return fail(res, err.message, 400);
    }
  }

  const withUser = await prisma.teamMember.findUnique({
    where: { id: member.id },
    include: { user: { select: { email: true } } },
  });
  return ok(res, withUser, 201);
};

export const update = async (req, res) => {
  const {
    name,
    slug,
    degree,
    experience,
    image,
    bio,
    expertise,
    portfolio,
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    instagramUrl,
    published,
    sortOrder,
    doctorLoginEmail,
  } = req.body;

  const social = pickSocialUrls({
    facebookUrl,
    twitterUrl,
    linkedinUrl,
    instagramUrl,
  });

  const member = await prisma.teamMember.update({
    where: { id: Number(req.params.id) },
    data: {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(degree !== undefined && { degree }),
      ...(experience !== undefined && { experience }),
      ...(image !== undefined && { image }),
      ...(bio !== undefined && { bio }),
      ...(expertise !== undefined && { expertise }),
      ...(portfolio !== undefined && { portfolio }),
      ...social,
      ...(published !== undefined && { published }),
      ...(sortOrder !== undefined && { sortOrder: parseSortOrder(sortOrder) }),
    },
  });

  if (doctorLoginEmail !== undefined && doctorLoginEmail?.trim()) {
    try {
      await linkDoctorAccount(doctorLoginEmail, member.id);
    } catch (err) {
      return fail(res, err.message, 400);
    }
  }

  const withUser = await prisma.teamMember.findUnique({
    where: { id: member.id },
    include: { user: { select: { email: true } } },
  });
  return ok(res, withUser);
};

export const remove = async (req, res) => {
  await prisma.teamMember.delete({ where: { id: Number(req.params.id) } });
  return ok(res, { message: "Team member deleted" });
};
