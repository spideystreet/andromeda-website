"use client"

import { Home, Book, User, Mail } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

const navigationItems = [
  {
    name: "Accueil",
    url: "/",
    icon: Home
  },
  {
    name: "Blog",
    url: "/blog",
    icon: Book
  },
  {
    name: "À propos",
    url: "/about",
    icon: User
  },
  {
    name: "Contact",
    url: "/contact",
    icon: Mail
  }
]

export function NavigationProvider() {
  return <NavBar items={navigationItems} />
} 