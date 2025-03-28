"use client"

import { Award, Sparkles, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface PointsCardProps {
  points: number
  monthlyGoal: number
  className?: string
}

export function PointsCard({ points, monthlyGoal, className }: PointsCardProps) {
  const [percentage, setPercentage] = useState(0)
  const [isGoalReached, setIsGoalReached] = useState(false)
  const currentDate = new Date()
  const month = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()

  useEffect(() => {
    const calculatedPercentage = Math.min((points / monthlyGoal) * 100, 100)
    setPercentage(calculatedPercentage)
    setIsGoalReached(calculatedPercentage >= 100)
  }, [points, monthlyGoal])

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Achievement Points</CardTitle>
              <CardDescription>Monthly Progress Tracker</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{month} {year}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        {/* Points Display */}
        <div className="relative flex justify-center">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full blur-2xl" />
          <div className="relative flex flex-col items-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              {points.toLocaleString()}
            </div>
            <div className="text-sm text-zinc-500 mt-1">
              Goal: {monthlyGoal.toLocaleString()} points
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-zinc-500" />
              <span className="text-zinc-500">Progress</span>
            </div>
            <span className="font-semibold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              {percentage.toFixed(0)}%
            </span>
          </div>
          <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            >
              {isGoalReached && (
                <div className="w-full h-full bg-gradient-to-r from-rose-500 to-orange-500 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className={cn(
          "p-4 rounded-xl text-center transition-colors duration-300",
          isGoalReached
            ? "bg-gradient-to-br from-rose-500/10 to-orange-500/10 border border-orange-500/20"
            : "bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-800/50"
        )}>
          <div className="flex items-center justify-center gap-2">
            {isGoalReached && <Sparkles className="w-4 h-4 text-orange-500" />}
            <p className={cn(
              "text-sm font-medium",
              isGoalReached ? "text-orange-600 dark:text-orange-400" : "text-zinc-600 dark:text-zinc-400"
            )}>
              {isGoalReached
                ? "Amazing! You've crushed your monthly goal! 🎉"
                : `${(monthlyGoal - points).toLocaleString()} points to reach your goal!`}
            </p>
            {isGoalReached && <Sparkles className="w-4 h-4 text-orange-500" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

