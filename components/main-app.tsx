"use client"

import { useState, useEffect } from "react"
import { Navigation } from "./navigation"
import { PricingPage } from "./pricing-page"
import { ContactForm } from "./contact-form"
import { UserDashboard } from "./user-dashboard"
import { BlogPage } from "./blog-page"
import { AboutPage } from "./about-page"
import { DocumentationPage } from "./documentation-page"
import { StatusPage } from "./status-page"
import { DemoInteractive } from "./demo-interactive"
import { FloatingCTA } from "./floating-cta"
import { PerformanceMonitor } from "./performance-monitor"
import { NotificationSystem } from "./notification-system"
import { AuthModal } from "./auth-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedCounter } from "./animated-counter"
import { ROICalculator } from "./roi-calculator"
import { Sparkles, Zap, Shield, Rocket, Star, ArrowRight, Code, Smartphone, Globe, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MainApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("refineryai_user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("refineryai_user")
      }
    }
  }, [])

  const handlePageChange = (page: string) => {
    setIsLoading(true)
    setCurrentPage(page)

    // Simulate page load
    setTimeout(() => {
      setIsLoading(false)
    }, 300)

    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    setShowAuthModal(false)
    setCurrentPage("dashboard")

    toast({
      title: "Connexion réussie !",
      description: `Bienvenue ${userData.name || userData.email}`,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("refineryai_user")
    setUser(null)
    setCurrentPage("home")

    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    })
  }

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage("demo")
    } else {
      setShowAuthModal(true)
    }
  }

  const handleLearnMore = () => {
    const element = document.getElementById("features")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleWatchDemo = () => {
    toast({
      title: "Démo vidéo",
      description: "Ouverture de la démo interactive...",
    })

    setTimeout(() => {
      const element = document.getElementById("demo")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 500)
  }

  const handleContactSales = () => {
    toast({
      title: "Contact commercial",
      description: "Redirection vers le formulaire de contact...",
    })

    setTimeout(() => {
      setCurrentPage("contact")
    }, 1000)
  }

  const handleViewPricing = () => {
    toast({
      title: "Consultation des tarifs",
      description: "Redirection vers la page de tarification...",
    })

    setTimeout(() => {
      setCurrentPage("pricing")
    }, 1000)
  }

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Redirection ${platform}`,
      description: `Ouverture de notre page ${platform}...`,
    })
  }

  const handleNewsletterSignup = (email: string) => {
    toast({
      title: "Inscription newsletter",
      description: `Merci ${email} ! Vous recevrez nos dernières actualités.`,
    })
  }

  const handleCreateNew = () => {
    setCurrentPage("demo")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (currentPage === "dashboard" && user) {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <UserDashboard
          user={user}
          onCreateNew={handleCreateNew}
          onLogout={handleLogout}
          onNavigate={handlePageChange}
        />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "pricing") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <PricingPage />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "contact") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <ContactForm />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "blog") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <BlogPage />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "about") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <AboutPage />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "documentation") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <DocumentationPage />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "status") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <StatusPage />
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  if (currentPage === "demo") {
    return (
      <>
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />
        <div className="pt-16">
          <DemoInteractive />
        </div>
        <NotificationSystem />
        <PerformanceMonitor />
      </>
    )
  }

  // Home page content
  return (
    <>
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} user={user} onLogout={handleLogout} />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🚀 Nouvelle version disponible - Essayez maintenant !
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Transformez vos idées en applications
              <span className="block text-4xl md:text-6xl mt-2">avec l'IA</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              RefineryAI révolutionne le développement d'applications. Décrivez votre vision, notre IA génère le code
              complet en quelques minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Commencer gratuitement
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWatchDemo}
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 bg-transparent"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter end={10000} duration={2000} />+
                </div>
                <p className="text-gray-600">Applications générées</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  <AnimatedCounter end={95} duration={2000} />%
                </div>
                <p className="text-gray-600">Temps économisé</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  <AnimatedCounter end={5000} duration={2000} />+
                </div>
                <p className="text-gray-600">Développeurs satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Fonctionnalités
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Pourquoi choisir RefineryAI ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme combine intelligence artificielle avancée et simplicité d'utilisation pour révolutionner
              votre processus de développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "IA Avancée",
                description: "Algorithmes de pointe pour comprendre vos besoins et générer du code optimisé.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Zap,
                title: "Génération Rapide",
                description: "Créez des applications complètes en quelques minutes au lieu de semaines.",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Code,
                title: "Code de Qualité",
                description: "Code propre, documenté et suivant les meilleures pratiques du développement.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Smartphone,
                title: "Multi-Plateforme",
                description: "Applications web, mobile et desktop générées à partir d'une seule description.",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: Shield,
                title: "Sécurisé",
                description: "Sécurité intégrée avec chiffrement et protection des données personnelles.",
                color: "from-red-500 to-red-600",
              },
              {
                icon: Globe,
                title: "Déploiement Facile",
                description: "Déployez vos applications en un clic sur les principales plateformes cloud.",
                color: "from-indigo-500 to-indigo-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleLearnMore}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 bg-transparent"
            >
              En savoir plus
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Démo Interactive
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Testez RefineryAI maintenant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Découvrez la puissance de notre IA en générant votre première application. Aucune inscription requise pour
              l'essai.
            </p>
          </div>

          <DemoInteractive />
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Calculateur ROI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Calculez vos économies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez combien vous pourriez économiser en temps et en coûts en utilisant RefineryAI pour vos projets.
            </p>
          </div>

          <ROICalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Témoignages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment RefineryAI transforme le quotidien des développeurs et des entreprises du monde entier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Marie Dubois",
                role: "CTO, TechStart",
                avatar: "/placeholder.svg?height=60&width=60&text=MD",
                content:
                  "RefineryAI a révolutionné notre processus de développement. Nous livrons nos projets 3x plus rapidement qu'avant.",
                rating: 5,
              },
              {
                name: "Jean Martin",
                role: "Développeur Full-Stack",
                avatar: "/placeholder.svg?height=60&width=60&text=JM",
                content:
                  "Incroyable ! J'ai pu créer une application complète en 2 heures au lieu de 2 semaines. La qualité du code est exceptionnelle.",
                rating: 5,
              },
              {
                name: "Sophie Chen",
                role: "Product Manager, InnovateCorp",
                avatar: "/placeholder.svg?height=60&width=60&text=SC",
                content:
                  "L'interface est intuitive et les résultats dépassent nos attentes. Notre équipe est plus productive que jamais.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à révolutionner votre développement ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de développeurs qui font confiance à RefineryAI pour créer des applications
              exceptionnelles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Commencer maintenant
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleContactSales}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-transparent"
              >
                Contacter l'équipe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">RefineryAI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                La plateforme IA qui transforme vos idées en applications fonctionnelles. Développement rapide, code de
                qualité, résultats exceptionnels.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social) => (
                  <Button
                    key={social}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSocialClick(social)}
                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                  >
                    {social}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Liens rapides</h4>
              <div className="space-y-2">
                {[
                  { label: "Fonctionnalités", action: () => handlePageChange("home") },
                  { label: "Tarifs", action: () => handlePageChange("pricing") },
                  { label: "Documentation", action: () => handlePageChange("documentation") },
                  { label: "Blog", action: () => handlePageChange("blog") },
                  { label: "Support", action: () => handlePageChange("contact") },
                ].map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">Recevez nos dernières actualités et conseils.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const email = (e.target as HTMLInputElement).value
                      if (email) {
                        handleNewsletterSignup(email)
                        ;(e.target as HTMLInputElement).value = ""
                      }
                    }
                  }}
                />
                <Button
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).parentElement?.querySelector("input") as HTMLInputElement
                    const email = input?.value
                    if (email) {
                      handleNewsletterSignup(email)
                      input.value = ""
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 rounded-l-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 RefineryAI. Tous droits réservés.</p>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => handlePageChange("contact")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Politique de confidentialité
              </button>
              <button
                onClick={() => handlePageChange("contact")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Conditions d'utilisation
              </button>
              <button
                onClick={() => handlePageChange("status")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Statut
              </button>
            </div>
          </div>
        </div>
      </footer>

      <FloatingCTA />
      <NotificationSystem />
      <PerformanceMonitor />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuthSuccess={handleAuthSuccess} />
    </>
  )
}
