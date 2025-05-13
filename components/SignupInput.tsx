"use client"

import { ApiUrl } from "@/src/constants/api";
import { useSignupStore } from "@/src/stores/signupStore";
import { Input } from "antd";
import axios from "axios";
import type React from "react";
import LongBottomButton from "./LongBottomButton";

const SignupInput = () => {
	const {
        email,
        password,
        confirmPassword,
        setEmail,
        setPassword,
        setConfirmPassword,
		setStep
    } = useSignupStore()

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		const setters: Record<string, (val: string) => void> = {
			email: setEmail,
			password: setPassword,
			confirmPassword: setConfirmPassword,
		};

		setters[name]?.(value);
	};
	
    const SignUp = async() => {
        try {
            const { data } = await axios.post(
				`${ApiUrl.AUTH.CHECK_MAIL}`, 
				{ email, login_type : "EMAIL"}
			);

            if (data.status_code !== 200) {
                throw new Error(data.message);
            }
			
			setStep(2)
		
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

			<Input.Password
				name="confirmPassword"
				value={confirmPassword}
				size="large"
				placeholder="비밀번호 확인"
				className="h-14 my-2"
				status={`${password !== confirmPassword ? "error" : ""}`}
				onChange={onChangeInput}
			/>
			{password !== confirmPassword && (
				<p className="text-left text-sm text-[#EC5B56]">비밀번호가 일치하지 않습니다.</p>
			)}

			<LongBottomButton 
                text="다음" 
                status={
					(!email || !password || !confirmPassword || password !== confirmPassword) 
					? "inactive" 
					: "active"
				} 
                handleClickEvent={SignUp} 
            />
		</div>
	);
};

export default SignupInput;
