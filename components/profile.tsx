"use client"

import { LogOut, Settings, User, ExternalLink } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProfileProps {
  name: string
  avatarUrl: string
}

export function Profile({ name, avatarUrl }: ProfileProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="group flex items-center gap-2 rounded-full p-1 pr-4 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800">
        <div className="relative">
          <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-white p-[2px] dark:bg-zinc-900">
              <img
                src={avatarUrl}
                alt={name}
                className="h-full w-full rounded-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-zinc-500">Full Stack Developer</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="https://swaroopacharya.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Portfolio</span>
            <ExternalLink className="ml-auto h-4 w-4" />
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 dark:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

