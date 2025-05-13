"use client";

import LogoSection from "@/components/LogoWithSlogan";
import SignInInput from "@/components/SigninInput";

const SignIn = () => {
    
    return (
        <div className="text-center">
            <LogoSection animation hasSlogan/>
            <SignInInput/>
        </div>
    );
};

export default SignIn;
