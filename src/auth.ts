import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const { PrismaClient } = await import("@/generated/prisma/client");
        const { PrismaLibSql } = await import("@prisma/adapter-libsql");
        const { createClient } = await import("@libsql/client");
        const bcryptjs = await import("bcryptjs");

        const libsql = createClient({ url: "file:prisma/dev.db" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adapter = new PrismaLibSql(libsql as any);
        const prisma = new PrismaClient({ adapter });

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.passwordHash) return null;

          const valid = await bcryptjs.compare(
            credentials.password,
            user.passwordHash
          );
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
