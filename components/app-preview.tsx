"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Eye,
  Code,
  Download,
  Share2,
  Rocket,
  Globe,
  Smartphone,
  Monitor,
  Copy,
  ExternalLink,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AppPreviewProps {
  app: any
  onReset: () => void
}

export function AppPreview({ app, onReset }: AppPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [previewDevice, setPreviewDevice] = useState("desktop")
  const { toast } = useToast()

  const handleCopyCode = (codeType: string) => {
    const code = app.code[codeType]
    navigator.clipboard.writeText(code)

    toast({
      title: "Code copié !",
      description: `Le code ${codeType.toUpperCase()} a été copié dans le presse-papier.`,
    })
  }

  const handleDownload = () => {
    // Create a zip-like structure simulation
    const files = {
      "index.html": app.code.html,
      "styles.css": app.code.css,
      "script.js": app.code.javascript,
      "README.md": `# ${app.name}

${app.description}

## Installation

1. Téléchargez tous les fichiers
2. Ouvrez index.html dans votre navigateur
3. Ou déployez sur votre serveur web préféré

## Fonctionnalités

${app.features.map((feature: string) => `- ${feature}`).join("\n")}

Généré avec RefineryAI le ${new Date(app.createdAt).toLocaleDateString()}
`,
    }

    // Simulate download
    Object.entries(files).forEach(([filename, content]) => {
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    })

    toast({
      title: "Téléchargement démarré !",
      description: "Tous les fichiers de votre application sont en cours de téléchargement.",
    })
  }

  const handleDeploy = () => {
    toast({
      title: "Déploiement en cours...",
      description: "Votre application est en cours de déploiement sur Vercel.",
    })

    // Simulate deployment
    setTimeout(() => {
      toast({
        title: "Déploiement réussi ! 🚀",
        description: `Votre application est maintenant disponible à l'adresse ${app.url}`,
      })
    }, 3000)
  }

  const handleShare = () => {
    const shareData = {
      title: app.name,
      text: `Découvrez ${app.name} - ${app.description}`,
      url: app.url,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(app.url)
      toast({
        title: "Lien copié !",
        description: "Le lien de votre application a été copié dans le presse-papier.",
      })
    }
  }

  const getDeviceClass = () => {
    switch (previewDevice) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      default:
        return "w-full"
    }
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900">{app.name}</h3>
              <p className="text-sm text-green-700">{app.description}</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Généré avec succès
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </TabsTrigger>
          <TabsTrigger value="code">
            <Code className="w-4 h-4 mr-2" />
            Code Source
          </TabsTrigger>
          <TabsTrigger value="deploy">
            <Rocket className="w-4 h-4 mr-2" />
            Déploiement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          {/* Device Selector */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Aperçu de l'application</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={previewDevice === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={previewDevice === "tablet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Smartphone className="w-4 h-4 rotate-90" />
                  </Button>
                  <Button
                    variant={previewDevice === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Preview Frame */}
              <div className={`border rounded-lg overflow-hidden ${getDeviceClass()}`}>
                <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded px-2 py-1 text-gray-600">{app.url}</div>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="bg-white" style={{ minHeight: "400px" }}>
                  <iframe srcDoc={app.code.html} className="w-full h-96 border-0" title="App Preview" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Fonctionnalités incluses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {app.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <div className="grid gap-4">
            {/* HTML */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">HTML</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleCopyCode("html")}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{app.code.html}</code>
                </pre>
              </CardContent>
            </Card>

            {/* CSS */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">CSS</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleCopyCode("css")}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{app.code.css}</code>
                </pre>
              </CardContent>
            </Card>

            {/* JavaScript */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">JavaScript</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => handleCopyCode("javascript")}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{app.code.javascript}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Options de déploiement</CardTitle>
              <CardDescription>Choisissez comment vous souhaitez déployer votre application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">▲</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Vercel</h4>
                      <p className="text-sm text-gray-600">Déploiement instantané</p>
                    </div>
                  </div>
                  <Button onClick={handleDeploy} className="w-full">
                    <Rocket className="w-4 h-4 mr-2" />
                    Déployer sur Vercel
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Netlify</h4>
                      <p className="text-sm text-gray-600">Hébergement statique</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Globe className="w-4 h-4 mr-2" />
                    Déployer sur Netlify
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Téléchargement manuel</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Téléchargez tous les fichiers pour un déploiement manuel sur votre serveur.
                </p>
                <Button onClick={handleDownload} variant="outline" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger les fichiers
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations de déploiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">URL de l'application:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{app.url}</span>
                    <Button variant="ghost" size="sm" onClick={() => window.open(app.url, "_blank")}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant="secondary" className="text-green-600">
                    {app.status === "generated" ? "Prêt à déployer" : "Déployé"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Créé le:</span>
                  <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleShare} variant="outline" size="lg">
          <Share2 className="w-5 h-5 mr-2" />
          Partager
        </Button>

        <Button onClick={handleDownload} variant="outline" size="lg">
          <Download className="w-5 h-5 mr-2" />
          Télécharger
        </Button>

        <Button onClick={handleDeploy} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Rocket className="w-5 h-5 mr-2" />
          Déployer maintenant
        </Button>

        <Button onClick={onReset} variant="outline" size="lg">
          <RefreshCw className="w-5 h-5 mr-2" />
          Nouvelle application
        </Button>
      </div>
    </div>
  )
}
