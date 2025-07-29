"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Lightbulb, Award, MapPin, Mail, Linkedin, Twitter } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AboutPage() {
  // Ajouter les handlers pour les boutons About
  const handleViewJobs = () => {
    window.open("https://jobs.refineryai.com", "_blank")

    toast({
      title: "Offres d'emploi",
      description: "Ouverture de notre page carrières",
    })
  }

  const handleContactTeam = () => {
    window.open("mailto:careers@refineryai.com?subject=Contact équipe RefineryAI", "_blank")

    toast({
      title: "Contact équipe",
      description: "Ouverture de votre client email",
    })
  }

  const handleSocialProfile = (platform: string, profile: string) => {
    const baseUrls = {
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
    }

    const url = baseUrls[platform as keyof typeof baseUrls] + profile
    window.open(url, "_blank")
  }

  const team = [
    {
      name: "Alexandre Dubois",
      role: "CEO & Co-fondateur",
      bio: "Ex-CTO chez TechCorp, passionné d'IA et d'automatisation. 15 ans d'expérience en développement.",
      image: "/placeholder.svg?height=200&width=200&text=Alexandre",
      linkedin: "alexandre-dubois-refineryai",
      twitter: "#",
    },
    {
      name: "Marie Laurent",
      role: "CTO & Co-fondatrice",
      bio: "Docteure en IA, ancienne chercheuse chez Google. Experte en machine learning et NLP.",
      image: "/placeholder.svg?height=200&width=200&text=Marie",
      linkedin: "marie-laurent-refineryai",
      twitter: "#",
    },
    {
      name: "Pierre Martin",
      role: "Head of Product",
      bio: "Designer UX/UI avec 10 ans d'expérience. Ancien Lead Designer chez Figma.",
      image: "/placeholder.svg?height=200&width=200&text=Pierre",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Sophie Chen",
      role: "Head of Engineering",
      bio: "Ingénieure full-stack, experte en architecture cloud et scalabilité.",
      image: "/placeholder.svg?height=200&width=200&text=Sophie",
      linkedin: "#",
      twitter: "#",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "Démocratiser la création d'applications web en rendant la technologie accessible à tous.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Repousser les limites de l'IA pour créer des solutions toujours plus intelligentes.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Favoriser la collaboration et l'efficacité au sein des équipes et organisations.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Maintenir les plus hauts standards de qualité et de sécurité dans nos produits.",
    },
  ]

  const milestones = [
    { year: "2023", event: "Fondation de RefineryAI", description: "Lancement de l'entreprise avec une vision claire" },
    { year: "2024", event: "Première version", description: "Lancement de la première version de la plateforme" },
    { year: "2024", event: "1000+ utilisateurs", description: "Franchissement du cap des 1000 utilisateurs actifs" },
    { year: "2024", event: "Levée de fonds", description: "Série A de 5M€ pour accélérer le développement" },
    { year: "2025", event: "Expansion internationale", description: "Lancement en Europe et Amérique du Nord" },
  ]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-20">
          <Badge className="mb-4 bg-blue-100 text-blue-800">À propos de nous</Badge>
          <h1 className="text-5xl font-bold mb-6">Nous révolutionnons la création d'applications</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            RefineryAI est née de la frustration de voir des équipes perdre du temps avec des processus manuels alors
            que la technologie peut les automatiser. Notre mission est de rendre la création d'applications web
            accessible à tous, sans compétences techniques.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Tout a commencé en 2023 quand Alexandre et Marie, frustrés par les processus manuels dans leurs
                entreprises respectives, ont décidé de créer une solution révolutionnaire.
              </p>
              <p>
                Après avoir observé des centaines d'entreprises perdre du temps avec des fichiers Excel complexes et des
                processus papier, ils ont imaginé un monde où l'IA pourrait transformer instantanément ces documents en
                applications web modernes.
              </p>
              <p>
                Aujourd'hui, RefineryAI aide plus de 2500 entreprises à automatiser leurs processus et à gagner en
                productivité, économisant collectivement plus de 100 000 heures par mois.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <img
              src="/placeholder.svg?height=400&width=500&text=Team+Photo"
              alt="Équipe RefineryAI"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Notre équipe à Paris</h3>
              <p className="text-gray-600">25 passionnés de technologie et d'innovation</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
            <p className="text-xl text-gray-600">Les principes qui guident notre travail au quotidien</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre parcours</h2>
            <p className="text-xl text-gray-600">Les étapes clés de notre développement</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 text-right mr-8">
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    {milestone.year}
                  </Badge>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{milestone.event}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre équipe</h2>
            <p className="text-xl text-gray-600">Les visionnaires derrière RefineryAI</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="sm" onClick={() => handleSocialProfile("linkedin", member.linkedin)}>
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez notre aventure</h2>
          <p className="text-xl text-gray-600 mb-8">
            Nous recrutons des talents passionnés pour révolutionner l'avenir du travail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={handleViewJobs}>
              Voir nos offres d'emploi
            </Button>
            <Button size="lg" variant="outline" onClick={handleContactTeam}>
              Nous contacter
            </Button>
          </div>
          <div className="flex justify-center items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Paris, France
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              careers@refineryai.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
