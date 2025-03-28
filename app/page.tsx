"use client"

import { useState } from "react"
import { Flame, Medal, Footprints } from "lucide-react"
import { Greeting } from "@/components/greeting"
import { Profile } from "@/components/profile"
import { ThemeToggle } from "@/components/theme-toggle"
import { StepsChart } from "@/components/steps-chart"
import { ActivityCard, type Goal, type Metric } from "@/components/ui/activity-card"
import { StatsCard } from "@/components/stats-card"
import { PointsCard } from "@/components/points-card"
import { HealthMetricsCard } from "@/components/health-metrics-card"
import { FitnessCard } from "@/components/fitness-card"
// Sample data
const WEEKLY_STEPS_DATA = [
  { day: "Mon", steps: 8432, goal: 10000 },
  { day: "Tue", steps: 7891, goal: 10000 },
  { day: "Wed", steps: 9283, goal: 10000 },
  { day: "Thu", steps: 12483, goal: 10000 },
  { day: "Fri", steps: 11092, goal: 10000 },
  { day: "Sat", steps: 8129, goal: 10000 },
  { day: "Sun", steps: 7438, goal: 10000 },
]

const INITIAL_METRICS: Metric[] = [
  { label: "Move", value: "420", trend: 85, unit: "cal" },
  { label: "Exercise", value: "35", trend: 70, unit: "min" },
  { label: "Stand", value: "10", trend: 83, unit: "hrs" },
]

const INITIAL_GOALS: Goal[] = [
  { id: "1", title: "30min Morning Yoga", isCompleted: true },
  { id: "2", title: "10k Steps", isCompleted: false },
  { id: "3", title: "Drink 2L Water", isCompleted: true },
]

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS)
  const [metrics, setMetrics] = useState<Metric[]>(INITIAL_METRICS)

  const handleToggleGoal = (goalId: string) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, isCompleted: !goal.isCompleted } : goal)))
  }

  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: `goal-${goals.length + 1}`,
      title: `New Goal ${goals.length + 1}`,
      isCompleted: false,
    }
    setGoals((prev) => [...prev, newGoal])
  }

  const handleViewDetails = () => {
    console.log("Viewing details")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-slate-50 dark:from-zinc-950 dark:to-slate-950">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Greeting />

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Profile name="Swaroop Acharya" avatarUrl="/avatar.jpg?height=40&width=40" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Activity Stats */}
          <StatsCard
            title="Daily Steps"
            value={WEEKLY_STEPS_DATA[6].steps.toLocaleString()}
            description="Goal: 10,000 steps"
            icon={<Footprints className="w-4 h-4 text-blue-600" />}
            trend={5}
            gradientFrom="from-blue-50"
            gradientTo="to-cyan-50"
          />

          <StatsCard
            title="Calories Burnt"
            value="487"
            description="Goal: 500 calories"
            icon={<Flame className="w-4 h-4 text-orange-600" />}
            trend={12}
            gradientFrom="from-orange-50"
            gradientTo="to-red-50"
          />

          <StatsCard
            title="Current Streak"
            value="7 days"
            description="Personal best: 14 days"
            icon={<Medal className="w-4 h-4 text-yellow-600" />}
            trend={0}
            gradientFrom="from-yellow-50"
            gradientTo="to-amber-50"
          />

          {/* Steps Chart */}
          <div className="md:col-span-2">
            <StepsChart data={WEEKLY_STEPS_DATA} />
          </div>

          {/* Points Card */}
          <PointsCard points={750} monthlyGoal={1000} />

          {/* Activity Card */}
          <ActivityCard
            metrics={metrics}
            dailyGoals={goals}
            onAddGoal={handleAddGoal}
            onToggleGoal={handleToggleGoal}
            onViewDetails={handleViewDetails}
          />

          {/* Combined Health Metrics Card */}
          <HealthMetricsCard
            sleepHours={7.5}
            sleepQuality={85}
            bedTime="10:30 PM"
            wakeTime="6:00 AM"
            percentageChange={20}
            height={"5'11\""}
            weight="165 lbs"
            bmi={23.1}
          />
          <FitnessCard
            calories={1250}
            activeMinutes={45}
            heartRate={72}
            workouts={[
              {
                name: "Morning Run",
                duration: 30,
                calories: 320,
                intensity: "High"
              },
              {
                name: "Weight Training",
                duration: 45,
                calories: 280,
                intensity: "Medium"
              },
              {
                name: "Evening Walk",
                duration: 20,
                calories: 110,
                intensity: "Low"
              }
            ]}
          />
        </div>
      </main>
    </div>
  )
}

