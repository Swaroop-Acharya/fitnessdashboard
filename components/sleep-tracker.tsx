"use client"

import { Moon, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SleepTrackerProps {
  sleepHours: number
  sleepQuality: number
  bedTime: string
  wakeTime: string
  percentageChange: number
  className?: string
}

export function SleepTracker({
  sleepHours,
  sleepQuality,
  bedTime,
  wakeTime,
  percentageChange,
  className,
}: SleepTrackerProps) {
  // Calculate the angle for the gauge based on sleep quality (0-100)
  const gaugeAngle = (sleepQuality / 100) * 180

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Moon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle>Sleep Tracker</CardTitle>
            <CardDescription>Your sleep patterns</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sleep Gauge */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-48 h-24 overflow-hidden">
            <div className="absolute bottom-0 w-48 h-48 border-[16px] rounded-full border-zinc-200 dark:border-zinc-800" />
            <div
              className="absolute bottom-0 w-48 h-48 border-[16px] rounded-full border-blue-500"
              style={{
                clipPath: `polygon(0% 100%, 100% 100%, 100% ${100 - gaugeAngle / 1.8}%, 0% ${100 - gaugeAngle / 1.8}%)`,
              }}
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-3xl font-bold text-zinc-900 dark:text-white">{sleepHours}</span>
              <span className="text-sm text-zinc-500">hours</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <span
                className={
                  percentageChange > 0 ? "text-emerald-500" : percentageChange < 0 ? "text-red-500" : "text-zinc-500"
                }
              >
                {percentageChange > 0 ? "+" : ""}
                {percentageChange}% from yesterday
              </span>
            </div>
          </div>
        </div>

        {/* Sleep Times */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 mb-1">
              <Sunset className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-zinc-500">Bed Time</span>
            </div>
            <span className="text-lg font-semibold text-zinc-900 dark:text-white">{bedTime}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 mb-1">
              <Sunrise className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-zinc-500">Wake Time</span>
            </div>
            <span className="text-lg font-semibold text-zinc-900 dark:text-white">{wakeTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

