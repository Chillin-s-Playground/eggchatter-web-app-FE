import { ButtonBase } from "@mui/material";

interface LongButtonProps {
    text: string;
    handleClickEvent?: () => void | Promise<void>; // 비동기 또는 동기 함수 허용
}

const LongButton = ({
    text,
    handleClickEvent
} : LongButtonProps) => {
    return (
        <ButtonBase 
            sx={{
                width : "100%",
                border: "1px solid #212322",
                padding : "0.8rem",
                fontWeight : "medium",
                borderRadius: "0.375rem",
                marginTop : "0.8rem",
            }}
            onClick={handleClickEvent}
        >
            {text}
        </ButtonBase>
    )
}

export default LongButton