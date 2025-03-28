"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Sunset, Sunrise } from "lucide-react"

export function Greeting() {
  const [greeting, setGreeting] = useState("")
  const [timeIcon, setTimeIcon] = useState(<Sun />)
  const [gradientColors, setGradientColors] = useState("from-yellow-500 to-orange-500")

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) {
        // Morning: 5 AM - 12 PM
        setGreeting("Good morning")
        setTimeIcon(<Sunrise className="w-5 h-5" />)
        setGradientColors("from-yellow-500 to-orange-500")
      } else if (hour >= 12 && hour < 17) {
        // Afternoon: 12 PM - 5 PM
        setGreeting("Good afternoon")
        setTimeIcon(<Sun className="w-5 h-5" />)
        setGradientColors("from-blue-500 to-cyan-500")
      } else if (hour >= 17 && hour < 20) {
        // Evening: 5 PM - 8 PM
        setGreeting("Good evening")
        setTimeIcon(<Sunset className="w-5 h-5" />)
        setGradientColors("from-orange-500 to-pink-500")
      } else {
        // Night: 8 PM - 5 AM
        setGreeting("Good night")
        setTimeIcon(<Moon className="w-5 h-5" />)
        setGradientColors("from-blue-600 to-indigo-600")
      }
    }

    updateGreeting()
    const interval = setInterval(updateGreeting, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl bg-gradient-to-br ${gradientColors} text-white shadow-lg`}>
        {timeIcon}
      </div>
      <div>
        <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
          Fitness Dashboard
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {greeting}
        </p>
      </div>
    </div>
  )
}

