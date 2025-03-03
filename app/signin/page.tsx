"use client"

import { ButtonBase } from "@mui/material";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {

    return(
        <div>
            {/* 에그채터 로고 */}
            <div className="flex justify-center items-center mt-36">
                <Image 
                    src='/assets/logo.webp' 
                    alt="로고" 
                    width={240} 
                    height={120}
                    priority
                    className="drop-shadow-lg"
                />
            </div>

            {/* 에그체터 소개 */}
            <div className="text-center">
                <p className="text-4xl font-semibold my-5">EggChatter</p>
                <p className="text-[#969797]">대화 속 숨겨진 즐거움, 이스터에그를 찾아보세요!</p>
            </div>
            
            <ButtonBase
                sx={{
                    width: "100%",
                    maxWidth: "28rem",
                    height: "4rem",
                    position: "fixed", 
                    bottom: "32px",
                    left: "0",
                    right: "0",
                    margin: "0 auto",
                }}
                // onClick={moveTo}
                onClick={() => signIn("kakao")}
            >

            <Image
                src="/assets/kakao_login_large_wide.png"
                alt="카카오 로그인"
                fill
                sizes="(max-width: 375px) 100vw"
                style={{ objectFit: "cover" }}
            />
            </ButtonBase>

            
        </div>
    )
}

export default Login