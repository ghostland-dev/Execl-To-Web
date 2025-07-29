"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Wand2, Settings, Palette, Code, Zap, CheckCircle } from "lucide-react"

interface AppGeneratorProps {
  analysisResult: any
  onGenerate: (config: any) => void
  isProcessing: boolean
}

export function AppGenerator({ analysisResult, onGenerate, isProcessing }: AppGeneratorProps) {
  const [config, setConfig] = useState({
    appName: analysisResult.suggestedAppType || "Mon Application",
    description: "Application générée automatiquement par RefineryAI",
    appType: "dashboard",
    theme: "modern",
    primaryColor: "#3B82F6",
    features: {
      responsive: true,
      darkMode: false,
      authentication: false,
      realTime: false,
      export: true,
      search: true,
    },
    deployment: {
      platform: "vercel",
      customDomain: false,
      ssl: true,
    },
  })

  const [generationStep, setGenerationStep] = useState(0)
  const [generationProgress, setGenerationProgress] = useState(0)

  const generationSteps = [
    "Analyse de la structure des données",
    "Génération de l'interface utilisateur",
    "Création des composants interactifs",
    "Application du thème et des styles",
    "Optimisation et tests",
    "Préparation du déploiement",
  ]

  const handleGenerate = async () => {
    setGenerationStep(0)
    setGenerationProgress(0)

    // Simulate generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i)

      // Simulate progress for each step
      for (let progress = 0; progress <= 100; progress += 10) {
        setGenerationProgress((i * 100 + progress) / generationSteps.length)
        await new Promise((resolve) => setTimeout(resolve, 50))
      }
    }

    onGenerate(config)
  }

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateFeature = (feature: string, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: enabled,
      },
    }))
  }

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Wand2 className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Génération en cours</h3>
                <p className="text-sm text-gray-600 mb-4">{generationSteps[generationStep]}</p>
                <Progress value={generationProgress} className="w-full max-w-xs mx-auto" />
                <p className="text-xs text-gray-500 mt-2">{Math.round(generationProgress)}% terminé</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-4">Étapes de génération</h4>
            <div className="space-y-3">
              {generationSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < generationStep
                        ? "bg-green-100 text-green-600"
                        : index === generationStep
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index < generationStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm ${index <= generationStep ? "text-gray-900" : "text-gray-500"}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Analyse terminée</h3>
              <p className="text-sm text-green-700">
                Type suggéré: {analysisResult.suggestedAppType} • Confiance: {analysisResult.confidence}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">
            <Settings className="w-4 h-4 mr-2" />
            Basique
          </TabsTrigger>
          <TabsTrigger value="design">
            <Palette className="w-4 h-4 mr-2" />
            Design
          </TabsTrigger>
          <TabsTrigger value="features">
            <Zap className="w-4 h-4 mr-2" />
            Fonctionnalités
          </TabsTrigger>
          <TabsTrigger value="deployment">
            <Code className="w-4 h-4 mr-2" />
            Déploiement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration de base</CardTitle>
              <CardDescription>Définissez les paramètres principaux de votre application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="appName">Nom de l'application</Label>
                <Input
                  id="appName"
                  value={config.appName}
                  onChange={(e) => updateConfig("appName", e.target.value)}
                  placeholder="Mon Application"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={config.description}
                  onChange={(e) => updateConfig("description", e.target.value)}
                  placeholder="Décrivez votre application..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="appType">Type d'application</Label>
                <Select value={config.appType} onValueChange={(value) => updateConfig("appType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard Analytics</SelectItem>
                    <SelectItem value="crud">Application CRUD</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apparence et thème</CardTitle>
              <CardDescription>Personnalisez l'apparence de votre application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Thème</Label>
                <Select value={config.theme} onValueChange={(value) => updateConfig("theme", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Moderne</SelectItem>
                    <SelectItem value="minimal">Minimaliste</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="creative">Créatif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="primaryColor">Couleur principale</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig("primaryColor", e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <Input
                    value={config.primaryColor}
                    onChange={(e) => updateConfig("primaryColor", e.target.value)}
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-2"></div>
                  <p className="text-sm font-medium">Moderne</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-full h-20 bg-gray-100 border-2 border-gray-300 rounded mb-2"></div>
                  <p className="text-sm font-medium">Minimaliste</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités</CardTitle>
              <CardDescription>Sélectionnez les fonctionnalités à inclure dans votre application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={feature} className="capitalize">
                      {feature === "darkMode"
                        ? "Mode sombre"
                        : feature === "authentication"
                          ? "Authentification"
                          : feature === "realTime"
                            ? "Temps réel"
                            : feature === "export"
                              ? "Export de données"
                              : feature === "search"
                                ? "Recherche"
                                : feature === "responsive"
                                  ? "Design responsive"
                                  : feature}
                    </Label>
                    <p className="text-sm text-gray-600">
                      {feature === "responsive" && "Adaptation automatique à tous les écrans"}
                      {feature === "darkMode" && "Basculer entre thème clair et sombre"}
                      {feature === "authentication" && "Système de connexion utilisateur"}
                      {feature === "realTime" && "Mise à jour des données en temps réel"}
                      {feature === "export" && "Exporter les données en CSV, PDF, etc."}
                      {feature === "search" && "Barre de recherche intégrée"}
                    </p>
                  </div>
                  <Switch
                    id={feature}
                    checked={enabled as boolean}
                    onCheckedChange={(checked) => updateFeature(feature, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Déploiement</CardTitle>
              <CardDescription>Configurez les options de déploiement de votre application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platform">Plateforme de déploiement</Label>
                <Select
                  value={config.deployment.platform}
                  onValueChange={(value) => updateConfig("deployment", { ...config.deployment, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vercel">Vercel</SelectItem>
                    <SelectItem value="netlify">Netlify</SelectItem>
                    <SelectItem value="aws">AWS</SelectItem>
                    <SelectItem value="heroku">Heroku</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ssl">Certificat SSL</Label>
                  <p className="text-sm text-gray-600">Sécuriser votre application avec HTTPS</p>
                </div>
                <Switch
                  id="ssl"
                  checked={config.deployment.ssl}
                  onCheckedChange={(checked) => updateConfig("deployment", { ...config.deployment, ssl: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="customDomain">Domaine personnalisé</Label>
                  <p className="text-sm text-gray-600">Utiliser votre propre nom de domaine</p>
                </div>
                <Switch
                  id="customDomain"
                  checked={config.deployment.customDomain}
                  onCheckedChange={(checked) =>
                    updateConfig("deployment", { ...config.deployment, customDomain: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Prêt à générer votre application ?</h3>
            <p className="text-gray-600">
              Votre configuration est prête. Cliquez sur le bouton ci-dessous pour générer votre application.
            </p>

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Badge variant="outline">{config.appType}</Badge>
              <Badge variant="outline">{config.theme}</Badge>
              <Badge variant="outline">{Object.values(config.features).filter(Boolean).length} fonctionnalités</Badge>
            </div>

            <Button
              onClick={handleGenerate}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Générer l'application
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
