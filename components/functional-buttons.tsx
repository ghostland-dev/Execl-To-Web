"use client"
import { useToast } from "@/hooks/use-toast"

// Composant pour gérer tous les boutons fonctionnels
export function FunctionalButtons() {
  const { toast } = useToast()

  // Handlers universels pour tous les types de boutons
  const handlers = {
    // Boutons de téléchargement
    download: (type: string, filename?: string) => {
      const link = document.createElement("a")
      link.href = `/samples/${filename || `sample-${type}.xlsx`}`
      link.download = filename || `sample-${type}.xlsx`
      link.click()

      toast({
        title: "Téléchargement démarré",
        description: `Le fichier ${filename || type} est en cours de téléchargement`,
      })
    },

    // Boutons de partage
    share: async (title: string, url: string, text?: string) => {
      if (navigator.share) {
        try {
          await navigator.share({ title, url, text })
        } catch (error) {
          // Fallback si le partage échoue
          await navigator.clipboard.writeText(url)
          toast({
            title: "Lien copié !",
            description: "Le lien a été copié dans le presse-papier",
          })
        }
      } else {
        await navigator.clipboard.writeText(url)
        toast({
          title: "Lien copié !",
          description: "Le lien a été copié dans le presse-papier",
        })
      }
    },

    // Boutons de copie
    copy: async (text: string, description?: string) => {
      try {
        await navigator.clipboard.writeText(text)
        toast({
          title: "Copié !",
          description: description || "Le texte a été copié dans le presse-papier",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de copier le texte",
          variant: "destructive",
        })
      }
    },

    // Boutons de liens externes
    openExternal: (url: string, description?: string) => {
      window.open(url, "_blank", "noopener,noreferrer")
      if (description) {
        toast({
          title: "Lien ouvert",
          description,
        })
      }
    },

    // Boutons de contact
    contact: (type: "email" | "phone" | "chat", value: string) => {
      const actions = {
        email: () => window.open(`mailto:${value}`, "_blank"),
        phone: () => window.open(`tel:${value}`, "_blank"),
        chat: () => window.open("https://chat.refineryai.com", "_blank"),
      }

      actions[type]()

      toast({
        title: "Contact ouvert",
        description: `Ouverture de ${type === "email" ? "votre client email" : type === "phone" ? "votre application téléphone" : "le chat support"}`,
      })
    },

    // Boutons d'actions sur les apps
    appAction: (action: string, appId: string, appName?: string) => {
      const actions = {
        view: () => window.open(`https://${appId}.refineryai.com`, "_blank"),
        edit: () => toast({ title: "Éditeur", description: `Ouverture de l'éditeur pour ${appName}` }),
        delete: () => toast({ title: "Suppression", description: `${appName} a été supprimé` }),
        analytics: () => toast({ title: "Analytics", description: `Ouverture des analytics pour ${appName}` }),
        settings: () => toast({ title: "Paramètres", description: `Ouverture des paramètres pour ${appName}` }),
      }

      if (actions[action as keyof typeof actions]) {
        actions[action as keyof typeof actions]()
      }
    },

    // Boutons de newsletter/abonnement
    subscribe: async (email: string, type = "newsletter") => {
      if (!email || !email.includes("@")) {
        toast({
          title: "Email invalide",
          description: "Veuillez entrer une adresse email valide",
          variant: "destructive",
        })
        return false
      }

      try {
        // Simuler l'inscription
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const subscription = {
          email,
          type,
          subscribedAt: new Date().toISOString(),
        }

        const key = `${type}_subscriptions`
        const existing = JSON.parse(localStorage.getItem(key) || "[]")
        localStorage.setItem(key, JSON.stringify([...existing, subscription]))

        toast({
          title: "Inscription réussie !",
          description: `Vous recevrez nos ${type === "newsletter" ? "actualités" : "notifications"} par email`,
        })

        return true
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de s'inscrire. Veuillez réessayer.",
          variant: "destructive",
        })
        return false
      }
    },

    // Boutons de navigation
    navigate: (section: string) => {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    },

    // Boutons de formulaire
    submitForm: async (formData: any, formType: string) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const submission = {
          ...formData,
          type: formType,
          submittedAt: new Date().toISOString(),
          id: Date.now(),
        }

        const key = `${formType}_submissions`
        const existing = JSON.parse(localStorage.getItem(key) || "[]")
        localStorage.setItem(key, JSON.stringify([...existing, submission]))

        toast({
          title: "Formulaire envoyé !",
          description: "Nous vous recontacterons rapidement",
        })

        return true
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer le formulaire. Veuillez réessayer.",
          variant: "destructive",
        })
        return false
      }
    },
  }

  return { handlers }
}

// Hook personnalisé pour utiliser les handlers
export function useFunctionalButtons() {
  const { handlers } = FunctionalButtons()
  return handlers
}
