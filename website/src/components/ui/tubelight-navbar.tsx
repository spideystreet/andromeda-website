"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const NAVIGATION = ["Home", "About", "Contact"];

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function TubelightNavbar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <nav className="relative flex items-center justify-center w-full h-16 px-4 text-sm font-medium bg-black border border-transparent">
      <div className="flex items-center justify-center w-full gap-4 text-white">
        {NAVIGATION.map((item) => (
          <button
            key={item}
            className={`relative px-4 py-2 transition-colors ${
              activeIndex === NAVIGATION.indexOf(item)
                ? "text-white"
                : "text-neutral-500 hover:text-neutral-200"
            }`}
            onClick={() => setActiveIndex(NAVIGATION.indexOf(item))}
          >
            <span className="relative z-10">{item}</span>

            {activeIndex === NAVIGATION.indexOf(item) && (
              <motion.span
                layoutId="tubelight"
                className="absolute inset-0 z-0 bg-white mix-blend-difference"
                style={{
                  borderRadius: 9999,
                }}
                transition={{
                  type: "spring",
                  bounce: 0.25,
                  stiffness: 130,
                  damping: 12,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
