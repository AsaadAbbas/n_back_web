"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useGameStore } from "@/hooks/use-game-store"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const { settings, updateSettings } = useGameStore()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-2xl">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Game Settings</h1>
            <div className="mt-8 space-y-6">
              <div className="space-y-4">
                <Label>N-Back Level ({settings.nBack})</Label>
                <Slider
                  value={[settings.nBack]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={([value]) => updateSettings({ nBack: value })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Position Matching</Label>
                <Switch
                  checked={settings.positionEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ positionEnabled: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Sound Matching</Label>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ soundEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-4">
                <Label>Round Duration ({settings.roundDuration}ms)</Label>
                <Slider
                  value={[settings.roundDuration]}
                  min={1000}
                  max={5000}
                  step={500}
                  onValueChange={([value]) =>
                    updateSettings({ roundDuration: value })
                  }
                />
              </div>

              <div className="space-y-4">
                <Label>Total Rounds ({settings.totalRounds})</Label>
                <Slider
                  value={[settings.totalRounds]}
                  min={10}
                  max={50}
                  step={5}
                  onValueChange={([value]) =>
                    updateSettings({ totalRounds: value })
                  }
                />
              </div>

              <Button
                className="w-full"
                onClick={() => router.push("/game")}
              >
                Start Game
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}