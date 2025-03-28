"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  trend?: number
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  gradientFrom = "from-blue-500",
  gradientTo = "to-indigo-500",
}: StatsCardProps) {
  const darkGradientFrom = gradientFrom.replace("-500", "-400")
  const darkGradientTo = gradientTo.replace("-500", "-400")

  return (
    <Card className={cn("relative h-full overflow-hidden group", className)}>
      {/* Gradient background that shows on hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 ease-out"
        style={{
          backgroundImage: `linear-gradient(to bottom right, var(--${gradientFrom.split('-')[1]}-500), var(--${gradientTo.split('-')[1]}-500))`
        }}
      />

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-m font-medium text-zinc-600 dark:text-zinc-400">
            {title}
          </CardTitle>
          <div className="relative">
            {/* Gradient ring */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl blur-sm opacity-25" />
            <div className={cn(
              "relative p-2 rounded-xl bg-white dark:bg-zinc-900",
              "ring-1 ring-zinc-200 dark:ring-zinc-800",
              "transition-transform duration-300 ease-out",
              "group-hover:scale-110",
            )}>
              {icon}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Value with gradient text */}
        <div className="text-2xl font-bold bg-gradient-to-br from-zinc-700 to-zinc-900 dark:from-zinc-200 dark:to-white bg-clip-text text-transparent">
          {value}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        )}

        {/* Trend indicator */}
        {trend !== undefined && (
          <div className={cn(
            "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors",
            trend > 0 
              ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" 
              : trend < 0 
                ? "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
                : "text-zinc-700 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-500/10"
          )}>
            <span>
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
            <span className="text-zinc-400 dark:text-zinc-500">vs last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

