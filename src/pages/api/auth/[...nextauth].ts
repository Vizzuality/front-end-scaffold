import JWT from 'jsonwebtoken';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import AUTHENTICATION from 'services/authentication';

const MAX_AGE = 2 * 60 * 60; // 2 hours
const SESSION_BUFFER_TIME = 10 * 60; // 10 minutes

/**
 * Takes a token, and returns a new token
 */
async function refreshAccessToken(token) {
  try {
    const refreshTokenResponse = await AUTHENTICATION.request({
      url: '/refresh-token',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const { data, status } = refreshTokenResponse;

    if (status !== 201) {
      throw new Error(data);
    }

    return {
      ...token,
      accessToken: data.accessToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const options: NextAuthOptions = {
  /**
   * Defining custom pages
   * By default Next-Auth provides /api/auth/signin
   */
  pages: {
    signIn: '/auth/sign-in',
    // error: '/auth/sign-in',
  },

  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  // Configure one or more authentication providers
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Vizzuality',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'username@domain.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        // Request to sign in
        const signInRequest = await AUTHENTICATION.request({
          url: '/sign-in',
          method: 'POST',
          data: { username, password },
          headers: { 'Content-Type': 'application/json' },
        });

        const { data, status } = signInRequest;

        if (status === 201) {
          return data;
        }

        throw new Error(data);
      },
    }),
  ],

  callbacks: {
    // ? https://next-auth.js.org/configuration/callbacks#jwt-callback
    // Assigning encoded token from API to token created in the session
    async jwt({ token, user }) {
      const newToken = { ...token };

      if (user) {
        const { accessToken } = user;
        newToken.accessToken = accessToken;
      }

      // Use custom JWT decode, otherwise "exp date" will be increasing beyond the infinite
      const { exp } = JWT.decode(newToken.accessToken) as { exp: number };

      const expDate = new Date(exp * 1000);

      // Return previous token if the access token has not expired yet
      const remainingTime = expDate.getTime() - Date.now();
      const shouldRefresh = remainingTime < SESSION_BUFFER_TIME * 1000 && remainingTime > 0;

      // Refresh token
      if (shouldRefresh) return refreshAccessToken(newToken);

      return newToken;
    },

    // ? https://next-auth.js.org/configuration/callbacks#session-callback
    // Extending session object
    async session({ session, token }) {
      const newSession = session;
      newSession.accessToken = token.accessToken;
      return newSession;
    },

    // ? https://next-auth.js.org/configuration/callbacks#redirect-callback
    async redirect({ url }) {
      // By default it should be redirect to /projects
      if (url.includes('/sign-in') || url.includes('/sign-up')) {
        return '/projects';
      }
      return url;
    },
  },

  events: {
    async signOut({ token }) {
      // After sign-out expire token in the API
      if (token.accessToken) {
        await AUTHENTICATION.request({
          url: '/sign-out',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    },
  },
};

export default NextAuth(options);
