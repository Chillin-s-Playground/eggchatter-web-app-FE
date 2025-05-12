import { ButtonBase } from '@mui/material';
import { Input } from 'antd';
import LongBottomButton from './LongBottomButton';

const SignInInput = () => {

    return (
        <div className='my-12 text-base'>
            {/* 아이디, 비번 입력 */}
            <Input 
                size="large" 
                placeholder="아이디"
                className='h-14 my-2'
            />
            
            <Input.Password 
                size="large" 
                placeholder="비밀번호"
                className='h-14 my-2'
            />
            
            {/* 아이디 찾기, 비번찾기, 회원가입 */}
            <div className='my-4 grid grid-flow-col text-sm'>
                <ButtonBase 
                    style={{ borderRight: "1px solid #d1d5db" }}
                    className="pr-2 mr-2">아이디 찾기</ButtonBase>
                <ButtonBase 
                    style={{borderRight: "1px solid #d1d5db"}}
                    className="pr-2 mr-2">비밀번호 찾기</ButtonBase>
                <ButtonBase>회원가입</ButtonBase>
            </div>

            <div className='my-4'/>

            <LongBottomButton
                text="로그인"
                handleClickEvent={() => {}}
            />
        </div>
    )
}

export default SignInInput