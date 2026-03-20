import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { hash } from "bcryptjs";

const libsql = createClient({ url: "file:prisma/dev.db" });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create test user
  const passwordHash = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@altuscollective.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@altuscollective.com",
      passwordHash,
      company: "Demo BSC Company",
      companySize: "101-500 employees",
      salesVolume: "$5M - $15M",
      title: "VP Operations",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "jane@cleanpro.com" },
    update: {},
    create: {
      name: "Jane Cooper",
      email: "jane@cleanpro.com",
      passwordHash,
      company: "CleanPro Services",
      companySize: "26-100 employees",
      salesVolume: "$1M - $5M",
      title: "CEO",
    },
  });

  // Create principals
  const principals = [
    {
      name: "Sarah Mitchell",
      slug: "sarah-mitchell",
      title: "Principal, Sales & Marketing",
      discipline: "Sales & Marketing",
      company: "CleanPro National Services",
      bio: "With 20+ years driving revenue growth in the BSC industry.",
    },
    {
      name: "David Chen",
      slug: "david-chen",
      title: "Principal, Strategy",
      discipline: "Strategy",
      company: "Apex Facility Solutions",
      bio: "Strategic thinker who has led multiple acquisitions and market expansions.",
    },
    {
      name: "Maria Rodriguez",
      slug: "maria-rodriguez",
      title: "Principal, Technology",
      discipline: "Technology",
      company: "BrightClean Technologies",
      bio: "At the forefront of technology adoption in the cleaning industry.",
    },
  ];

  for (const p of principals) {
    await prisma.principal.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  const sarah = await prisma.principal.findUnique({
    where: { slug: "sarah-mitchell" },
  });

  // Create peer groups
  const group1 = await prisma.peerGroup.create({
    data: {
      name: "Altus Six - Growth Leaders",
      description:
        "For mid-market BSC companies scaling from $5M to $15M in revenue.",
      companySizeRange: "101-500 employees",
      salesVolumeRange: "$5M - $15M",
      members: {
        create: [
          { userId: user.id, role: "member" },
          { userId: user2.id, role: "facilitator" },
        ],
      },
    },
  });

  const group2 = await prisma.peerGroup.create({
    data: {
      name: "Altus Six - Emerging Leaders",
      description:
        "For growing BSC companies building their foundation for scale.",
      companySizeRange: "26-100 employees",
      salesVolumeRange: "$1M - $5M",
    },
  });

  // Create forum sessions
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setHours(10, 0, 0, 0);

  const nextMonth2 = new Date();
  nextMonth2.setMonth(nextMonth2.getMonth() + 2);
  nextMonth2.setHours(10, 0, 0, 0);

  await prisma.forumSession.create({
    data: {
      title: "Scaling Your Sales Organization",
      description:
        "Sarah Mitchell leads a discussion on building and scaling high-performance sales teams in the BSC industry.",
      type: "principal_led",
      scheduledAt: nextMonth,
      duration: 90,
      location: "Virtual - Zoom",
      principalId: sarah?.id,
      status: "upcoming",
    },
  });

  await prisma.forumSession.create({
    data: {
      title: "Altus Six Breakout - Growth Leaders",
      description:
        "Peer group breakout session for Growth Leaders to discuss sales strategies in their organizations.",
      type: "altus_six_breakout",
      scheduledAt: nextMonth,
      duration: 60,
      location: "Virtual - Zoom",
      peerGroupId: group1.id,
      status: "upcoming",
    },
  });

  // Create discussions
  const discussion = await prisma.discussion.create({
    data: {
      title: "How are you handling the labor shortage?",
      content:
        "We're seeing significant challenges finding and retaining cleaning staff in our markets. What strategies are working for your companies? We've tried sign-on bonuses and referral programs but looking for other ideas.",
      category: "hr",
      authorId: user.id,
      isPinned: true,
    },
  });

  await prisma.comment.create({
    data: {
      content:
        "We've had great success with flexible scheduling. Allowing employees to pick shifts that work for their lifestyle has really improved retention. We also invested in better training programs to give people a sense of career growth.",
      discussionId: discussion.id,
      authorId: user2.id,
    },
  });

  await prisma.discussion.create({
    data: {
      title: "Technology for quality assurance",
      content:
        "Looking to implement a QA system that goes beyond checklists. Anyone using IoT sensors or smart cleaning technology to verify work quality? Would love to hear about real-world implementations.",
      category: "technology",
      authorId: user2.id,
    },
  });

  // Create events
  const eventDate = new Date();
  eventDate.setMonth(eventDate.getMonth() + 3);

  await prisma.event.create({
    data: {
      title: "Altus Annual Summit 2026",
      description:
        "Our annual gathering of BSC leaders for two days of networking, workshops, and strategic planning.",
      type: "conference",
      startDate: eventDate,
      endDate: new Date(eventDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      location: "Chicago, IL",
      isVirtual: false,
      maxAttendees: 50,
    },
  });

  await prisma.event.create({
    data: {
      title: "Technology in BSC Workshop",
      description:
        "Hands-on workshop exploring the latest technology solutions for cleaning companies.",
      type: "workshop",
      startDate: new Date(
        eventDate.getTime() + 30 * 24 * 60 * 60 * 1000
      ),
      location: "Virtual - Zoom",
      isVirtual: true,
    },
  });

  // Create sample messages
  await prisma.message.create({
    data: {
      content:
        "Hey! Great discussion in the forum today. Would love to connect offline about the QA technology you mentioned.",
      senderId: user.id,
      receiverId: user2.id,
    },
  });

  await prisma.message.create({
    data: {
      content:
        "Absolutely! Happy to share what we've implemented. Let's schedule a call this week.",
      senderId: user2.id,
      receiverId: user.id,
    },
  });

  console.log("Seed completed successfully!");
  console.log("Demo login: demo@altuscollective.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
