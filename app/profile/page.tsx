"use client"

import { default as LongBottomButton } from "@/components/LongBottomButton";
import PageIndicator from "@/components/PageIndicator";
import ProfileArea from "@/components/ProfileArea";
import TextInput from "@/components/TextInput";
import { ButtonBase } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEasterEggStore } from "../store/userStore";

const ProfileList = [
    {alt : "smile", src : "/assets/smile.webp"},
    {alt : "happy", src : "/assets/happy.webp"},
    {alt : "crying", src : "/assets/crying.webp"},
    {alt : "angry", src : "/assets/angry.webp"},
    {alt : "wow", src : "/assets/wow.webp"},
    {alt : "bad", src : "/assets/bad.webp"},
    {alt : "love", src : "/assets/love.webp"},
    {alt : "neutral", src : "/assets/neutral.webp"},
    {alt : "sad", src : "/assets/sad.webp"},
]

const EasterEgg = () => {
    const searchParam = useSearchParams()
    const step = searchParam.get("step")
    const profile = useEasterEggStore((state) => state.profile)
    
    return (
        <div>
            {/* 페이지 인디케이터 */}
            <PageIndicator text="프로필"/>

            {/* 프로필 이미지 영역 */}
            <ProfileArea profile={profile}/>

            {/* 작성 영역 */}
            {step === "1" ? <ProfileImage/> : <NickName/>}
        </div>
    )
}

const ProfileImage = () => {
    const router = useRouter()
    const profile = useEasterEggStore((state) => state.profile)
    const setProfile = useEasterEggStore((state) => state.setProfile)

    const selectProfileImage = (src:string) => {
        setProfile(src)
    }

    const checkProfile = () => {
        if(profile === "" || profile === "/assets/user.webp"){
            alert("프로필을 선택해주세요.")
            return false
        }

        return true
    }
    
    const moveTo = () => {
        if(checkProfile()){
            const params = new URLSearchParams({ step: "2" });
            router.push(`?${params.toString()}`)
        }
    }

    return(
        <div className="flex justify-center py-4">
            <div className="grid grid-cols-3 gap-12">
                {ProfileList.map((prof, idx) => (
                    <ButtonBase onClick={() => selectProfileImage(prof.src)}
                    key={`${idx}-${prof.alt}`}>
                        <Image
                            src={prof.src}
                            alt={prof.alt}
                            width={64}
                            height={64}
                            className={profile != prof.src ? "opacity-45" : ""}
                        />
                    </ButtonBase>
                ))}
            </div>

            <LongBottomButton 
                text="확인"
                status={
                    `${
                        (!profile || profile === "/assets/user.webp")
                        ? "inactive" 
                        : "active"
                    }`
                } 
                handleClickEvent={moveTo}/>
        </div>
    )
}

const NickName = () => {
    const router = useRouter()

    const [error, setError] = useState(false)
    const nickname = useEasterEggStore((state) => state.nickname)
    const setNickname = useEasterEggStore((state) => state.setNickname)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target : { value } } = e

        if (value.length > 8) {
            setError(true)
        } else {
            setError(false)
        }

        setNickname(value)
    }

    const updateUserInfo = async() => {
        // await axios
        // alert("프로필 등록 완료")
        router.push("/easter")
        
    }

    return (
        <div className="flex justify-center">
            <TextInput
                label="닉네임"
                name="nickname"
                value={nickname}
                error={error}
                helperText={error ? "닉네임은 8글자 이하로 입력해주세요." : ""}
                handleChange={handleChange}
            />

            <LongBottomButton 
                text="확인"
                status={
                    `${
                        (!nickname || nickname.length > 8)
                        ? "inactive" 
                        : "active"
                    }`
                } 
                handleClickEvent={updateUserInfo}/>
        </div>
    )
}

export default EasterEgg