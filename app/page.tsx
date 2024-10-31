import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, ChevronRight, Settings } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="flex justify-center">
              <Brain className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              N-Back Training
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Enhance your working memory with the scientifically-proven N-Back training method.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <Link href="/game">
                <Button className="flex items-center space-x-2" size="lg">
                  <span>Start Training</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-lg font-medium">What is N-Back?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                N-Back is a cognitive training exercise that challenges your working memory by asking you to remember and match patterns from N steps back in a sequence.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium">How to Play</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Watch for matching positions and sounds from N steps back. Click the corresponding match button when you spot a match. Start with 1-back and progress as you improve.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium">Benefits</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Regular N-Back training has been shown to improve working memory, focus, and cognitive performance in various tasks.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}