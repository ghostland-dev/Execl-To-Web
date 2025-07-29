"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Book, Code, Zap, Globe, Database, Settings, ArrowRight, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Ajouter les handlers pour les boutons de documentation
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Code copié !",
      description: "Le code a été copié dans le presse-papier",
    })
  }

  const handleOpenGithub = (sdk: string) => {
    const githubUrls = {
      javascript: "https://github.com/refineryai/sdk-js",
      python: "https://github.com/refineryai/sdk-python",
      php: "https://github.com/refineryai/sdk-php",
    }

    window.open(githubUrls[sdk as keyof typeof githubUrls], "_blank")
  }

  const handleContactSupport = () => {
    window.open("mailto:support@refineryai.com?subject=Aide intégration API", "_blank")

    toast({
      title: "Support contacté",
      description: "Ouverture de votre client email pour contacter le support",
    })
  }

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/refineryai", "_blank")

    toast({
      title: "Discord",
      description: "Rejoignez notre communauté Discord",
    })
  }

  const quickStart = [
    {
      step: 1,
      title: "Créer un compte",
      description: "Inscrivez-vous gratuitement sur RefineryAI",
      code: "// Aucun code requis - interface web",
    },
    {
      step: 2,
      title: "Uploader votre fichier",
      description: "Glissez-déposez votre fichier Excel, CSV ou Word",
      code: `// Formats supportés
.xlsx, .xls, .csv, .docx, .doc, .pdf`,
    },
    {
      step: 3,
      title: "Configurer l'application",
      description: "Personnalisez le nom, thème et fonctionnalités",
      code: `{
  "name": "Mon App",
  "theme": "blue",
  "features": ["crud", "search", "export"]
}`,
    },
    {
      step: 4,
      title: "Déployer",
      description: "Votre application est automatiquement déployée",
      code: `// URL générée automatiquement
https://mon-app-123.refineryai.com`,
    },
  ]

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/analyze-document",
      description: "Analyser un document uploadé",
      example: `curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.xlsx" \\
  https://api.refineryai.com/analyze-document`,
    },
    {
      method: "POST",
      endpoint: "/api/generate-app",
      description: "Générer une application à partir de l'analyse",
      example: `curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"analysis": {...}, "config": {...}}' \\
  https://api.refineryai.com/generate-app`,
    },
    {
      method: "GET",
      endpoint: "/api/apps",
      description: "Lister toutes vos applications",
      example: `curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.refineryai.com/apps`,
    },
    {
      method: "DELETE",
      endpoint: "/api/apps/{id}",
      description: "Supprimer une application",
      example: `curl -X DELETE \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.refineryai.com/apps/app_123`,
    },
  ]

  const sdks = [
    {
      language: "JavaScript",
      description: "SDK officiel pour Node.js et navigateurs",
      installation: "npm install @refineryai/sdk",
      example: `import { RefineryAI } from '@refineryai/sdk';

const client = new RefineryAI('your-api-key');

const analysis = await client.analyzeDocument(file);
const app = await client.generateApp(analysis, config);`,
    },
    {
      language: "Python",
      description: "SDK Python pour intégrations backend",
      installation: "pip install refineryai",
      example: `from refineryai import RefineryAI

client = RefineryAI('your-api-key')

analysis = client.analyze_document('document.xlsx')
app = client.generate_app(analysis, config)`,
    },
    {
      language: "PHP",
      description: "SDK PHP pour applications web",
      installation: "composer require refineryai/sdk",
      example: `use RefineryAI\\Client;

$client = new Client('your-api-key');

$analysis = $client->analyzeDocument('document.xlsx');
$app = $client->generateApp($analysis, $config);`,
    },
  ]

  const faqs = [
    {
      question: "Comment obtenir une clé API ?",
      answer: "Rendez-vous dans votre dashboard, section 'API Keys', et générez une nouvelle clé. Gardez-la secrète !",
    },
    {
      question: "Quelles sont les limites de l'API ?",
      answer: "Plan gratuit: 100 requêtes/mois. Plan Pro: 10,000 requêtes/mois. Plan Enterprise: illimité.",
    },
    {
      question: "Comment gérer les erreurs ?",
      answer: "L'API retourne des codes HTTP standards. Consultez la section 'Gestion d'erreurs' pour plus de détails.",
    },
    {
      question: "Puis-je personnaliser les templates ?",
      answer: "Oui, avec l'API vous pouvez créer des templates personnalisés et les réutiliser.",
    },
  ]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">Tout ce que vous devez savoir pour utiliser RefineryAI</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher dans la documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">Démarrage</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Getting Started */}
          <TabsContent value="getting-started" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Guide de démarrage rapide</h2>
              <p className="text-xl text-gray-600 mb-8">Créez votre première application en moins de 5 minutes</p>
            </div>

            <div className="grid gap-6">
              {quickStart.map((item) => (
                <Card key={item.step} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto flex items-center justify-between">
                      <pre className="text-sm">
                        <code>{item.code}</code>
                      </pre>
                      <Button variant="secondary" size="icon" onClick={() => handleCopyCode(item.code)}>
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Overview */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8">Fonctionnalités principales</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Zap className="w-8 h-8 text-blue-600 mb-2" />
                    <CardTitle>Upload Intelligent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Analysez automatiquement la structure de vos documents avec notre IA avancée.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Database className="w-8 h-8 text-green-600 mb-2" />
                    <CardTitle>Base de données</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Génération automatique du schéma de base de données optimisé pour vos données.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Globe className="w-8 h-8 text-purple-600 mb-2" />
                    <CardTitle>Déploiement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Déploiement automatique avec URL sécurisée et certificat SSL inclus.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* API Documentation */}
          <TabsContent value="api" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">API Reference</h2>
              <p className="text-xl text-gray-600 mb-8">
                Intégrez RefineryAI dans vos applications avec notre API REST
              </p>
            </div>

            {/* Authentication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Authentification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Toutes les requêtes API nécessitent une clé d'authentification dans le header :</p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                  <pre className="text-sm">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Endpoints */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Endpoints</h3>
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Badge
                        className={`${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-800"
                            : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg font-mono">{endpoint.endpoint}</code>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto flex items-center justify-between">
                      <pre className="text-sm">
                        <code>{endpoint.example}</code>
                      </pre>
                      <Button variant="secondary" size="icon" onClick={() => handleCopyCode(endpoint.example)}>
                        <Code className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SDKs */}
          <TabsContent value="sdks" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">SDKs Officiels</h2>
              <p className="text-xl text-gray-600 mb-8">
                Utilisez nos SDKs pour intégrer facilement RefineryAI dans votre stack
              </p>
            </div>

            <div className="grid gap-8">
              {sdks.map((sdk, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <Code className="w-5 h-5 mr-2" />
                          {sdk.language}
                        </CardTitle>
                        <CardDescription>{sdk.description}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleOpenGithub(sdk.language.toLowerCase())}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Installation</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                        <code className="text-sm">{sdk.installation}</code>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Exemple d'utilisation</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto flex items-center justify-between">
                        <pre className="text-sm">
                          <code>{sdk.example}</code>
                        </pre>
                        <Button variant="secondary" size="icon" onClick={() => handleCopyCode(sdk.example)}>
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Questions fréquentes</h2>
              <p className="text-xl text-gray-600 mb-8">
                Réponses aux questions les plus courantes sur l'API RefineryAI
              </p>
            </div>

            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Support */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Besoin d'aide ?</h3>
                  <p className="text-gray-600 mb-6">Notre équipe support est là pour vous aider avec l'intégration</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleContactSupport}>
                      Contacter le support
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" onClick={handleJoinDiscord}>
                      Rejoindre Discord
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
