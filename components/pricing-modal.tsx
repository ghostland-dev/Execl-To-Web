"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Crown, Zap, Loader2, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: string
  onUpgrade: (plan: string) => void
}

export function PricingModal({ isOpen, onClose, currentPlan, onUpgrade }: PricingModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const { toast } = useToast()

  const plans = [
    {
      id: "free",
      name: "Gratuit",
      price: 0,
      description: "Pour découvrir",
      icon: Zap,
      features: ["1 application", "100 lignes de données", "Support communautaire", "Templates de base"],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: 19,
      description: "Pour les PME",
      icon: Crown,
      features: [
        "Applications illimitées",
        "Données illimitées",
        "Support prioritaire",
        "Workflows avancés",
        "Templates premium",
        "Export avancé",
        "Intégrations API",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 99,
      description: "Pour les grandes équipes",
      icon: Crown,
      features: [
        "Tout du plan Pro",
        "SSO (Single Sign-On)",
        "Support dédié",
        "SLA 99.9%",
        "Audit logs",
        "Déploiement on-premise",
        "Formation équipe",
      ],
      popular: false,
    },
  ]

  const handleUpgrade = async (planId: string) => {
    if (planId === "free") return

    setIsProcessing(true)
    setSelectedPlan(planId)

    try {
      // Simulate Stripe payment process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real implementation, you would:
      // 1. Create Stripe checkout session
      // 2. Redirect to Stripe
      // 3. Handle webhook for successful payment
      // 4. Update user plan in database

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          userId: JSON.parse(localStorage.getItem("refineryai_user") || "{}").id,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement")
      }

      const { checkoutUrl } = await response.json()

      // Simulate successful upgrade for demo
      onUpgrade(planId)
      onClose()

      toast({
        title: "Mise à niveau réussie !",
        description: `Vous êtes maintenant sur le plan ${plans.find((p) => p.id === planId)?.name}`,
      })

      // In real app, redirect to Stripe
      // window.location.href = checkoutUrl
    } catch (error) {
      console.error("Error upgrading plan:", error)
      toast({
        title: "Erreur",
        description: "Impossible de traiter le paiement. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setSelectedPlan("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choisissez votre plan</DialogTitle>
          <DialogDescription>Sélectionnez le plan qui correspond le mieux à vos besoins</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "border-2 border-blue-500" : ""} ${
                currentPlan === plan.id ? "bg-gray-50" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">Populaire</Badge>
              )}
              {currentPlan === plan.id && <Badge className="absolute -top-2 right-4 bg-green-500">Plan actuel</Badge>}

              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <plan.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-3xl font-bold">
                  {plan.price}€<span className="text-sm font-normal">/mois</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={currentPlan === plan.id ? "outline" : plan.popular ? "default" : "outline"}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isProcessing || currentPlan === plan.id}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Traitement...
                    </>
                  ) : currentPlan === plan.id ? (
                    "Plan actuel"
                  ) : plan.id === "free" ? (
                    "Gratuit"
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Choisir {plan.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">💳 Paiement sécurisé</h4>
          <p className="text-sm text-gray-600 mb-2">
            Tous les paiements sont traités de manière sécurisée par Stripe. Vous pouvez annuler à tout moment.
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>🔒 SSL sécurisé</span>
            <span>💳 Cartes acceptées</span>
            <span>🔄 Annulation facile</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
