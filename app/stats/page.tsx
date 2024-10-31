"use client"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const mockData = [
  { date: "2024-03-20", accuracy: 75 },
  { date: "2024-03-21", accuracy: 80 },
  { date: "2024-03-22", accuracy: 85 },
  { date: "2024-03-23", accuracy: 82 },
  { date: "2024-03-24", accuracy: 88 },
]

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-4xl">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Performance Statistics</h1>
            <div className="mt-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Games Played
                  </h3>
                  <p className="mt-2 text-3xl font-bold">24</p>
                </Card>
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Average Accuracy
                  </h3>
                  <p className="mt-2 text-3xl font-bold">82%</p>
                </Card>
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Highest N-Back
                  </h3>
                  <p className="mt-2 text-3xl font-bold">4</p>
                </Card>
              </div>

              <div className="mt-8 h-[400px]">
                <h2 className="mb-4 text-lg font-medium">Accuracy Over Time</h2>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}