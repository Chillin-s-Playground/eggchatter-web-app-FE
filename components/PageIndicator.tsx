
interface PageIndicatorProps {
    text :string;
    hasMenu ?: boolean
    handleClickMenu ?: () => void
}

import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const PageIndicator = ({ text, hasMenu, handleClickMenu } : PageIndicatorProps) => {
    return (
        <div className='flex justify-between items-center w-full'>
            <p className='text-2xl' style={{ fontFamily: 'jalnan-font' }}>{text}</p>

            {hasMenu && (
                <Button
                    type='text'
                    icon={<UserOutlined style={{ fontSize: '1.6rem'}}/>}
                    onClick={handleClickMenu}
                />
            )}
        </div>
    )
}

export default PageIndicator