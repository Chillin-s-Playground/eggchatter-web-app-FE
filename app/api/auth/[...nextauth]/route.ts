import NextAuth, { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';


const authOptions:NextAuthOptions = {
    providers : [
        KakaoProvider({
            clientId : process.env.KAKAO_CLIENT_ID || "", 
            clientSecret : process.env.KAKAO_CLIENT_SECRET || ""
        })
    ],
    callbacks : {
        async redirect({ url, baseUrl}){
            return url.startsWith(baseUrl) ? url : `${baseUrl}/profile?step=1`
        },
        async jwt({ token, account, profile}) {
            if(account) {
                token.accessToken = account.access_token;
                token.id = profile?.id
            }
            return token
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token.id;
                session.accessToken = token.accessToken;
            }
            return session
        }
    }
    // secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };

