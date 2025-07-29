"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, User, ArrowRight, TrendingUp, Lightbulb, Code, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const { toast } = useToast()

  const categories = [
    { value: "all", label: "Tous les articles", icon: TrendingUp },
    { value: "tutorials", label: "Tutoriels", icon: Code },
    { value: "tips", label: "Conseils", icon: Lightbulb },
    { value: "case-studies", label: "Études de cas", icon: Users },
  ]

  const articles = [
    {
      id: 1,
      title: "Comment transformer un fichier Excel en application web en 5 minutes",
      excerpt: "Guide complet pour créer votre première application avec RefineryAI, de l'upload à la mise en ligne.",
      category: "tutorials",
      author: "Marie Laurent",
      date: "2025-01-15",
      readTime: "8 min",
      image: "/placeholder.svg?height=200&width=400&text=Excel+to+Web+App",
      featured: true,
    },
    {
      id: 2,
      title: "10 erreurs à éviter lors de la digitalisation de vos processus",
      excerpt: "Les pièges les plus courants et comment les éviter pour réussir votre transformation digitale.",
      category: "tips",
      author: "Alexandre Dubois",
      date: "2025-01-12",
      readTime: "6 min",
      image: "/placeholder.svg?height=200&width=400&text=Digital+Transformation",
      featured: false,
    },
    {
      id: 3,
      title: "Étude de cas : Comment TechCorp a économisé 50k€ avec RefineryAI",
      excerpt: "Découvrez comment cette PME a automatisé sa gestion d'inventaire et multiplié sa productivité par 3.",
      category: "case-studies",
      author: "Sophie Chen",
      date: "2025-01-10",
      readTime: "12 min",
      image: "/placeholder.svg?height=200&width=400&text=Case+Study+TechCorp",
      featured: true,
    },
    {
      id: 4,
      title: "Les tendances de l'automatisation en 2025",
      excerpt: "Analyse des nouvelles technologies qui vont révolutionner le monde du travail cette année.",
      category: "tips",
      author: "Pierre Martin",
      date: "2025-01-08",
      readTime: "10 min",
      image: "/placeholder.svg?height=200&width=400&text=Automation+Trends+2025",
      featured: false,
    },
    {
      id: 5,
      title: "Créer un CRM personnalisé à partir d'un fichier CSV",
      excerpt: "Tutorial pas-à-pas pour transformer votre base de contacts en CRM professionnel.",
      category: "tutorials",
      author: "Marie Laurent",
      date: "2025-01-05",
      readTime: "15 min",
      image: "/placeholder.svg?height=200&width=400&text=CSV+to+CRM",
      featured: false,
    },
    {
      id: 6,
      title: "L'IA au service de la productivité : mythes et réalités",
      excerpt: "Démystifions l'intelligence artificielle et ses applications concrètes en entreprise.",
      category: "tips",
      author: "Alexandre Dubois",
      date: "2025-01-03",
      readTime: "7 min",
      image: "/placeholder.svg?height=200&width=400&text=AI+Productivity",
      featured: false,
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.value === category)
    return cat ? cat.icon : TrendingUp
  }

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category)
    return cat ? cat.label : "Article"
  }

  // Ajouter les handlers pour les boutons du blog
  const handleReadArticle = (articleId: number) => {
    const article = articles.find((a) => a.id === articleId)
    if (article) {
      // Simuler l'ouverture de l'article
      toast({
        title: "Article ouvert",
        description: `Lecture de "${article.title}"`,
      })

      // Ici on pourrait naviguer vers la page de l'article
      // ou ouvrir un modal avec le contenu complet
    }
  }

  const handleNewsletterSubscribe = async (email: string) => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      })
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const subscription = {
        email,
        subscribedAt: new Date().toISOString(),
        source: "blog",
      }

      const existingSubscriptions = JSON.parse(localStorage.getItem("newsletter_subscriptions") || "[]")
      localStorage.setItem("newsletter_subscriptions", JSON.stringify([...existingSubscriptions, subscription]))

      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez nos derniers articles par email",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de s'inscrire. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Blog RefineryAI</h1>
          <p className="text-xl text-gray-600">Conseils, tutoriels et actualités sur l'automatisation</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center">
                    <category.icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Articles à la une</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => {
                const CategoryIcon = getCategoryIcon(article.category)
                return (
                  <Card key={article.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="flex items-center">
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {getCategoryLabel(article.category)}
                        </Badge>
                        <Badge className="bg-orange-100 text-orange-800">À la une</Badge>
                      </div>
                      <CardTitle className="text-xl hover:text-blue-600 transition-colors">{article.title}</CardTitle>
                      <CardDescription className="text-base">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(article.date).toLocaleDateString("fr-FR")}
                          </div>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full bg-transparent"
                        variant="outline"
                        onClick={() => handleReadArticle(article.id)}
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Tous les articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article) => {
                const CategoryIcon = getCategoryIcon(article.category)
                return (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="flex items-center w-fit mb-2">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {getCategoryLabel(article.category)}
                      </Badge>
                      <CardTitle className="text-lg hover:text-blue-600 transition-colors">{article.title}</CardTitle>
                      <CardDescription>{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <Button size="sm" variant="ghost" onClick={() => handleReadArticle(article.id)}>
                          Lire
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Voir tous les articles
            </Button>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="text-xl text-gray-600 mb-8">
            Recevez nos derniers articles et conseils directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Votre email"
              className="flex-1"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={() => handleNewsletterSubscribe(newsletterEmail)}
            >
              S'abonner
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Pas de spam, désabonnement en un clic</p>
        </div>
      </div>
    </div>
  )
}
