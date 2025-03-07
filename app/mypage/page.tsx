"use client"

import PageIndicator from "@/components/PageIndicator";
import ProfileArea from "@/components/ProfileArea";
import CreateIcon from '@mui/icons-material/Create';
import { ButtonBase, Tooltip } from "@mui/material";
import Image from "next/image";

const DUMMY_PROFILE = {
    profile_image : "/assets/angry.webp",
    nickname : "췰린코줍"
}

const DUMMY_EASTEREGGS = [
    {
        gif_url : "https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7w5g/image/faefAuXAL7_eOVC7GpDI4BQwbaY.png",
        trigger_word : "췰가이",
        trigger_user_nickname : ["췰린", "코줍", "지아코"],
    },
    {
        gif_url : "https://media1.giphy.com/media/v1.Y2lkPTU3NGI2MTgyMzZkcGE3NzU2dnF5Z2Z0aHNpNWx5ZGYyZWQ1cWxkZ3Foa3FidDFvOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/luTXXLud1CvWQC3MJb/giphy.gif",
        trigger_word : "하기싫어",
        trigger_user_nickname : ["에그", "채터"],
    },
    {
        gif_url : "https://media4.giphy.com/media/KAq5w47R9rmTuvWOWa/giphy.gif?cid=574b6182w382g43flzisagmidvw3bic9j6u20spo3vmi09bd&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        trigger_word : "파이썬",
        trigger_user_nickname : [],
    },
]

const MyPage = () => {
    return (
        <>
            <PageIndicator text="마이페이지"/>

            {/* 프로필 영역 */}
            <div>
                <ButtonBase
                    sx={{
                        margin: "0.4rem 0 1.2rem auto",
                        display: "block"
                    }}
                >
                    <CreateIcon sx={{ color : "#969797"}}/>
                </ButtonBase>
                <ProfileArea profile={DUMMY_PROFILE.profile_image}/>
                <p className="block mx-auto mt-6 text-center text-2xl">{DUMMY_PROFILE.nickname}</p>
            </div>

            {/* 이스터 에그 영역 */}
            <div className="mt-16">
                <div className="my-4 flex justify-between">
                    <p>나의 이스터에그</p>
                    <ButtonBase>
                        <CreateIcon sx={{ color : "#969797"}}/>
                    </ButtonBase>
                    
                </div>

                {DUMMY_EASTEREGGS.map((egg, idx) => {
                    return (
                        <div key={`${egg.trigger_word}-${idx}`} className="mt-4 mb-6 flex">
                            <div>
                                <p className="text-lg px-1 mb-1">{egg.trigger_word}</p>
                                <Image
                                    src={egg.gif_url}
                                    alt={egg.trigger_word}
                                    width={120}
                                    height={120}
                                    className="border border-[#969797] rounded-xl"
                                />
                            </div>

                            <div className="ml-2 mt-auto">
                                <p className="text-base px-1 mb-1 text-[#969797]">
                                    {egg.trigger_user_nickname.length > 0 ? "맞춘사람" : "아직 맞춘 친구가 없어요."}
                                </p>
                                <div className="flex">
                                    {egg.trigger_user_nickname.map((nick_name, name_idx) => {
                                        return (
                                            <Tooltip title={nick_name} key={`${nick_name}-${name_idx}`} >
                                                <p className="p-1 m-[0.1rem] w-8 h-8 text-center bg-white border border-[#969797] rounded-lg text-base">
                                                    {nick_name[0]}
                                                </p>
                                            </Tooltip>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </>
    )
}

export default MyPage