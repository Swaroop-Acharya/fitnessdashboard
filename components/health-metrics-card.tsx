"use client"

import { Moon, Ruler, Sunrise, Sunset, Weight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HealthMetricsCardProps {
  // Sleep data
  sleepHours: number
  sleepQuality: number
  bedTime: string
  wakeTime: string
  percentageChange: number

  // Body metrics
  height: string
  weight: string
  bmi: number

  className?: string
}

export function HealthMetricsCard({
  sleepHours,
  sleepQuality,
  bedTime,
  wakeTime,
  percentageChange,
  height,
  weight,
  bmi,
  className,
}: HealthMetricsCardProps) {
  // Calculate the angle for the gauge based on sleep quality (0-100)
  const gaugeAngle = (sleepQuality / 100) * 180

  // Determine BMI category
  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  const bmiCategory = getBmiCategory(bmi)

  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-xl">Health Metrics</CardTitle>
            <CardDescription>Sleep and body measurements</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="sleep" className="w-full">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="sleep" className="flex-1">
              Sleep
            </TabsTrigger>
            <TabsTrigger value="body" className="flex-1">
              Body
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sleep" className="p-6 space-y-6">
            {/* Sleep Gauge */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-48 h-24 overflow-hidden">
                <div className="absolute bottom-0 w-48 h-48 border-[16px] rounded-full border-zinc-200 dark:border-zinc-800" />
                <div
                  className="absolute bottom-0 w-48 h-48 border-[16px] rounded-full border-indigo-500"
                  style={{
                    clipPath: `polygon(0% 100%, 100% 100%, 100% ${100 - gaugeAngle / 1.8}%, 0% ${
                      100 - gaugeAngle / 1.8
                    }%)`,
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
                      percentageChange > 0
                        ? "text-emerald-500"
                        : percentageChange < 0
                          ? "text-red-500"
                          : "text-zinc-500"
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
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sunset className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-zinc-500">Bed Time</span>
                </div>
                <span className="text-lg font-semibold text-zinc-900 dark:text-white">{bedTime}</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sunrise className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-zinc-500">Wake Time</span>
                </div>
                <span className="text-lg font-semibold text-zinc-900 dark:text-white">{wakeTime}</span>
              </div>
            </div>

            {/* Additional Sleep Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20">
                <div className="text-sm text-zinc-500 mb-1">Sleep Quality</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {sleepQuality}%
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {sleepQuality >= 80 ? "Excellent" : 
                   sleepQuality >= 60 ? "Good" :
                   sleepQuality >= 40 ? "Fair" : "Poor"}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                <div className="text-sm text-zinc-500 mb-1">Deep Sleep</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {Math.round(sleepHours * 0.25)}h
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  25% of total sleep
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="body" className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Ruler className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Height</p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-white">{height}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Weight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Weight</p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-white">{weight}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-50 to-slate-50 dark:from-zinc-900/50 dark:to-slate-900/50">
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

            {/* Additional Body Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20">
                <div className="text-sm text-zinc-500 mb-1">Ideal Weight</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {/* Calculating ideal weight range based on height */}
                  {Math.round(parseFloat(height) * parseFloat(height) * 18.5)}
                  {" - "}
                  {Math.round(parseFloat(height) * parseFloat(height) * 24.9)} kg
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Based on BMI range
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="text-sm text-zinc-500 mb-1">Body Fat %</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {/* Estimated body fat based on BMI (simplified) */}
                  {Math.round(1.2 * bmi + 0.23 * 30 - 5.4)}%
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Estimated from BMI
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

