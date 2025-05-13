"use client";

import LogoSection from "@/components/LogoWithSlogan";
import ProfileSetup from "@/components/ProfileSetup";
import SignupInput from "@/components/SignupInput";
import { useSignupStore } from "@/src/stores/signupStore";

const SignUp = () => {

    const { step } = useSignupStore()

    const renderInputComponent = () => {
        switch(step){
            case 1:
                return <SignupInput/>
            default : 
                return <ProfileSetup/>
        }
    }

    return (
        <div className="text-center">
            <LogoSection/>
            {renderInputComponent()}
        </div>
    )
}

export default SignUp