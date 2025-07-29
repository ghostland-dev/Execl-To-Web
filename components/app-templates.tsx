"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Star,
  Download,
  Eye,
  BarChart3,
  ShoppingCart,
  Users,
  FileText,
  Calendar,
  Briefcase,
  Heart,
  Zap,
  Crown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AppTemplatesProps {
  onSelectTemplate: (template: any) => void
}

export function AppTemplates({ onSelectTemplate }: AppTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const { toast } = useToast()

  const templates = [
    {
      id: "dashboard-analytics",
      name: "Dashboard Analytics",
      description: "Tableau de bord complet avec graphiques et métriques en temps réel",
      category: "business",
      difficulty: "intermediate",
      rating: 4.8,
      downloads: 1250,
      tags: ["analytics", "charts", "dashboard", "metrics"],
      features: ["Graphiques interactifs", "Métriques temps réel", "Export PDF", "Filtres avancés"],
      preview: "/placeholder.svg?height=200&width=300&text=Analytics+Dashboard",
      isPremium: false,
      estimatedTime: "2-3 heures",
      techStack: ["React", "Chart.js", "Tailwind"],
    },
    {
      id: "ecommerce-store",
      name: "Boutique E-commerce",
      description: "Plateforme de vente en ligne complète avec panier et paiement",
      category: "ecommerce",
      difficulty: "advanced",
      rating: 4.9,
      downloads: 890,
      tags: ["ecommerce", "shopping", "payment", "inventory"],
      features: ["Gestion produits", "Panier d'achat", "Paiement Stripe", "Gestion commandes"],
      preview: "/placeholder.svg?height=200&width=300&text=E-commerce+Store",
      isPremium: true,
      estimatedTime: "4-6 heures",
      techStack: ["Next.js", "Stripe", "PostgreSQL"],
    },
    {
      id: "crm-system",
      name: "Système CRM",
      description: "Gestion de la relation client avec suivi des leads et opportunités",
      category: "business",
      difficulty: "advanced",
      rating: 4.7,
      downloads: 650,
      tags: ["crm", "customers", "sales", "pipeline"],
      features: ["Gestion contacts", "Pipeline ventes", "Tâches", "Rapports"],
      preview: "/placeholder.svg?height=200&width=300&text=CRM+System",
      isPremium: true,
      estimatedTime: "5-7 heures",
      techStack: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "blog-platform",
      name: "Plateforme de Blog",
      description: "Site de blog moderne avec éditeur riche et gestion des commentaires",
      category: "content",
      difficulty: "beginner",
      rating: 4.6,
      downloads: 2100,
      tags: ["blog", "content", "cms", "seo"],
      features: ["Éditeur WYSIWYG", "Commentaires", "SEO optimisé", "Catégories"],
      preview: "/placeholder.svg?height=200&width=300&text=Blog+Platform",
      isPremium: false,
      estimatedTime: "1-2 heures",
      techStack: ["Next.js", "MDX", "Tailwind"],
    },
    {
      id: "task-manager",
      name: "Gestionnaire de Tâches",
      description: "Application de gestion de projets avec tableaux Kanban",
      category: "productivity",
      difficulty: "intermediate",
      rating: 4.5,
      downloads: 1800,
      tags: ["tasks", "kanban", "productivity", "teams"],
      features: ["Tableaux Kanban", "Assignation", "Deadlines", "Notifications"],
      preview: "/placeholder.svg?height=200&width=300&text=Task+Manager",
      isPremium: false,
      estimatedTime: "3-4 heures",
      techStack: ["React", "DnD Kit", "Supabase"],
    },
    {
      id: "booking-system",
      name: "Système de Réservation",
      description: "Plateforme de réservation avec calendrier et gestion des créneaux",
      category: "business",
      difficulty: "intermediate",
      rating: 4.4,
      downloads: 720,
      tags: ["booking", "calendar", "appointments", "scheduling"],
      features: ["Calendrier interactif", "Créneaux", "Notifications", "Paiements"],
      preview: "/placeholder.svg?height=200&width=300&text=Booking+System",
      isPremium: true,
      estimatedTime: "3-5 heures",
      techStack: ["React", "FullCalendar", "Stripe"],
    },
    {
      id: "social-network",
      name: "Réseau Social",
      description: "Mini réseau social avec posts, likes et système de suivi",
      category: "social",
      difficulty: "advanced",
      rating: 4.3,
      downloads: 450,
      tags: ["social", "posts", "likes", "followers"],
      features: ["Timeline", "Posts", "Likes/Comments", "Profils utilisateurs"],
      preview: "/placeholder.svg?height=200&width=300&text=Social+Network",
      isPremium: true,
      estimatedTime: "6-8 heures",
      techStack: ["Next.js", "Socket.io", "PostgreSQL"],
    },
    {
      id: "portfolio-website",
      name: "Site Portfolio",
      description: "Portfolio professionnel moderne avec galerie et formulaire de contact",
      category: "portfolio",
      difficulty: "beginner",
      rating: 4.7,
      downloads: 3200,
      tags: ["portfolio", "showcase", "gallery", "contact"],
      features: ["Galerie projets", "CV téléchargeable", "Contact form", "Responsive"],
      preview: "/placeholder.svg?height=200&width=300&text=Portfolio+Site",
      isPremium: false,
      estimatedTime: "1-2 heures",
      techStack: ["Next.js", "Framer Motion", "Tailwind"],
    },
  ]

  const categories = [
    { id: "all", label: "Tous", icon: Zap },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
    { id: "content", label: "Contenu", icon: FileText },
    { id: "productivity", label: "Productivité", icon: BarChart3 },
    { id: "social", label: "Social", icon: Users },
    { id: "portfolio", label: "Portfolio", icon: Heart },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleSelectTemplate = (template: any) => {
    onSelectTemplate(template)
    toast({
      title: "Template sélectionné !",
      description: `${template.name} va être utilisé pour créer votre application.`,
    })
  }

  const handlePreviewTemplate = (template: any) => {
    toast({
      title: "Aperçu du template",
      description: `Ouverture de l'aperçu pour ${template.name}`,
    })
    // In a real app, this would open a preview modal or new tab
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "Débutant"
      case "intermediate":
        return "Intermédiaire"
      case "advanced":
        return "Avancé"
      default:
        return difficulty
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Templates d'Applications</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choisissez parmi notre collection de templates professionnels pour démarrer rapidement votre projet. Chaque
          template est optimisé et prêt à être personnalisé selon vos besoins.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Plus populaires</option>
            <option value="rating">Mieux notés</option>
            <option value="newest">Plus récents</option>
            <option value="name">Nom A-Z</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {sortedTemplates.length} template{sortedTemplates.length > 1 ? "s" : ""} trouvé
          {sortedTemplates.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTemplates.map((template) => (
                <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {template.isPremium && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handlePreviewTemplate(template)}
                          className="bg-white/90 hover:bg-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{template.rating}</span>
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center">
                            <Download className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 ml-1">{template.downloads}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(template.difficulty)}>
                        {getDifficultyLabel(template.difficulty)}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{template.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Fonctionnalités incluses:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                        {template.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.techStack.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Estimated Time */}
                    <div className="mb-4 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Temps estimé: {template.estimatedTime}
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleSelectTemplate(template)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={template.isPremium}
                    >
                      {template.isPremium ? (
                        <>
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade pour utiliser
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Utiliser ce template
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Aucun template trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
            <div className="text-sm text-gray-600">Templates disponibles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {templates.reduce((acc, t) => acc + t.downloads, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Téléchargements totaux</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {(templates.reduce((acc, t) => acc + t.rating, 0) / templates.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{templates.filter((t) => !t.isPremium).length}</div>
            <div className="text-sm text-gray-600">Templates gratuits</div>
          </div>
        </div>
      </div>
    </div>
  )
}
