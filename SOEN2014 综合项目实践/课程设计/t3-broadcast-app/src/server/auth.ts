import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/server/db';
import { verify } from '@/utils/crypto';

import type { UserRole } from '@/@types/auth';
import type { GetServerSidePropsContext } from 'next';
import type { NextAuthOptions, DefaultSession } from 'next-auth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    // ...other properties
    username: string;
    role: UserRole;
  }
}

interface JwtUser {
  name: string;
  role: UserRole;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: ({ token, user }) => {
      const result = { ...token };
      if (user) {
        result.user = {
          name: user.username,
          role: user.role,
        } satisfies JwtUser;
      }
      return result;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...(token as { user: JwtUser }).user,
          id: token.sub,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '用户名', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.warn('WARNING: No credentials provided');
          return null;
        }

        const { password, username } = credentials;
        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          console.warn(`WARNING: User "${username}" not found`);
          return null;
        }

        const isValid = verify(password).withHash(user.password);

        if (!isValid) {
          console.warn(
            `WARNING: Invalid password "${password}" for user "${username}"`,
          );
          return null;
        }

        console.log(`INFO: User "${username}" logged in`);
        return user as Omit<typeof user, 'role'> & { role: UserRole };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
