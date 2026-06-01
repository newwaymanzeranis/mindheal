import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mindheal.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const password = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password,
      name: "Mind Heal Admin",
      role: "ADMIN",
    },
  });

  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: "bach-flower" },
      update: {},
      create: {
        name: "Bach Flower",
        slug: "bach-flower",
        description: "Articles about Bach Flower remedies",
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "emotional-health" },
      update: {},
      create: {
        name: "Emotional Health",
        slug: "emotional-health",
        description: "Emotional wellness and healing",
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "healing-stories" },
      update: {},
      create: {
        name: "Healing Stories",
        slug: "healing-stories",
        description: "Real healing journeys from our clients",
      },
    }),
  ]);

  const healingCategory = categories.find((c) => c.slug === "healing-stories");
  const blogCategory = categories.find((c) => c.slug === "bach-flower");

  const products = [
    {
      name: "Obsessive-Compulsive Disorder (OCD)",
      slug: "ocd-mix",
      description: "Pre-mixed remedy for OCD-related emotional patterns.",
      image: "/assets/img/bach/no01.jpeg",
      emotionalTags:
        "ocd, anxiety, repetitive-thoughts, mental-loop, overthinking",
    },
    {
      name: "Social/Emotional Issues",
      slug: "social-emotional-mix",
      description: "Support for social and emotional challenges.",
      image: "/assets/img/bach/no02.jpeg",
      emotionalTags: "anxiety, social-anxiety, emotional-balance, confidence",
    },
    {
      name: "Hyperactivity & concentration problems",
      slug: "hyperactivity-mix",
      description: "Calming support for hyperactivity and focus.",
      image: "/assets/img/bach/no03.jpeg",
      emotionalTags: "hyperactivity, concentration, focus, restlessness, calm",
    },
    {
      name: "Exam stress",
      slug: "exam-stress-mix",
      description: "Calming blend for students under exam pressure.",
      image: "/assets/img/bach/no04.png",
      emotionalTags: "exam-stress, anxiety, focus, memory, confidence",
    },
    {
      name: "General phobia",
      slug: "general-phobia-mix",
      description: "Gentle remedy for general phobias and fears.",
      image: "/assets/img/bach/no05.jpeg",
      emotionalTags: "phobia, fear, anxiety, panic, calm",
    },
    {
      name: "Comitment phobia",
      slug: "commitment-phobia-mix",
      description: "Emotional support for commitment-related fears.",
      image: "/assets/img/bach/no06.jpeg",
      emotionalTags: "commitment-phobia, fear, anxiety, trust, emotional-balance",
    },
    {
      name: "Separation anxiety",
      slug: "separation-anxiety-mix",
      description: "Helps ease separation anxiety naturally.",
      image: "/assets/img/bach/no07.jpeg",
      emotionalTags: "separation-anxiety, anxiety, attachment, calm, emotional-balance",
    },
    {
      name: "Quit Smoking",
      slug: "quit-smoking-mix",
      description: "Bach flower blend to support quitting smoking.",
      image: "/assets/img/bach/no08.jpeg",
      emotionalTags: "quit-smoking, addiction, calm, willpower, sleep",
    },
  ];

  for (const [index, item] of products.entries()) {
    const mindHealNo = String(index + 1).padStart(2, "0");

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        shortDescription: item.description,
        image: item.image,
        mrp: 400,
        price: 250,
        published: true,
        sortOrder: index,
        mindHealNo,
        emotionalTags: item.emotionalTags,
      },
      create: {
        name: item.name,
        slug: item.slug,
        mindHealNo,
        description: item.description,
        shortDescription: item.description,
        image: item.image,
        mrp: 400,
        price: 250,
        published: true,
        sortOrder: index,
        emotionalTags: item.emotionalTags,
      },
    });
  }

  const slides = [
    {
      title: "Harmonizing the Mind - Emotional Balance and Inner Peace",
      subtitle:
        "Harmonizing the Mind: Bach Flower Remedies for Emotional Balance and Inner Peace",
      image: "/assets/img/hero_1.jpeg",
      sortOrder: 0,
    },
    {
      title: "Bach Flowers Restore Mental Clarity and Calm",
      subtitle: "Nature's Emotional Alchemy: How Bach Flowers Restore Mental Clarity and Calm",
      image: "/assets/img/hero_2.png",
      sortOrder: 1,
    },
    {
      title: "Gentle Healing - Bach Flower Medicine for Modern Mental Health",
      subtitle:
        "Gentle Healing, Profound Results: Bach Flower Medicine for Modern Mental Health",
      image: "/assets/img/hero_3.png",
      sortOrder: 2,
    },
  ];

  await prisma.homeSlide.deleteMany({});
  await prisma.homeSlide.createMany({ data: slides });

  const testimonials = [
    {
      name: "Aisha K.",
      content:
        "After using the customized Bach Flower blend, I feel more balanced and stress-free. Truly a natural miracle!",
      image: "/assets/img/testimonials/testi1.png",
      rating: 5,
      sortOrder: 1,
    },
    {
      name: "Rohit M.",
      content:
        "I struggled with anxiety for years, but these remedies have brought so much calm into my life. Highly recommended!",
      image: "/assets/img/testimonials/testi2.png",
      rating: 5,
      sortOrder: 2,
    },
    {
      name: "Neha S.",
      content:
        "My son's emotional meltdowns have reduced significantly. The remedy worked wonders without any side effects!",
      image: "/assets/img/testimonials/testi3.png",
      rating: 5,
      sortOrder: 3,
    },
    {
      name: "Arjuna",
      content:
        "I was skeptical at first, but after a month, I feel happier and more at peace. Thank you!",
      image: "/assets/img/testimonials/testi4.png",
      rating: 5,
      sortOrder: 4,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }

  const blogPosts = [
    {
      title: "Bach Flower Remedies: Ek Natural Healing Ka Jadoo",
      slug: "bach-flower-natural-healing",
      excerpt: "Learn how Bach Flower remedies support emotional wellness naturally.",
      content:
        "<p>Bach Flower remedies are gentle, natural essences that help restore emotional balance and inner peace without side effects.</p>",
      image: "/assets/img/blog/blog4.png",
      author: "Manzer Anis",
      day: 12,
      month: "December",
    },
    {
      title: "Bach Flower Medicine Kya Hai aur Kaise Kaam Karti Hai?",
      slug: "bach-flower-medicine-kya-hai",
      excerpt: "Understand Bach Flower medicine in simple language.",
      content: "<p>Bach Flower medicine works on emotional energy to restore harmony in mind and body.</p>",
      image: "/assets/img/blog/blog5.jpeg",
      author: "Manzer Anis",
      day: 19,
      month: "March",
    },
    {
      title: "38 Bach Flower Remedies: Har Emotion ke liye Ek Healing Drop",
      slug: "38-bach-flower-remedies",
      excerpt: "A guide to all 38 Bach Flower remedies.",
      content: "<p>Each of the 38 remedies addresses a specific emotional state for holistic healing.</p>",
      image: "/assets/img/blog/blog6.jpeg",
      author: "Manzer Anis",
      day: 24,
      month: "June",
    },
    {
      title: "Kaise Choose Karein Sahi Bach Flower Remedy Apne Symptoms ke Liye?",
      slug: "choose-right-bach-flower-remedy",
      excerpt: "Tips to pick the right remedy for your symptoms.",
      content: "<p>Choosing the right remedy starts with understanding your dominant emotional pattern.</p>",
      image: "/assets/img/blog/blog5.jpeg",
      author: "Manzer Anis",
      day: 5,
      month: "August",
    },
    {
      title: "Mind Heal with Flowers: Bach Flower Therapy for Overthinking, Fear & Anxiety",
      slug: "mind-heal-overthinking-fear-anxiety",
      excerpt:
        "Learn how Bach Flower remedies help calm overthinking, reduce fear, and ease anxiety naturally.",
      content: `<p>Overthinking, fear, and anxiety can feel overwhelming — but Bach Flower therapy offers a gentle, natural path toward emotional balance. At Mind Heal, we use carefully selected flower essences to support your mind and heart without harsh side effects.</p>
<h3>What is Overthinking?</h3>
<p>Overthinking happens when the mind keeps replaying worries, doubts, or "what if" scenarios. It can disturb sleep, focus, and peace. Bach Flower remedies work on emotional patterns rather than suppressing feelings.</p>
<h3>How Bach Flowers Help</h3>
<ul>
<li><strong>White Chestnut</strong> — for unwanted repetitive thoughts</li>
<li><strong>Mimulus</strong> — for known fears and anxieties</li>
<li><strong>Aspen</strong> — for vague fear without a clear cause</li>
<li><strong>Rock Rose</strong> — for panic and sudden terror</li>
</ul>
<p>Our pre-mixed Mind Heal blends combine these essences in balanced proportions, tailored for modern emotional challenges.</p>
<h3>When to Seek Support</h3>
<p>If anxiety affects your daily life, relationships, or sleep, consider a free consultation with our Bach Flower practitioners. We listen without judgment and recommend remedies suited to your unique emotional state.</p>
<p><em>Begin with calm. Heal with care. Grow with love — that's the Mind Heal promise.</em></p>`,
      image: "/assets/img/blog/blog3.jpeg",
      author: "Manzer Anis",
      day: 17,
      month: "September",
    },
    {
      title: "Bach Flower No. 01 to No. 38: Ek Ek Remedy Ki Asaan Bhasha Mein Pehchaan",
      slug: "bach-flower-01-to-38-guide",
      excerpt: "Simple guide to remedies 01 through 38.",
      content: "<p>Learn each remedy's purpose in easy language for everyday emotional care.</p>",
      image: "/assets/img/blog/blog8.jpeg",
      author: "Manzer Anis",
      day: 7,
      month: "December",
    },
  ];

  for (const post of blogPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        author: post.author,
        published: true,
        publishedAt: new Date(),
        categoryId: blogCategory.id,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        author: post.author,
        published: true,
        publishedAt: new Date(),
        categoryId: blogCategory.id,
        postsCategory: { create: [{ categoryId: blogCategory.id }] },
      },
    });
  }

  const healingStories = [
    {
      title: "OCD से आज़ादी - मेरी सच्ची कहानी | Mind Heal No.01",
      slug: "healing-story-ocd-freedom",
      content: `<p><strong>"Main har cheez bar bar check karta tha..."</strong></p>
<p>Mujhe har waqt lagta tha ki main door properly band ki ya nahi. Main ghar se nikalta, 5 minute baad wapas aata aur fir se check karta.</p>
<p>Haath dhona meri aadat nahi, majboori ban chuki thi. Kabhi kuch chhota sa bhi chhoo leta, toh itna ganda feel hota ki main baar baar sabun lagake haath dho leta.</p>
<p>Fir maine <strong>Mind Heal No.01</strong> try kiya - ek gentle Bach Flower Remedy jo OCD jaise repetitive thoughts ke liye specially mix ki gayi thi.</p>
<p>Ab mujhe freedom feel hoti hai. Ab main jee raha hoon, repeat nahi kar raha.</p>`,
    },
    {
      title: "My Child's Slow World - And How We Found Hope",
      slug: "healing-story-child-slow-world",
      content: `<p>Mera beta bahut hi pyaara hai. Lekin woh bahut lazy tha. Reading slow, writing slow. Har cheez mein dheere.</p>
<p>Phir ek din maine <strong>Mind Heal No. 02</strong> ke baare mein suna. Ek friend ne bola, "Bhai, try kar. Yeh energy based healing hai."</p>
<p>Woh thoda active hone laga. Uski writing better ho gayi. Reading mein interest dikhane laga.</p>
<p><em>"Itna hi chahiye hota hai - thoda pyaar, thoda patience… aur Mind Heal No. 02"</em></p>`,
    },
    {
      title: "Mera Chanchal Baccha - Jab Shanti Wapas Aayi",
      slug: "healing-story-hyperactive-child",
      content: `<p>Mera beta ek dum rocket jaisa hai. Jahaan le jao, usko koi farak nahi padta.</p>
<p>Phir mujhe bataya <strong>Mind Heal No. 03</strong> ke baare mein - un bachcho ke liye jo hyper hote hain.</p>
<p>Woh thoda slow hone laga. Jumping kam ho gayi. Roona kam hua.</p>
<p><strong>Mind Heal No. 03</strong> ne mera ghar badal diya.</p>`,
    },
    {
      title: "Jab Mera Beta Exam Se Darna Band Kiya",
      slug: "healing-story-exam-fear",
      content: `<p>Mera beta bohot mehnat karta tha. Lekin jaise hi exam ka time aata, uska dimaag blank ho jaata tha.</p>
<p>Phir kisi ne suggest kiya <strong>Mind Heal No. 04</strong> - specially exam fear aur memory block ke liye.</p>
<p>Ek din usne muskurake bola, "Papa, is baar sab yaad tha. Maine pura paper likha!"</p>`,
    },
  ];

  for (const story of healingStories) {
    await prisma.post.upsert({
      where: { slug: story.slug },
      update: {
        title: story.title,
        content: story.content,
        excerpt: story.title,
        published: true,
        publishedAt: new Date(),
        categoryId: healingCategory.id,
      },
      create: {
        title: story.title,
        slug: story.slug,
        content: story.content,
        excerpt: story.title,
        published: true,
        publishedAt: new Date(),
        categoryId: healingCategory.id,
        postsCategory: { create: [{ categoryId: healingCategory.id }] },
      },
    });
  }

  console.log("Seed completed");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
