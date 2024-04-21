import { AuthOptions, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
      }),
    ],
    session: {
      strategy: "jwt", // This is the default value
    },
    callbacks: {
      async session({
        session,
        token,
        user,
      }: {
        session: Session;
        token: JWT;
        user: AdapterUser;
      }) {
        if (session?.user) {
          session.user.userId = token.sub;
        }
        return session;
      },
      async signIn(user: any) {
        try {
          // Fetch additional user data from your database based on email
          console.log("email ", user.user.email);
          // const res = await getDocs(
          //   query(volunteersCol, where("email", "==", user.user.email), limit(1))
          // );
          let additionalUserData = {};
          // if (res.docs.length > 0) {
          //   additionalUserData = { ...res.docs[0].data(), id: res.docs[0].id };
          // }
          // console.log(additionalUserData);
  
          // Merge additional data into the user object
          return {
            ...user,
            ...additionalUserData,
            // redirect: '/profile',
          };
        } catch (e) {
          console.log(e);
        }
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };