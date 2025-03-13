import axios from 'axios';
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
        async redirect({ baseUrl }) {
            return `${baseUrl}/profile?step=1`;
        },
        async jwt({ token, account, profile}) {
            if(account && token && profile) {
                try{
                    const { data } = await axios.post(
                        "http://127.0.0.1:8080/auth/signin", 
                        {   
                            social_id: `${profile.id}`, 
                            login_type: "KAKAO"
                        },
                        {
                            headers: {
                                "access-token": account.access_token,
                                "refresh-token": account.refresh_token,
                                "Content-Type": "application/json"
                            }
                        }
                    );
                    
                    const token_data = data.data
                    token.accessToken = token_data.access_token
                    token.refreshToken = token_data.refresh_token
                } catch(error){
                    console.error("Error", error)
                }

                return token
            }
            return token
        },
        async session({session, token}){
            session.accessToken = token.accessToken; 
            session.refreshToken = token.refreshToken;
            return session;
        }
    }
    // secret: process.env.NEXTAUTH_SECRET,
}


const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };

