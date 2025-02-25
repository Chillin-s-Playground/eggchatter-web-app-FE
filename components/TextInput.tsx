import { TextField } from "@mui/material";

interface TextInputProps {
    label : string
    value : string 
    name : string
    error ?: boolean
    helperText ?: string
    handleChange : (e:React.ChangeEvent<HTMLInputElement>) => void

}

const TextInput = ({
    label,
    value, 
    name,
    error, 
    helperText, 
    handleChange
} : TextInputProps) => {
    return (
        <TextField
            required
            id="outlined-required"
            label={label}
            name={name}
            value={value}
            error={error}
            helperText={helperText}
            onChange={handleChange}
            sx={{
                width : "100%",
                maxWidth : "28rem"
            }}
        />
    )
}

export default TextInput