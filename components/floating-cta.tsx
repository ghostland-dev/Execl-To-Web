"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleGetStarted = () => {
    const demoSection = document.getElementById("demo")
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" })
    }

    toast({
      title: "Démo lancée !",
      description: "Commencez par uploader votre fichier",
    })
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="p-4 shadow-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 max-w-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Prêt à commencer ?</h4>
              <p className="text-xs text-gray-600">Créez votre première app maintenant</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-6 w-6 p-0 hover:bg-gray-100">
            <X className="w-3 h-3" />
          </Button>
        </div>

        <Button
          onClick={handleGetStarted}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm"
          size="sm"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Essayer gratuitement
        </Button>
      </Card>
    </div>
  )
}
