"use client"

import LongButton from "@/components/LongButton";
import PageIndicator from "@/components/PageIndicator";
import { ButtonBase, Chip } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface ChatItemProps {
  room_id : number, 
  last_message_time : string
  last_message_text : string
  last_sender_nickname : string
  sender_profile : string
  corrected_count : number
  unread_count : number
}

const DUMMY_DATA = [
  {
    room_id : 1, 
    last_message_time : "2025-02-25 23:59:59",
    last_message_text : "안녕alsdjlajdlajdlajdlajdlajdljadlajdlajd",
    last_sender_nickname : "췰린코줍",
    sender_profile : "/assets/angry.webp", 
    corrected_count : 1,
    unread_count : 5
  },
  {
    room_id : 2, 
    last_message_time : "2025-02-25 23:59:59",
    last_message_text : "안녕",
    last_sender_nickname : "췰린코줍",
    sender_profile : "/assets/angry.webp", 
    corrected_count : 1,
    unread_count : 0
  },
  {
    room_id : 3, 
    last_message_time : "2025-02-25 23:59:59",
    last_message_text : "안녕",
    last_sender_nickname : "췰린코줍",
    sender_profile : "/assets/angry.webp", 
    corrected_count : 1,
    unread_count : 7
  },
  {
    room_id : 4, 
    last_message_time : "2025-02-25 23:59:59",
    last_message_text : "안녕alsdjlajdlajdlajdlajdlajdljadlajdlajd",
    last_sender_nickname : "췰린코줍",
    sender_profile : "/assets/angry.webp", 
    corrected_count : 1,
    unread_count : 5
  },
  {
    room_id : 5, 
    last_message_time : "2025-02-25 23:59:59",
    last_message_text : "안녕",
    last_sender_nickname : "췰린코줍",
    sender_profile : "/assets/angry.webp", 
    corrected_count : 1,
    unread_count : 0
  },
  {
    room_id : 6, 
    last_message_time : "2025-02-25 23:59:59",
    last_message_text : "안녕",
    last_sender_nickname : "췰린코줍",
    sender_profile : "/assets/angry.webp", 
    corrected_count : 1,
    unread_count : 7
  }
]

const Home = () => {
  const router = useRouter()

  const moveToMange = () => {
    router.push("/mypage")
  }

  return (
    <>
      <PageIndicator text="채팅" hasMenu={true} handleClickMenu={moveToMange}/>

      {DUMMY_DATA.map((data, idx) => {
        return (
          <ChatItem
            key={`${data.last_message_text}-${idx}`}
            room_id={data.room_id}
            last_message_time={data.last_message_time}
            last_message_text={data.last_message_text}
            last_sender_nickname={data.last_sender_nickname}
            sender_profile={data.sender_profile}
            corrected_count={data.corrected_count}
            unread_count={data.unread_count}
          />
        )
      })}

      <LongButton text="추가하기" handleClickEvent={() => {}}/>
    </>
  )
}

const ChatItem = ({
  room_id,
  last_message_time,
  last_message_text,
  last_sender_nickname,
  sender_profile,
  corrected_count,
  unread_count
} : ChatItemProps) => {
  return (
    <div className="my-4 p-4 border-b-2">
      <ButtonBase 
      onClick={() => {console.log(room_id)}}
      className="flex text-left">
        <div className="flex-shrink-0">
          <Image
            src={sender_profile}
            alt=""
            width={60}
            height={60}
          />     
        </div>
 
        <div className="mx-4 pt-1">
          <p className="font-semibold">{last_sender_nickname}</p>
          <p className="text-base truncate w-[20ch]">{last_message_text}</p>
        </div>

        <div className="pt-1 ml-auto text-right text-base">
          <p className="text-sm text-[#969797] mb-1">{last_message_time}</p>
          <Chip
            label={`${corrected_count}/3`}
            variant="outlined"
            sx={{ marginX : "0.4rem"}}
          />
          <Chip 
            label={`@${unread_count}`}
            variant="outlined"
          />
        </div>
      </ButtonBase>
    </div>
  )
}

export default Home