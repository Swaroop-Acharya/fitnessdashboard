"use client"

import { Ruler, Weight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BodyMetricsProps {
  height: string
  weight: string
  bmi: number
  className?: string
}

export function BodyMetrics({ height, weight, bmi, className }: BodyMetricsProps) {
  // Determine BMI category
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  const bmiCategory = getBmiCategory(bmi)

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Body Metrics</CardTitle>
        <CardDescription>Your height and weight measurements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
            <div className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
              <Ruler className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Height</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{`${height}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
            <div className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
              <Weight className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Weight</p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">{`${weight}`}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-500">BMI</span>
            <span className="text-sm font-medium text-zinc-900 dark:text-white">{bmi.toFixed(1)}</span>
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full",
                bmiCategory === "Underweight" && "bg-blue-500",
                bmiCategory === "Normal" && "bg-green-500",
                bmiCategory === "Overweight" && "bg-yellow-500",
                bmiCategory === "Obese" && "bg-red-500",
              )}
              style={{ width: `${Math.min(bmi * 2.5, 100)}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-zinc-500 text-center">{bmiCategory}</div>
        </div>
      </CardContent>
    </Card>
  )
}

