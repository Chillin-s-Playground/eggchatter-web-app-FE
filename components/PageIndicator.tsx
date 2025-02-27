import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";

interface PageIndicatorProps {
    text :string;
    hasMenu ?: boolean
    handleClickMenu ?: () => void
}

const PageIndicator = ({ text, hasMenu, handleClickMenu } : PageIndicatorProps) => {
    return (
        <div className='flex justify-between items-center w-full'>
            <p className='text-xl'>{text}</p>

            {hasMenu && (
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleClickMenu}
                >
                <MenuIcon />
              </IconButton>
            )}
        </div>
    )
}

export default PageIndicator