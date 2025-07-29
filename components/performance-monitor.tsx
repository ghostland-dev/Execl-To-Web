"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Zap,
  Globe,
  Server,
  Database,
} from "lucide-react"

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  status: "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  description: string
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulate real-time performance data
  useEffect(() => {
    const generateMetrics = (): PerformanceMetric[] => {
      return [
        {
          name: "CPU Usage",
          value: Math.random() * 100,
          unit: "%",
          status: Math.random() > 0.8 ? "warning" : "good",
          trend: Math.random() > 0.5 ? "up" : "down",
          description: "Utilisation processeur en temps réel",
        },
        {
          name: "Memory Usage",
          value: Math.random() * 100,
          unit: "%",
          status: Math.random() > 0.9 ? "critical" : Math.random() > 0.7 ? "warning" : "good",
          trend: Math.random() > 0.5 ? "up" : "down",
          description: "Utilisation mémoire RAM",
        },
        {
          name: "Disk Usage",
          value: Math.random() * 100,
          unit: "%",
          status: Math.random() > 0.85 ? "warning" : "good",
          trend: "up",
          description: "Espace disque utilisé",
        },
        {
          name: "Network I/O",
          value: Math.random() * 1000,
          unit: "MB/s",
          status: "good",
          trend: Math.random() > 0.5 ? "up" : "down",
          description: "Débit réseau entrant/sortant",
        },
        {
          name: "Response Time",
          value: Math.random() * 500 + 50,
          unit: "ms",
          status: Math.random() > 0.8 ? "warning" : "good",
          trend: Math.random() > 0.5 ? "up" : "down",
          description: "Temps de réponse moyen",
        },
        {
          name: "Active Users",
          value: Math.floor(Math.random() * 1000) + 100,
          unit: "",
          status: "good",
          trend: "up",
          description: "Utilisateurs actifs en temps réel",
        },
        {
          name: "Error Rate",
          value: Math.random() * 5,
          unit: "%",
          status: Math.random() > 0.9 ? "critical" : Math.random() > 0.7 ? "warning" : "good",
          trend: Math.random() > 0.5 ? "up" : "down",
          description: "Taux d'erreur des requêtes",
        },
        {
          name: "Uptime",
          value: 99.9 - Math.random() * 0.5,
          unit: "%",
          status: "good",
          trend: "stable",
          description: "Disponibilité du service",
        },
      ]
    }

    const updateMetrics = () => {
      setMetrics(generateMetrics())
      setLastUpdate(new Date())
      setIsLoading(false)
    }

    // Initial load
    updateMetrics()

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "critical":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getMetricIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "cpu usage":
        return <Cpu className="w-5 h-5" />
      case "memory usage":
        return <HardDrive className="w-5 h-5" />
      case "disk usage":
        return <Database className="w-5 h-5" />
      case "network i/o":
        return <Wifi className="w-5 h-5" />
      case "response time":
        return <Clock className="w-5 h-5" />
      case "active users":
        return <Globe className="w-5 h-5" />
      case "error rate":
        return <AlertTriangle className="w-5 h-5" />
      case "uptime":
        return <Server className="w-5 h-5" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value.toFixed(1)}${unit}`
    } else if (unit === "ms") {
      return `${Math.round(value)}${unit}`
    } else if (unit === "MB/s") {
      return `${value.toFixed(1)} ${unit}`
    } else if (unit === "") {
      return Math.round(value).toLocaleString()
    }
    return `${value.toFixed(1)} ${unit}`
  }

  const systemHealth =
    metrics.length > 0
      ? {
          good: metrics.filter((m) => m.status === "good").length,
          warning: metrics.filter((m) => m.status === "warning").length,
          critical: metrics.filter((m) => m.status === "critical").length,
        }
      : { good: 0, warning: 0, critical: 0 }

  const overallStatus = systemHealth.critical > 0 ? "critical" : systemHealth.warning > 0 ? "warning" : "good"

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des métriques...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                État du Système
              </CardTitle>
              <CardDescription>Dernière mise à jour: {lastUpdate.toLocaleTimeString()}</CardDescription>
            </div>
            <Badge className={getStatusColor(overallStatus)}>
              {getStatusIcon(overallStatus)}
              <span className="ml-1 capitalize">
                {overallStatus === "good" ? "Optimal" : overallStatus === "warning" ? "Attention" : "Critique"}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemHealth.good}</div>
              <div className="text-sm text-green-700">Services optimaux</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{systemHealth.warning}</div>
              <div className="text-sm text-yellow-700">Alertes mineures</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{systemHealth.critical}</div>
              <div className="text-sm text-red-700">Problèmes critiques</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system">Système</TabsTrigger>
          <TabsTrigger value="network">Réseau</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics
              .filter((m) => ["CPU Usage", "Memory Usage", "Disk Usage", "Uptime"].includes(m.name))
              .map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getMetricIcon(metric.name)}
                        <span className="font-medium text-sm">{metric.name}</span>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{formatValue(metric.value, metric.unit)}</span>
                        <Badge className={`${getStatusColor(metric.status)} text-xs`}>
                          {metric.status === "good" ? "OK" : metric.status === "warning" ? "!" : "!!"}
                        </Badge>
                      </div>

                      {metric.unit === "%" && (
                        <Progress
                          value={metric.value}
                          className={`h-2 ${metric.status === "critical" ? "bg-red-100" : metric.status === "warning" ? "bg-yellow-100" : "bg-green-100"}`}
                        />
                      )}

                      <p className="text-xs text-gray-600">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics
              .filter((m) => ["Network I/O", "Response Time"].includes(m.name))
              .map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getMetricIcon(metric.name)}
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">{formatValue(metric.value, metric.unit)}</span>
                        <Badge className={`${getStatusColor(metric.status)} text-xs`}>
                          {getStatusIcon(metric.status)}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="application" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics
              .filter((m) => ["Active Users", "Error Rate"].includes(m.name))
              .map((metric, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getMetricIcon(metric.name)}
                        <span className="font-medium">{metric.name}</span>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">{formatValue(metric.value, metric.unit)}</span>
                        <Badge className={`${getStatusColor(metric.status)} text-xs`}>
                          {getStatusIcon(metric.status)}
                        </Badge>
                      </div>

                      {metric.unit === "%" && (
                        <Progress
                          value={metric.value}
                          className={`h-2 ${metric.status === "critical" ? "bg-red-100" : metric.status === "warning" ? "bg-yellow-100" : "bg-green-100"}`}
                        />
                      )}

                      <p className="text-sm text-gray-600">{metric.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Performance Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Conseils d'Optimisation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Performance CPU</h4>
              <p className="text-sm text-blue-800">
                Optimisez vos algorithmes et utilisez la mise en cache pour réduire la charge processeur.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Gestion Mémoire</h4>
              <p className="text-sm text-green-800">
                Libérez les ressources inutilisées et optimisez la gestion des objets en mémoire.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Réseau</h4>
              <p className="text-sm text-purple-800">
                Utilisez la compression et la mise en cache pour améliorer les temps de réponse.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Base de Données</h4>
              <p className="text-sm text-orange-800">
                Optimisez vos requêtes et ajoutez des index pour améliorer les performances.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
