"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
    text?: string;
    className?: string;
    shadowColors?: {
        first?: string;
        second?: string;
        third?: string;
        fourth?: string;
        glow?: string;
    };
}

export function TextRewind({
    text = "LINE",
    className = "",
    shadowColors = {
        first: "#07bccc",
        second: "#e601c0",
        third: "#e9019a",
        fourth: "#f40468",
        glow: "#f40468",
    },
}: AnimatedTextProps) {
    const textShadowStyle = {
        textShadow: `10px 10px 0px ${shadowColors.first}, 
                     15px 15px 0px ${shadowColors.second}, 
                     20px 20px 0px ${shadowColors.third}, 
                     25px 25px 0px ${shadowColors.fourth}, 
                     45px 45px 10px ${shadowColors.glow}`,
    };

    const noShadowStyle = {
        textShadow: "none",
        scale: 1.1,
        transition: { duration: 0.3 }
    };

    return (
        <AnimatePresence>
            <div className="w-full text-center">
                <motion.div
                    className={cn(
                        "w-full text-center cursor-pointer text-3xl font-bold",
                        "transition-all duration-200 ease-in-out tracking-widest",
                        "text-black dark:text-white italic",
                        "stroke-[#d6f4f4]",
                        className
                    )}
                    initial={textShadowStyle}
                    animate={textShadowStyle}
                    whileHover={noShadowStyle}
                    whileTap={{ scale: 0.95 }}
                >
                    {text}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

