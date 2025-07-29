"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Check,
  X,
  Crown,
  Zap,
  Star,
  Users,
  Building,
  ArrowRight,
  Calculator,
  HelpCircle,
  Shield,
  Headphones,
  Globe,
  Database,
  Code,
  Smartphone,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const { toast } = useToast()

  const plans = [
    {
      id: "free",
      name: "Gratuit",
      description: "Parfait pour découvrir RefineryAI",
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      popular: false,
      features: [
        { name: "1 application", included: true },
        { name: "100 lignes de données", included: true },
        { name: "Templates de base", included: true },
        { name: "Support communautaire", included: true },
        { name: "Export basique", included: true },
        { name: "Applications illimitées", included: false },
        { name: "Données illimitées", included: false },
        { name: "Support prioritaire", included: false },
        { name: "Templates premium", included: false },
        { name: "API personnalisée", included: false },
        { name: "Intégrations avancées", included: false },
        { name: "Déploiement personnalisé", included: false },
      ],
      cta: "Commencer gratuitement",
      highlight: false,
    },
    {
      id: "pro",
      name: "Pro",
      description: "Idéal pour les professionnels et PME",
      icon: Crown,
      price: { monthly: 19, yearly: 15 },
      popular: true,
      features: [
        { name: "Applications illimitées", included: true },
        { name: "Données illimitées", included: true },
        { name: "Templates premium", included: true },
        { name: "Support prioritaire", included: true },
        { name: "Export avancé (PDF, Excel)", included: true },
        { name: "Intégrations API", included: true },
        { name: "Workflows personnalisés", included: true },
        { name: "Analytics avancées", included: true },
        { name: "Domaine personnalisé", included: true },
        { name: "Sauvegarde automatique", included: true },
        { name: "SSO (Single Sign-On)", included: false },
        { name: "Support dédié", included: false },
      ],
      cta: "Essayer Pro",
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Pour les grandes équipes et entreprises",
      icon: Building,
      price: { monthly: 99, yearly: 79 },
      popular: false,
      features: [
        { name: "Tout du plan Pro", included: true },
        { name: "SSO (Single Sign-On)", included: true },
        { name: "Support dédié 24/7", included: true },
        { name: "SLA 99.9%", included: true },
        { name: "Audit logs", included: true },
        { name: "Déploiement on-premise", included: true },
        { name: "Formation équipe", included: true },
        { name: "API personnalisée", included: true },
        { name: "Intégrations sur mesure", included: true },
        { name: "Gestion utilisateurs avancée", included: true },
        { name: "Conformité RGPD", included: true },
        { name: "Backup personnalisé", included: true },
      ],
      cta: "Contacter l'équipe",
      highlight: false,
    },
  ]

  const addons = [
    {
      name: "Stockage supplémentaire",
      description: "100 GB d'espace de stockage additionnel",
      price: 5,
      icon: Database,
    },
    {
      name: "Applications mobiles",
      description: "Génération d'apps iOS et Android",
      price: 15,
      icon: Smartphone,
    },
    {
      name: "Support prioritaire",
      description: "Réponse garantie sous 2h",
      price: 25,
      icon: Headphones,
    },
    {
      name: "Développement sur mesure",
      description: "Fonctionnalités personnalisées",
      price: 199,
      icon: Code,
    },
  ]

  const faqs = [
    {
      question: "Puis-je changer de plan à tout moment ?",
      answer:
        "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.",
    },
    {
      question: "Y a-t-il une période d'essai gratuite ?",
      answer:
        "Le plan gratuit vous permet de tester toutes les fonctionnalités de base. Les plans payants offrent 14 jours d'essai gratuit.",
    },
    {
      question: "Que se passe-t-il si je dépasse mes limites ?",
      answer:
        "Nous vous préviendrons avant d'atteindre vos limites. Vous pourrez alors upgrader votre plan ou acheter des add-ons.",
    },
    {
      question: "Les paiements sont-ils sécurisés ?",
      answer: "Oui, tous les paiements sont traités de manière sécurisée par Stripe avec chiffrement SSL.",
    },
    {
      question: "Proposez-vous des remises pour les étudiants ?",
      answer:
        "Oui, nous offrons 50% de réduction sur tous les plans pour les étudiants avec une adresse email éducative valide.",
    },
    {
      question: "Puis-je annuler mon abonnement ?",
      answer:
        "Vous pouvez annuler votre abonnement à tout moment. Aucune pénalité, et vous gardez l'accès jusqu'à la fin de votre période de facturation.",
    },
  ]

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)

    if (planId === "free") {
      toast({
        title: "Plan gratuit sélectionné",
        description: "Vous pouvez commencer à utiliser RefineryAI immédiatement !",
      })
    } else {
      toast({
        title: "Redirection vers le paiement",
        description: `Configuration du plan ${plans.find((p) => p.id === planId)?.name}...`,
      })
    }
  }

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12
    const yearlyCost = yearly * 12
    const savings = monthlyCost - yearlyCost
    const percentage = Math.round((savings / monthlyCost) * 100)
    return { savings, percentage }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Tarification
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choisissez votre plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Des tarifs transparents et flexibles pour tous vos besoins. Commencez gratuitement et évoluez selon votre
            croissance.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isYearly ? "font-semibold text-gray-900" : "text-gray-600"}`}>Mensuel</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-blue-600" />
            <span className={`text-sm ${isYearly ? "font-semibold text-gray-900" : "text-gray-600"}`}>Annuel</span>
            {isYearly && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 ml-2">
                Économisez jusqu'à 21%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const PlanIcon = plan.icon
            const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly
            const savings = plan.price.monthly > 0 ? calculateSavings(plan.price.monthly, plan.price.yearly) : null

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.highlight ? "border-2 border-blue-500 scale-105" : "hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 inline mr-1" />
                    Plus populaire
                  </div>
                )}

                <CardHeader className={plan.popular ? "pt-12" : "pt-6"}>
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        plan.highlight ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <PlanIcon className={`w-6 h-6 ${plan.highlight ? "text-blue-600" : "text-gray-600"}`} />
                    </div>
                  </div>

                  <CardTitle className="text-center text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-center">{plan.description}</CardDescription>

                  <div className="text-center py-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">{currentPrice}€</span>
                      <span className="text-gray-600 ml-1">/mois</span>
                    </div>

                    {savings && isYearly && (
                      <div className="text-sm text-green-600 mt-1">
                        Économisez {savings.savings}€/an ({savings.percentage}%)
                      </div>
                    )}

                    {!isYearly && plan.price.monthly > 0 && (
                      <div className="text-sm text-gray-500 mt-1">
                        ou {plan.price.yearly}€/mois facturé annuellement
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-900" : "text-gray-500"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    className={`w-full ${
                      plan.highlight
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5" />
                Modules complémentaires
              </CardTitle>
              <CardDescription className="text-center">
                Personnalisez votre expérience avec nos add-ons optionnels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {addons.map((addon, index) => {
                  const AddonIcon = addon.icon
                  return (
                    <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <AddonIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2">{addon.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{addon.description}</p>
                      <div className="text-lg font-bold text-blue-600">+{addon.price}€/mois</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Comparaison détaillée</CardTitle>
              <CardDescription className="text-center">
                Comparez toutes les fonctionnalités de nos plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Fonctionnalité</th>
                      <th className="text-center py-3 px-4">Gratuit</th>
                      <th className="text-center py-3 px-4">Pro</th>
                      <th className="text-center py-3 px-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Applications", free: "1", pro: "Illimitées", enterprise: "Illimitées" },
                      { name: "Lignes de données", free: "100", pro: "Illimitées", enterprise: "Illimitées" },
                      { name: "Templates", free: "Basiques", pro: "Premium", enterprise: "Premium + Custom" },
                      { name: "Support", free: "Communauté", pro: "Prioritaire", enterprise: "Dédié 24/7" },
                      { name: "API", free: "❌", pro: "✅", enterprise: "✅ + Custom" },
                      { name: "SSO", free: "❌", pro: "❌", enterprise: "✅" },
                      { name: "SLA", free: "❌", pro: "99%", enterprise: "99.9%" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{row.name}</td>
                        <td className="py-3 px-4 text-center">{row.free}</td>
                        <td className="py-3 px-4 text-center">{row.pro}</td>
                        <td className="py-3 px-4 text-center">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Sécurisé</h4>
                  <p className="text-sm text-gray-600">Chiffrement SSL et conformité RGPD</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">10,000+ utilisateurs</h4>
                  <p className="text-sm text-gray-600">Font confiance à RefineryAI</p>
                </div>
                <div className="text-center">
                  <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Disponible 24/7</h4>
                  <p className="text-sm text-gray-600">Service mondial sans interruption</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold">4.9/5 étoiles</h4>
                  <p className="text-sm text-gray-600">Note moyenne de nos utilisateurs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
