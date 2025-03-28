"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Footprints, TrendingUp, TrendingDown } from "lucide-react"

interface StepsData {
  day: string
  steps: number
  goal: number
}

interface StepsChartProps {
  data: StepsData[]
  className?: string
}

export function StepsChart({ data, className }: StepsChartProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedSteps, setSelectedSteps] = useState<number | null>(null)

  const handleBarClick = (day: string, steps: number) => {
    setSelectedDay(day)
    setSelectedSteps(steps)
  }

  const maxSteps = Math.max(...data.map((d) => Math.max(d.steps, d.goal))) * 1.1
  const totalSteps = data.reduce((sum, item) => sum + item.steps, 0)
  const averageSteps = Math.round(totalSteps / data.length)
  const trend = data[data.length - 1].steps - data[0].steps

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Weekly Steps</CardTitle>
              <CardDescription>
                {selectedDay && selectedSteps
                  ? `${selectedSteps.toLocaleString()} steps on ${selectedDay}`
                  : `${averageSteps.toLocaleString()} daily average`}
              </CardDescription>
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full text-sm",
            trend > 0 
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
          )}>
            {trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(trend).toLocaleString()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Chart Container */}
          <div className="h-[300px]">
            {/* Chart Grid */}
            <div className="relative h-[250px]">
              {/* Grid Lines */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-b border-zinc-100 dark:border-zinc-800"
                  style={{ bottom: `${i * 25}%` }}
                />
              ))}

              {/* Bars */}
              <div className="absolute inset-x-0 bottom-0 flex justify-between h-full px-4">
                {data.map((item, index) => (
                  <div
                    key={item.day}
                    className="relative flex flex-col items-center"
                    style={{ width: '12%' }}
                  >
                    {/* Goal Line */}
                    <div
                      className="absolute w-full border-t-2 border-dashed border-blue-200 dark:border-blue-800"
                      style={{
                        bottom: `${(item.goal / maxSteps) * 100}%`,
                        zIndex: 1
                      }}
                    />

                    {/* Bar */}
                    <div className="relative w-full h-full flex items-end">
                      <div
                        className="w-full group cursor-pointer"
                        style={{ height: `${(item.steps / maxSteps) * 100}%` }}
                        onClick={() => handleBarClick(item.day, item.steps)}
                      >
                        <div className="w-full h-full bg-gradient-to-t from-blue-500 to-indigo-500 rounded-t-lg transition-all duration-200 group-hover:from-blue-600 group-hover:to-indigo-600" />
                        
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-16 left-1/2 -translate-x-1/2 p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg pointer-events-none z-10">
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                            {item.steps.toLocaleString()} steps
                          </p>
                          <p className="text-xs text-zinc-500 whitespace-nowrap">
                            Goal: {item.goal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Day Label */}
                    <div className="absolute -bottom-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {item.day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-sm text-zinc-500">Total Steps</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {totalSteps.toLocaleString()}
              </p>
            </div>
            <div className="text-center border-l border-r border-zinc-100 dark:border-zinc-800">
              <p className="text-sm text-zinc-500">Daily Average</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {averageSteps.toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-zinc-500">Goal Progress</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {Math.round((totalSteps / (data.reduce((sum, item) => sum + item.goal, 0))) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

