import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const middleware = withAuth(
  async () => {
    // TODO: Check permission here

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/login'
    }
  }
);

export default middleware;

export const config = {
  matcher: [
    {
      source: '/((?!api|icon|_next/static|_next/image|favicon.ico|assets).*)'
    }
  ]
};
