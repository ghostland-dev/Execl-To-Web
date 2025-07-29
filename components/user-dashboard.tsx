"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Settings,
  Globe,
  Trash2,
  MoreVertical,
  Calendar,
  Users,
  BarChart3,
  Crown,
  Zap,
  Edit,
  Share2,
  File,
  BarChartIcon as ChartBar,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PricingModal } from "./pricing-modal"
import { NotificationSystem } from "./notification-system"
import { AppTemplates } from "./app-templates"
import { PerformanceMonitor } from "./performance-monitor"

interface UserDashboardProps {
  user: any
  onCreateNew: () => void
  onLogout: () => void
  onNavigate: (view: string) => void
}

export function UserDashboard({ user, onCreateNew, onLogout, onNavigate }: UserDashboardProps) {
  const [apps, setApps] = useState<any[]>([])
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(user || {})
  const { toast } = useToast()
  const [editingApp, setEditingApp] = useState(null)

  useEffect(() => {
    if (user && user.id) {
      // Load user's apps from localStorage (in real app, from database)
      const savedApps = localStorage.getItem(`refineryai_apps_${user.id}`)
      if (savedApps) {
        try {
          setApps(JSON.parse(savedApps))
        } catch (error) {
          console.error("Error parsing apps data:", error)
          setApps([])
        }
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])

  const handleDeleteApp = (appId: string) => {
    if (!currentUser.id) return

    const updatedApps = apps.filter((app) => app.id !== appId)
    setApps(updatedApps)
    localStorage.setItem(`refineryai_apps_${currentUser.id}`, JSON.stringify(updatedApps))

    toast({
      title: "Application supprimée",
      description: "L'application a été supprimée avec succès.",
    })
  }

  const handleUpgrade = (plan: string) => {
    const updatedUser = { ...currentUser, plan }
    setCurrentUser(updatedUser)
    localStorage.setItem("refineryai_user", JSON.stringify(updatedUser))

    toast({
      title: "Plan mis à jour !",
      description: `Vous êtes maintenant sur le plan ${plan}`,
    })
  }

  const handleSelectTemplate = (template: any) => {
    if (!currentUser.id) return

    // Create app from template
    const newApp = {
      id: `app_${Date.now()}`,
      name: template.name,
      description: template.description,
      template: template.id,
      createdAt: new Date().toISOString(),
      status: "deployed",
      views: Math.floor(Math.random() * 100),
      users: Math.floor(Math.random() * 20),
    }

    const updatedApps = [...apps, newApp]
    setApps(updatedApps)
    localStorage.setItem(`refineryai_apps_${currentUser.id}`, JSON.stringify(updatedApps))

    toast({
      title: "Application créée !",
      description: `${template.name} a été créé avec succès`,
    })
  }

  const getPlanLimits = (plan: string) => {
    const limits = {
      free: { apps: 1, rows: 100, features: ["Support communautaire"] },
      pro: {
        apps: Number.POSITIVE_INFINITY,
        rows: Number.POSITIVE_INFINITY,
        features: ["Support prioritaire", "Workflows avancés"],
      },
      enterprise: {
        apps: Number.POSITIVE_INFINITY,
        rows: Number.POSITIVE_INFINITY,
        features: ["Support prioritaire", "Workflows avancés", "API", "SSO"],
      },
    }
    return limits[plan as keyof typeof limits] || limits.free
  }

  const planLimits = getPlanLimits(currentUser.plan || "free")
  const canCreateApp = currentUser.plan === "free" ? apps.length < planLimits.apps : true

  const handleViewApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      // Simuler l'ouverture de l'app
      window.open(`https://${appId}.refineryai.com`, "_blank")

      toast({
        title: "Application ouverte",
        description: `${app.name} s'ouvre dans un nouvel onglet`,
      })
    }
  }

  const handleEditApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      // Simuler l'édition
      toast({
        title: "Édition de l'application",
        description: `Ouverture de l'éditeur pour ${app.name}`,
      })

      // Ici on pourrait ouvrir un modal d'édition
      setEditingApp(app)
    }
  }

  const handleShareApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      const shareUrl = `https://${appId}.refineryai.com`

      if (navigator.share) {
        navigator.share({
          title: app.name,
          text: `Découvrez mon application ${app.name} créée avec RefineryAI`,
          url: shareUrl,
        })
      } else {
        // Fallback: copier dans le presse-papier
        navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Lien copié !",
          description: "Le lien de partage a été copié dans le presse-papier",
        })
      }
    }
  }

  const handleExportApp = (appId: string, format: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      // Simuler l'export
      const exportData = {
        appId,
        name: app.name,
        exportedAt: new Date().toISOString(),
        format,
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${app.name}-export.${format}`
      link.click()

      toast({
        title: "Export réussi",
        description: `${app.name} exporté en ${format.toUpperCase()}`,
      })
    }
  }

  const handleUpgradePlan = () => {
    setShowPricingModal(true)
  }

  const handleViewAnalytics = (appId: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      toast({
        title: "Analytics",
        description: `Ouverture des analytics pour ${app.name}`,
      })
      // Ici on pourrait ouvrir un modal d'analytics
    }
  }

  // Ensure user exists and has required properties
  if (!currentUser || !currentUser.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 mb-4">Impossible de charger les données utilisateur.</p>
          <Button onClick={onLogout}>Retour à l'accueil</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Bienvenue, {currentUser.name || currentUser.email || "Utilisateur"}</p>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationSystem />
              <Badge variant={currentUser.plan === "free" ? "secondary" : "default"} className="capitalize">
                {currentUser.plan === "free" && <Zap className="w-3 h-3 mr-1" />}
                {currentUser.plan === "pro" && <Crown className="w-3 h-3 mr-1" />}
                {currentUser.plan || "free"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Compte
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Paramètres</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowPricingModal(true)}>Facturation</DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="apps">Mes Applications</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Applications</p>
                      <p className="text-2xl font-bold">{apps.length}</p>
                    </div>
                    <Globe className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                      <p className="text-2xl font-bold">{apps.reduce((acc, app) => acc + (app.users || 0), 0)}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Vues ce mois</p>
                      <p className="text-2xl font-bold">{apps.reduce((acc, app) => acc + (app.views || 0), 0)}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Temps économisé</p>
                      <p className="text-2xl font-bold">{apps.length * 15}h</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Usage */}
            {currentUser.plan === "free" && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Plan Gratuit</h3>
                      <p className="text-sm text-gray-600">
                        {apps.length}/{planLimits.apps} application utilisée
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => setShowPricingModal(true)}
                    >
                      Passer au Pro
                    </Button>
                  </div>
                  <Progress value={(apps.length / planLimits.apps) * 100} className="h-2" />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="apps" className="space-y-6">
            {/* Apps Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Mes Applications</h2>
              <Button onClick={onCreateNew} disabled={!canCreateApp}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Application
              </Button>
            </div>

            {/* Apps Grid */}
            {apps.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Aucune application créée</h3>
                  <p className="text-gray-600 mb-6">
                    Commencez par transformer votre premier fichier en application web
                  </p>
                  <Button onClick={onCreateNew} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer ma première app
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <Card key={app.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewApp(app.id)}>
                              <Globe className="w-4 h-4 mr-2" />
                              Ouvrir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditApp(app.id)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Paramètres
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShareApp(app.id)}>
                              <Share2 className="w-4 h-4 mr-2" />
                              Partager
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportApp(app.id, "json")}>
                              <File className="w-4 h-4 mr-2" />
                              Exporter
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewAnalytics(app.id)}>
                              <ChartBar className="w-4 h-4 mr-2" />
                              Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteApp(app.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription>{app.description || "Application générée automatiquement"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <Badge variant="secondary" className="text-green-600">
                            {app.status || "Déployée"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Créée:</span>
                          <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Vues:</span>
                          <span>{app.views || Math.floor(Math.random() * 100)}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button
                          className="w-full bg-transparent"
                          variant="outline"
                          onClick={() => handleViewApp(app.id)}
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Voir l'application
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates">
            <AppTemplates onSelectTemplate={handleSelectTemplate} />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceMonitor />
          </TabsContent>
        </Tabs>
      </div>

      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        currentPlan={currentUser.plan || "free"}
        onUpgrade={handleUpgrade}
      />
    </div>
  )
}
