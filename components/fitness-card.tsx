"use client"

import { Activity, Dumbbell, Flame, Heart, Timer, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FitnessCardProps {
  calories: number
  activeMinutes: number
  heartRate: number
  workouts: {
    name: string
    duration: number
    calories: number
    intensity: "Low" | "Medium" | "High"
  }[]
  className?: string
}

export function FitnessCard({
  calories,
  activeMinutes,
  heartRate,
  workouts,
  className,
}: FitnessCardProps) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-xl">Fitness Activity</CardTitle>
            <CardDescription>Daily workout summary</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full rounded-none border-b grid grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-6 space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950/20 dark:to-rose-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-sm text-zinc-500">Calories</span>
                </div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {calories}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Daily Goal: 2000
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <Timer className="w-4 h-4 text-violet-500" />
                  </div>
                  <span className="text-sm text-zinc-500">Active</span>
                </div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {activeMinutes}m
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Goal: 30 mins
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                    <Heart className="w-4 h-4 text-pink-500" />
                  </div>
                  <span className="text-sm text-zinc-500">Heart Rate</span>
                </div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {heartRate}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  bpm
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Today's Activity</h3>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-2">
                {[0, 1, 2, 3].map((hour) => (
                  <div
                    key={hour}
                    className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{
                        width: `${Math.random() * 100}%`,
                      }}
                    />
                  </div>
                ))}
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>6 AM</span>
                  <span>12 PM</span>
                  <span>6 PM</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="p-6 space-y-4">
            <div className="space-y-4">
              {workouts.map((workout, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-900/50 dark:to-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Dumbbell className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-zinc-900 dark:text-white">
                          {workout.name}
                        </h4>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          workout.intensity === "High" 
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : workout.intensity === "Medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        )}>
                          {workout.intensity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-zinc-500">
                          {workout.duration} mins
                        </span>
                        <span className="text-xs text-zinc-500">
                          {workout.calories} cal
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 