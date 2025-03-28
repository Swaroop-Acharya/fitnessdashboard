"use client"

import { Activity, ArrowUpRight, Plus, Target, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export interface Metric {
  label: string
  value: string
  trend: number
  unit?: "cal" | "min" | "hrs"
}

export interface Goal {
  id: string
  title: string
  isCompleted: boolean
}

interface ActivityCardProps {
  category?: string
  title?: string
  metrics?: Metric[]
  dailyGoals?: Goal[]
  onAddGoal?: () => void
  onToggleGoal?: (goalId: string) => void
  onViewDetails?: () => void
  className?: string
}

const METRIC_COLORS = {
  Move: "#FF2D55",
  Exercise: "#2CD758",
  Stand: "#007AFF",
} as const

export function ActivityCard({
  category = "Activity",
  title = "Today's Progress",
  metrics = [],
  dailyGoals = [],
  onAddGoal,
  onToggleGoal,
  onViewDetails,
  className,
}: ActivityCardProps) {
  const [isHovering, setIsHovering] = useState<string | null>(null)

  return (
    <div
      className={cn(
        "relative h-full rounded-xl p-6 overflow-hidden",
        "bg-white/50 dark:bg-black/20 backdrop-blur-xl",
        "border border-zinc-200 dark:border-zinc-800",
        "transition-all duration-300",
        className,
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20 dark:from-rose-500/5 dark:via-pink-500/5 dark:to-purple-500/5" />

      {/* Header */}
      <div className="relative flex items-center gap-4 mb-8">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-lg">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{category}</p>
        </div>
      </div>

      {/* Metrics Rings */}
      <div className="relative grid grid-cols-3 gap-6 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative group"
            onMouseEnter={() => setIsHovering(metric.label)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative w-24 h-24">
                {/* Background ring with blur effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 blur-sm" />
                
                {/* Main ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-zinc-100 dark:border-zinc-800" />
                
                {/* Progress ring */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full border-[3px] transition-all duration-500",
                    "group-hover:scale-105",
                  )}
                  style={{
                    borderColor: METRIC_COLORS[metric.label as keyof typeof METRIC_COLORS],
                    clipPath: `polygon(0 0, 100% 0, 100% ${metric.trend}%, 0 ${metric.trend}%)`,
                  }}
                />
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
                    {metric.value}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{metric.unit}</span>
                </div>
              </div>
              <span className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">{metric.label}</span>
              <span className="text-xs text-zinc-500">{metric.trend}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Goals Section */}
      <div className="relative space-y-6">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <Target className="w-4 h-4" />
              Today's Goals
            </h4>
            <button
              type="button"
              onClick={onAddGoal}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </button>
          </div>

          <div className="space-y-2">
            {dailyGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => onToggleGoal?.(goal.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl",
                  "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
                  "border border-zinc-200/50 dark:border-zinc-800/50",
                  "hover:border-zinc-300/50 dark:hover:border-zinc-700/50",
                  "transition-all duration-200",
                )}
              >
                <CheckCircle2
                  className={cn(
                    "w-5 h-5 transition-colors",
                    goal.isCompleted ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-600"
                  )}
                />
                <span
                  className={cn(
                    "text-sm text-left transition-all",
                    goal.isCompleted
                      ? "text-zinc-500 dark:text-zinc-400 line-through"
                      : "text-zinc-700 dark:text-zinc-300",
                  )}
                >
                  {goal.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 text-sm font-medium
            text-zinc-600 hover:text-zinc-900 
            dark:text-zinc-400 dark:hover:text-white
            transition-colors duration-200"
        >
          View Activity Details
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

