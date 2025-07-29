"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle, Clock, Activity, Database, Globe, Zap } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [subscriptionEmail, setSubscriptionEmail] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      name: "API RefineryAI",
      status: "operational",
      uptime: 99.98,
      responseTime: 145,
      description: "API principale pour l'analyse et génération d'applications",
      icon: Zap,
    },
    {
      name: "Interface Web",
      status: "operational",
      uptime: 99.99,
      responseTime: 89,
      description: "Interface utilisateur et dashboard",
      icon: Globe,
    },
    {
      name: "Base de données",
      status: "operational",
      uptime: 99.95,
      responseTime: 23,
      description: "Stockage des données utilisateurs et applications",
      icon: Database,
    },
    {
      name: "Service d'upload",
      status: "degraded",
      uptime: 98.5,
      responseTime: 340,
      description: "Service de téléchargement et analyse de fichiers",
      icon: Activity,
    },
  ]

  const incidents = [
    {
      id: 1,
      title: "Ralentissement du service d'upload",
      status: "investigating",
      severity: "minor",
      startTime: "2025-01-29 14:30 UTC",
      description: "Nous observons des temps de réponse plus lents pour le service d'upload de fichiers.",
      updates: [
        {
          time: "2025-01-29 15:15 UTC",
          message: "Nous avons identifié la cause et travaillons sur une solution.",
        },
        {
          time: "2025-01-29 14:45 UTC",
          message: "Investigation en cours sur les ralentissements observés.",
        },
      ],
    },
    {
      id: 2,
      title: "Maintenance programmée - Base de données",
      status: "scheduled",
      severity: "maintenance",
      startTime: "2025-01-30 02:00 UTC",
      description: "Maintenance programmée pour optimiser les performances de la base de données.",
      updates: [
        {
          time: "2025-01-28 10:00 UTC",
          message: "Maintenance programmée le 30 janvier de 02:00 à 04:00 UTC.",
        },
      ],
    },
  ]

  const metrics = [
    {
      name: "Temps de réponse API",
      value: 145,
      unit: "ms",
      trend: "stable",
      target: 200,
    },
    {
      name: "Disponibilité globale",
      value: 99.98,
      unit: "%",
      trend: "up",
      target: 99.9,
    },
    {
      name: "Requêtes/minute",
      value: 1250,
      unit: "req/min",
      trend: "up",
      target: 1000,
    },
    {
      name: "Erreurs",
      value: 0.02,
      unit: "%",
      trend: "stable",
      target: 0.1,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100"
      case "degraded":
        return "text-yellow-600 bg-yellow-100"
      case "outage":
        return "text-red-600 bg-red-100"
      case "maintenance":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4" />
      case "outage":
        return <XCircle className="w-4 h-4" />
      case "maintenance":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getIncidentSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "major":
        return "bg-orange-100 text-orange-800"
      case "minor":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallStatus = services.every((s) => s.status === "operational")
    ? "operational"
    : services.some((s) => s.status === "outage")
      ? "outage"
      : "degraded"

  const handleStatusSubscribe = async (email: string) => {
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
        type: "status_updates",
      }

      const existingSubscriptions = JSON.parse(localStorage.getItem("status_subscriptions") || "[]")
      localStorage.setItem("status_subscriptions", JSON.stringify([...existingSubscriptions, subscription]))

      setSubscriptionEmail("")

      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez les notifications de statut par email",
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
          <h1 className="text-5xl font-bold mb-4">Status RefineryAI</h1>
          <p className="text-xl text-gray-600 mb-8">Surveillance en temps réel de nos services</p>
          <div className="flex items-center justify-center space-x-4">
            <Badge className={`${getStatusColor(overallStatus)} text-lg px-4 py-2`}>
              {getStatusIcon(overallStatus)}
              <span className="ml-2">
                {overallStatus === "operational"
                  ? "Tous les systèmes opérationnels"
                  : overallStatus === "degraded"
                    ? "Performance dégradée"
                    : "Panne en cours"}
              </span>
            </Badge>
            <div className="text-sm text-gray-500">Dernière mise à jour: {currentTime.toLocaleString("fr-FR")}</div>
          </div>
        </div>

        {/* Current Incidents */}
        {incidents.filter((i) => i.status !== "resolved").length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Incidents en cours</h2>
            <div className="space-y-4">
              {incidents
                .filter((i) => i.status !== "resolved")
                .map((incident) => (
                  <Card key={incident.id} className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getIncidentSeverityColor(incident.severity)}>{incident.severity}</Badge>
                          <Badge variant="outline">
                            {incident.status === "investigating"
                              ? "Investigation"
                              : incident.status === "scheduled"
                                ? "Programmé"
                                : incident.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>Début: {incident.startTime}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{incident.description}</p>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Mises à jour:</h4>
                        {incident.updates.map((update, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4">
                            <div className="text-sm text-gray-500">{update.time}</div>
                            <div className="text-gray-700">{update.message}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Services Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">État des services</h2>
          <div className="grid gap-4">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Uptime</div>
                        <div className="font-semibold">{service.uptime}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Réponse</div>
                        <div className="font-semibold">{service.responseTime}ms</div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusIcon(service.status)}
                        <span className="ml-2 capitalize">{service.status}</span>
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Métriques de performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {metric.value}
                    {metric.unit}
                  </div>
                  <Progress value={(metric.value / metric.target) * 100} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Objectif: {metric.target}
                      {metric.unit}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        metric.trend === "up"
                          ? "text-green-600"
                          : metric.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }
                    >
                      {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Historical Uptime */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Historique de disponibilité (90 jours)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-90 gap-1 mb-4">
                {Array.from({ length: 90 }, (_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded-sm ${
                      Math.random() > 0.05 ? "bg-green-200" : Math.random() > 0.5 ? "bg-yellow-200" : "bg-red-200"
                    }`}
                    title={`Jour ${90 - i}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>90 jours</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-200 rounded mr-2" />
                    <span>Opérationnel</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-200 rounded mr-2" />
                    <span>Dégradé</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-200 rounded mr-2" />
                    <span>Panne</span>
                  </div>
                </div>
                <span>Aujourd'hui</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribe to Updates */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Restez informé</h3>
              <p className="text-gray-600 mb-6">Recevez des notifications en cas d'incident ou de maintenance</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={subscriptionEmail}
                  onChange={(e) => setSubscriptionEmail(e.target.value)}
                />
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => handleStatusSubscribe(subscriptionEmail)}
                >
                  S'abonner
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
