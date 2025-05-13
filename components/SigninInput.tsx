"use client"

import { ApiUrl } from "@/src/constants/api";
import { ButtonBase } from "@mui/material";
import { Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import LongBottomButton from "./LongBottomButton";

const SignInInput = () => {
	const router = useRouter()
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
		const setters: Record<string, (val: string) => void> = {
			email: setEmail,
			password: setPassword
		};

		setters[name]?.(value);
    };

	const onMoveToPage = (path:string) => {
		router.push(`/auth/${path}`)
	}

    const SignIn = async() => {
        try {
            const { data } = await axios.post(
				`${ApiUrl.AUTH.SIGNIN}`, 
				{ email, password }, 
				{ withCredentials : true }
			);

            if (data.status_code !== 200) {
                throw new Error(data.message);
            }

			router.push("/")

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || '서버 오류 발생';
                alert(message);
            } 
        }
    }

	return (
		<div className="my-12 text-base">
			{/* 아이디, 비번 입력 */}
			<Input
				name="email"
				value={email}
				size="large"
				placeholder="아이디"
				className="h-14 my-2"
				onChange={onChangeInput}
			/>

			<Input.Password
				name="password"
				value={password}
				size="large"
				placeholder="비밀번호"
				className="h-14 my-2"
				onChange={onChangeInput}
			/>

			{/* 아이디 찾기, 비번찾기, 회원가입 */}
			<div className="my-4 grid grid-flow-col text-sm">
				<ButtonBase
					style={{ borderRight: "1px solid #d1d5db" }}
					className="pr-2 mr-2 cursor-pointer"
				>
					아이디 찾기
				</ButtonBase>
				<ButtonBase
					style={{ borderRight: "1px solid #d1d5db" }}
					className="pr-2 mr-2 cursor-pointer"
				>
					비밀번호 찾기
				</ButtonBase>
				<ButtonBase 
					className="cursor-pointer"
					onClick={() => onMoveToPage("signup?step=1")}
				>
					회원가입
				</ButtonBase>
			</div>

			<LongBottomButton 
                text="로그인" 
                status={(!password || !email) ? "inactive" : "active"} 
                handleClickEvent={SignIn} 
            />
		</div>
	);
};

export default SignInInput;
