"use client";

import { motion } from "framer-motion";

interface DecorativeBackgroundProps {
    rightText?: string;
    leftText?: string;
    rightPosition?: string;
    leftPosition?: string;
    containerClassName?: string;
}

const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
    rightText = "A",
    leftText = "Mr.",
    rightPosition = "top-1/4",
    leftPosition = "bottom-0",
    containerClassName = "",
}) => {
    return (
        <div className={`absolute inset-0 pointer-events-none ${containerClassName}`}>
            {/* Large text on the right */}
            <motion.div
                className={`absolute right-0 ${rightPosition} text-white/3 text-[400px] sm:text-[500px] md:text-[600px] font-bold leading-none select-none`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -30, 0],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    opacity: { duration: 1 },
                    scale: { duration: 1 },
                    y: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                    rotate: {
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            >
                {rightText}
            </motion.div>
            {/* Large text on the bottom left */}
            <motion.div
                className={`absolute left-0 ${leftPosition} text-white/3 text-[300px] sm:text-[400px] md:text-[500px] font-bold leading-none select-none`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, 20, 0],
                    rotate: [0, -3, 3, 0],
                }}
                transition={{
                    opacity: { duration: 1, delay: 0.3 },
                    scale: { duration: 1, delay: 0.3 },
                    y: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                    },
                    rotate: {
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                    },
                }}
            >
                {leftText}
            </motion.div>
        </div>
    );
};

export default DecorativeBackground;

