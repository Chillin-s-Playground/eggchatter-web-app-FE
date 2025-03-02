import { ButtonBase } from "@mui/material";
import React from "react";

interface LongButtonProps {
  text: string;
  handleClickEvent : () => void;
  status?: "active" | "inactive";
  children?: React.ReactNode;
}

const LongButton = ({ text, status = "inactive", handleClickEvent, children }: LongButtonProps) => {
  const statusColors = {
    active: "#FFE033",
    inactive: "#D9D9D9",
  };

  const dynamicBgColor = statusColors[status];

  return (
    <ButtonBase 
      disabled={status === "inactive"}
      sx={{
        backgroundColor: dynamicBgColor, 
        padding: "1rem",
        borderRadius: "0.375rem",
        width: "100%",
        maxWidth: "28rem",
        display: "block",
        margin: "0 auto",
        position: "fixed",
        bottom: "32px",
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        '&:hover' : {
            backgroundColor : "#FFE033"
        }
      }}
      onClick={handleClickEvent}
    >
      <p className="font-[500]">{text}</p>
      {children}
    </ButtonBase>
  );
};

export default LongButton;
