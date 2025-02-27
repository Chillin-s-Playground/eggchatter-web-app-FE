"use client"

import BottomSheet from "@/components/BottomSheet";
import LongButton from "@/components/LongButton";
import PageIndicator from "@/components/PageIndicator";
import ProfileArea from "@/components/ProfileArea";
import TextInput from "@/components/TextInput";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonBase, IconButton } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useGifStore } from "../store/gifStore";
import { useEasterEggStore } from "../store/userStore";

const GIPHY_URL = process.env.NEXT_PUBLIC_GIPHY_URL || "https://api.giphy.com/v1/gifs/search"
const GIPHY_KEY = process.env.NEXT_PUBLIC_GIPHY_KEY
const LIMIT = process.env.NEXT_PUBLIC_LIMIT_SIZE
const OFFSET = Number(process.env.NEXT_PUBLIC_OFFSET) || 20

interface EasterInfo {
    hint : string
    egg_word : string
    gif_url : string
}

interface GiphyItem {
    images: {
        original: {
            url: string;
        };
    };
}

const EasterEgg = () => {
    // TODO: profile 가져올 때, API로 가져오도록 수정 
    const profile = useEasterEggStore((state) => state.profile)
    const GIF_URLS = useGifStore((state) => state.gif_urls)
    const addGifUrl = useGifStore((state) => state.addGifUrl)
    const resetGifUrls = useGifStore((state) => state.resetGifUrls)

    const [wordError, setWordError] = useState({error : false, helperText : ""})
    const [hintError, setHitError] = useState({error : false, helperText : ""})
    const [easterInfo, setEasterInfo] = useState<EasterInfo>({hint : "", egg_word : "", gif_url : ""})
    const [createEasterInfo, setCreateEasterInfo] = useState<EasterInfo[]>([])
    const [openPopup, setIsOpenPopup] = useState(false)

    const [searchWord, setSearchWord] = useState("")
    const [pageNo, setPageNo] = useState(0)
    
    // 이스터에그 작성 
    const writeEasterWord = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target : { value, name }} = e
        const isError = value.length > 8;
        
        setWordError(prev => ({
            ...prev,
            error: isError,
            helperText: isError ? "이스터에그를 8글자 이하로 입력해주세요." : ""
        }));
        setEasterInfo(prev => ({...prev, [name]: value }));
    }
    
    // 힌트 작성
    const writeEasterHint = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target : { value, name }} = e
        const isError = value.length > 40;

        setHitError(prev => ({
            ...prev,
            error: isError,
            helperText: isError ? "힌트를 40글자 이하로 입력해주세요." : ""
        }));
        setEasterInfo(prev => ({...prev, [name] : value}))
    }

    // GIPHY 검색창 활성화
    const openSearchPopup = () => {
        setIsOpenPopup(true)
    }

    // GIPHY 검색창 입력
    const writeSearchWord = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { target : { value,}} = e
        setSearchWord(value)
        resetGifUrls()
    }

    // GIPHY 검색
    const searchGIPHY = async(no:number = 0) => {
        const { data : { data }} = await axios.get( GIPHY_URL, {
            params: {
              api_key: GIPHY_KEY,
              q: searchWord,
              limit: LIMIT,
              offset : no * OFFSET
            },
          });

        if(data.length > 0){
            addGifUrl(data.map((item:GiphyItem) => item.images.original.url))
        }

        if(no !== 0) setPageNo(prev => prev + 1)
    }

    // GIPHY 선택
    const selectGif = (url:string) => {
        setEasterInfo(prev => ({...prev, gif_url:  url}));
        setIsOpenPopup(false)
    }

    // GIPHY 검색창 비활성화
    const closeSearchPopup = () => {
        setIsOpenPopup(false)
    }

    // 이스터에그 UI추가
    const addEasterEgg = () => {
        const { hint, egg_word, gif_url } = easterInfo

        if(wordError.error || hintError.error){
            alert("입력한 내용에 오류가 있습니다. 다시 확인해 주세요.")
            return
        }

        if(hint == "" || egg_word == ""){
            alert("빈칸을 채워주세요.")
            return
        }

        if(createEasterInfo.length === 3) {
            alert("이스터에그는 3개까지만 등록 가능합니다.")
            return
        }
        setCreateEasterInfo((prev) => [
            ...prev,
            { hint, egg_word, gif_url },
        ]);
        setEasterInfo({hint : "", egg_word : "", gif_url : ""})
        
    }
    
    return (
        <div>
            <PageIndicator text="이스터에그 생성"/>
            <ProfileArea profile={profile}/>

            <div className="h-24">
                <TextInput
                    label="이스터에그 단어"
                    value={easterInfo.egg_word}
                    name="egg_word"
                    error={wordError.error}
                    helperText={wordError.helperText}
                    handleChange={writeEasterWord}
                />
            </div>

            <div className="h-24">
                <TextInput
                    label="힌트"
                    name="hint"
                    value={easterInfo.hint}
                    error={hintError.error}
                    helperText={hintError.helperText}
                    handleChange={writeEasterHint}
                />
            </div>

            <div className="h-24">
                <ButtonBase
                    sx={{
                        padding: "1rem",
                        borderRadius: "0.375rem",
                        width: "100%",
                        height : "3.4rem",
                        maxWidth: "28rem",
                        display: "block",
                        margin: "0 auto",
                        marginLeft: "auto",
                        marginRight: "auto",
                        border : "1px solid #bbbbbb",
                        fontSize : "1rem",
                        textAlign : "left"
                    }}
                    onClick={openSearchPopup}
                >
                    <p className="text-[#717171]">GIPHY 검색</p>
                </ButtonBase>
            </div>

            {easterInfo.gif_url !== "" && (

                <div className="w-full mx-auto">
                    <p className="text-base mb-4 text-[#717171]">선택한 움짤</p>
                    <Image 
                        src={easterInfo.gif_url}
                        alt="이스터에그 움짤" 
                        width={200} 
                        height={200} 
                        layout="intrinsic" 
                        unoptimized
                        style={{ margin : "0 auto"}}
                    />
                    
                    <LongButton text="추가하기" handleClickEvent={addEasterEgg}/>
                </div>
            )}

            {/* 내 이스터에그 */}
            {createEasterInfo.length > 0 && (
            <div className="mt-2">
                <hr className="border-t border-gray-300 my-4" />

                <div className="grid grid-cols-3 gap-x-2">
                    {createEasterInfo.map((easter, idx) => {
                        return (
                            <div key={`${easter.hint}-${idx}`}>
                                <p>{idx+1}. {easter.egg_word}</p>

                                <div className="w-32 h-32">
                                    <Image 
                                        src={easter.gif_url}
                                        alt="추가한 이스터에그 움짤" 
                                        width={128} 
                                        height={128} 
                                        layout="responsive"
                                        unoptimized
                                        style={{ margin : "0 auto"}}
                                    />

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            )}

        
             {/* 하단 팝업 */}
            <BottomSheet isOpen={openPopup} onClose={closeSearchPopup}>
                <div className="w-full flex justify-center items-center my-10">
                    <TextInput
                        label="GIPHY 검색"
                        name="searchWord"
                        value={searchWord}
                        handleChange={writeSearchWord}
                    />

                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={async() => await searchGIPHY()}>
                        <SearchIcon />
                    </IconButton>
                </div>

                <div className="px-8 py-8 h-[800px] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-14">
                        {GIF_URLS.map((gif, idx) => {
                            return(
                                <ButtonBase key={`${gif}-${idx}`} onClick={() => selectGif(gif)}>
                                    <Image 
                                        src={gif}
                                        alt="Gif" 
                                        width={200} 
                                        height={200} 
                                        layout="intrinsic" 
                                        unoptimized
                                    />
                                </ButtonBase>
                            )
                        })}
                    </div>

                    {GIF_URLS.length > 0 && (
                        <LongButton text="다음" handleClickEvent={async() => await searchGIPHY(pageNo + 1)}/>
                    )}
                </div>
                    
            </BottomSheet>
            
            {createEasterInfo.length > 0 && (
                <ButtonBase
                    sx={{
                        bgcolor : "white",
                        border : "1px solid #717171",
                        padding: "1rem",
                        borderRadius: "0.375rem",
                        width: "100%",
                        maxWidth: "28rem",
                        display: "block",
                        marginTop: "2rem",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                onClick={async() => await searchGIPHY(pageNo + 1)}
            >생성하기</ButtonBase>
            )}
        </div>
    )
}

export default EasterEgg