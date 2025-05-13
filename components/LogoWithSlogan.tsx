import { motion } from "framer-motion";

interface LogoSectionProps {
  animation?: boolean;
  hasSlogan?: boolean;
}

const LogoSection = ({ animation, hasSlogan }: LogoSectionProps) => {
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
    <>
      <motion.h2
        className="text-[2.7rem] mb-6 mt-28"
        variants={container}
        initial={animation ? "initial" : false}
        animate={animation ? "animate" : false}
        style={{ fontFamily: "jalnan-font" }}
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

      {hasSlogan && (
        <>
          <motion.p
            className="text-[#969797] text-[1.2rem]"
            variants={fadeInVariant}
            initial={animation ? "hidden" : false}
            animate={animation ? "visible" : false}
          >
            대화 속 숨겨진 즐거움,
          </motion.p>
          <motion.p
            className="text-[#969797] text-[1.2rem]"
            variants={fadeInVariant}
            initial={animation ? "hidden" : false}
            animate={animation ? "visible" : false}
          >
            이스터에그를 찾아보세요!
          </motion.p>
        </>
      )}
    </>
  );
};

export default LogoSection;
