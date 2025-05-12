"use client";

import SignInInput from "@/components/SigninInput";
import { motion } from "framer-motion";

const SignIn = () => {
    const container = {
        animate: {
            transition: {
            staggerChildren: 0.15,
            },
        },
    };

    const letterVariants = {
        initial: { y: -30, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
            type: "spring",
            stiffness: 500,
            damping: 50,
            duration: 0.5,
            },
        },
    };

    const fadeInVariant = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
        },
        },
    };

    return (
        <div className="text-center">
            <motion.h2
                className="text-[2.7rem] mb-6 mt-28"
                variants={container}
                initial="initial"
                animate="animate"
                style={{ fontFamily: 'jalnan-font' }} 
            >
                {"에그채터".split("").map((char) => (
                <motion.span
                    key={char}
                    variants={letterVariants}
                    className="inline-block"
                >
                    {char}
                </motion.span>
                ))}
            </motion.h2>

            <motion.p
                className="text-[#969797] text-[1.2rem]"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
            >
                대화 속 숨겨진 즐거움,
            </motion.p>
            <motion.p
                className="text-[#969797] text-[1.2rem]"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
            >
                이스터에그를 찾아보세요!
            </motion.p>

            <SignInInput/>
        </div>
    );
};

export default SignIn;
