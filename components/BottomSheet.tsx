import { AnimatePresence, motion } from "framer-motion"

interface BottomSheetProps {
    isOpen : boolean
    onClose : () => void
    children ?: React.ReactNode
}

const BottomSheet = ({
    isOpen,
    onClose,
    children
} : BottomSheetProps) => {
    return (
        <AnimatePresence>
        {isOpen && (
            <motion.div
                onClick={onClose} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-[#000000B2] w-screen h-screen fixed top-0 left-0 z-40"
            >
                <motion.section
                    onClick={(e) => e.stopPropagation()} 
                    initial={{ y: 30, x: "-50%" }}
                    animate={{ y: 0, x: "-50%" }}
                    exit={{ y: 30, x: "-50%" }}
                    transition={{ ease: "easeOut" }}
                    className="text-[15px] max-w-lg w-full h-[90%] bg-white absolute left-1/2 -translate-x-1/2 bottom-0 rounded-t-3xl flex flex-col justify-between shadow-lg"
                >
                    {children}
                </motion.section>
            </motion.div>
        )}
    </AnimatePresence>
    )
}

export default BottomSheet