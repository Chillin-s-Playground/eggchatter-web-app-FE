"use client"

import { ApiUrl } from "@/src/constants/api";
import { useSignupStore } from "@/src/stores/signupStore";
import { ButtonBase } from "@mui/material";
import { Input } from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import LongBottomButton from "./LongBottomButton";

const profileImageList = [
    {alt : "cool", src : "/assets/cool.webp"},
    {alt : "dead", src : "/assets/dead.webp"},
    {alt : "doubt", src : "/assets/doubt.webp"},
    {alt : "happy", src : "/assets/happy.webp"},
    {alt : "kiss", src : "/assets/kiss.webp"},
    {alt : "lazy", src : "/assets/lazy.webp"},
    {alt : "sick", src : "/assets/sick.webp"},
    {alt : "silly", src : "/assets/silly.webp"},
    {alt : "wink", src : "/assets/wink.webp"},
]

const ProfileSetup = () => {
	const {
		email,
		password,
        nickname,
        profileImage,
        setNickname,
		setprofileImageImage,
		reset
    } = useSignupStore()

	const router = useRouter()

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const setters: Record<string, (val: string) => void> = {
			nickname: setNickname,
			profileImage: setprofileImageImage,
		};

		setters[name]?.(value);
	};
	
    const SignUp = async() => {
        try {
            const { data } = await axios.post(
				`${ApiUrl.AUTH.SIGNUP}`, 
				{ email, password, nickname, profile_image : profileImage, login_type : "EMAIL"}
			);

            if (data.status_code !== 200) {
                throw new Error(data.message);
            }

			alert(data.message)
			reset()
			router.push("/auth/signin")
		
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || '서버 오류 발생';
                alert(message);
            } 
        }
    }

	return (
		<div className="my-12 text-base">
			{/* 닉네임 및 프로필 등록 */}

			<div className="px-10 mt-16 mb-10 grid grid-cols-3 gap-y-6">
                {profileImageList.map((prof, idx) => (
					<ButtonBase onClick={() => setprofileImageImage(prof.alt)}
                    key={`${idx}-${prof.alt}`}>
                        <Image
                            src={prof.src}
                            alt={prof.alt}
                            width={60}
                            height={60}
                            className={profileImage !== prof.alt ? "opacity-45" : ""}
                        />
                    </ButtonBase>
                ))}
            </div>

			<Input
				name="nickname"
				value={nickname}
				size="large"
				placeholder="닉네임"
				className="h-14 my-2"
				onChange={onChangeInput}
			/>

			<LongBottomButton 
                text="다음" 
                status={ !profileImage || !nickname ? "inactive" : "active"} 
                handleClickEvent={SignUp} 
            />
		</div>
	);
};

export default ProfileSetup;
