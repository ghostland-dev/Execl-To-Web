"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Clock, DollarSign } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

export function ROICalculator() {
  const [inputs, setInputs] = useState({
    developmentHours: [200],
    hourlyRate: 75,
    maintenanceMonths: 12,
    teamSize: 3,
  })

  const [results, setResults] = useState({
    traditionalCost: 0,
    refineryaiCost: 0,
    timeSaved: 0,
    costSavings: 0,
    roi: 0,
  })

  const [showResults, setShowResults] = useState(false)

  const calculateROI = () => {
    const developmentHours = inputs.developmentHours[0]
    const hourlyRate = inputs.hourlyRate
    const maintenanceMonths = inputs.maintenanceMonths
    const teamSize = inputs.teamSize

    // Traditional development cost
    const traditionalDevelopmentCost = developmentHours * hourlyRate * teamSize
    const traditionalMaintenanceCost = developmentHours * 0.2 * hourlyRate * maintenanceMonths
    const traditionalTotal = traditionalDevelopmentCost + traditionalMaintenanceCost

    // RefineryAI cost (much lower)
    const refineryaiDevelopmentTime = developmentHours * 0.1 // 90% time reduction
    const refineryaiDevelopmentCost = refineryaiDevelopmentTime * hourlyRate
    const refineryaiSubscription = 99 * maintenanceMonths // Monthly subscription
    const refineryaiTotal = refineryaiDevelopmentCost + refineryaiSubscription

    // Calculations
    const timeSaved = developmentHours - refineryaiDevelopmentTime
    const costSavings = traditionalTotal - refineryaiTotal
    const roi = (costSavings / refineryaiTotal) * 100

    setResults({
      traditionalCost: traditionalTotal,
      refineryaiCost: refineryaiTotal,
      timeSaved,
      costSavings,
      roi,
    })

    setShowResults(true)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">
            <Calculator className="w-4 h-4 mr-2" />
            Calculateur ROI
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Calculez vos économies</h2>
          <p className="text-xl text-gray-600">Découvrez combien vous pouvez économiser avec RefineryAI</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Paramètres de votre projet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Heures de développement estimées</Label>
                  <div className="px-3">
                    <Slider
                      value={inputs.developmentHours}
                      onValueChange={(value) => setInputs((prev) => ({ ...prev, developmentHours: value }))}
                      max={1000}
                      min={50}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>50h</span>
                    <span className="font-medium">{inputs.developmentHours[0]}h</span>
                    <span>1000h</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourly-rate">Taux horaire (€)</Label>
                    <Input
                      id="hourly-rate"
                      type="number"
                      value={inputs.hourlyRate}
                      onChange={(e) => setInputs((prev) => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                      min={30}
                      max={200}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team-size">Taille de l'équipe</Label>
                    <Input
                      id="team-size"
                      type="number"
                      value={inputs.teamSize}
                      onChange={(e) => setInputs((prev) => ({ ...prev, teamSize: Number(e.target.value) }))}
                      min={1}
                      max={10}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenance">Période de maintenance (mois)</Label>
                  <Input
                    id="maintenance"
                    type="number"
                    value={inputs.maintenanceMonths}
                    onChange={(e) => setInputs((prev) => ({ ...prev, maintenanceMonths: Number(e.target.value) }))}
                    min={6}
                    max={36}
                  />
                </div>

                <Button
                  onClick={calculateROI}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  size="lg"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculer le ROI
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card
              className={`transition-all duration-500 ${showResults ? "opacity-100 scale-100" : "opacity-50 scale-95"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Résultats de l'analyse
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showResults ? (
                  <div className="space-y-6">
                    {/* ROI Highlight */}
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        <AnimatedCounter end={Math.round(results.roi)} suffix="%" />
                      </div>
                      <p className="text-green-700 font-medium">Retour sur investissement</p>
                    </div>

                    {/* Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                        <DollarSign className="w-6 h-6 text-red-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-red-600">
                          <AnimatedCounter end={Math.round(results.traditionalCost)} prefix="€" />
                        </div>
                        <p className="text-sm text-red-700">Développement traditionnel</p>
                      </div>

                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          <AnimatedCounter end={Math.round(results.refineryaiCost)} prefix="€" />
                        </div>
                        <p className="text-sm text-green-700">Avec RefineryAI</p>
                      </div>
                    </div>

                    {/* Savings Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-blue-600 mr-3" />
                          <span className="font-medium">Temps économisé</span>
                        </div>
                        <span className="font-bold text-blue-600">
                          <AnimatedCounter end={Math.round(results.timeSaved)} suffix="h" />
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 text-green-600 mr-3" />
                          <span className="font-medium">Économies totales</span>
                        </div>
                        <span className="font-bold text-green-600">
                          <AnimatedCounter end={Math.round(results.costSavings)} prefix="€" />
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-3">Prêt à réaliser ces économies ?</p>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                        onClick={() => {
                          const demoSection = document.getElementById("demo")
                          if (demoSection) {
                            demoSection.scrollIntoView({ behavior: "smooth" })
                          }
                        }}
                      >
                        Commencer maintenant
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Remplissez les paramètres pour voir vos économies potentielles</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
