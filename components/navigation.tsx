"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  Sparkles,
  Home,
  FileText,
  DollarSign,
  Mail,
  User,
  Settings,
  LogOut,
  Crown,
  Zap,
  BookOpen,
  Activity,
  Info,
  MessageSquare,
} from "lucide-react"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  user?: any
  onLogout?: () => void
}

export function Navigation({ currentPage, onPageChange, user, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "demo", label: "Démo", icon: Sparkles },
    { id: "pricing", label: "Tarifs", icon: DollarSign },
    { id: "about", label: "À propos", icon: Info },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "documentation", label: "Documentation", icon: BookOpen },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "status", label: "Statut", icon: Activity },
  ]

  const handleNavigation = (page: string) => {
    onPageChange(page)
    setIsMobileMenuOpen(false)
  }

  const getUserInitials = (user: any) => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase()
    }
    return "U"
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "pro":
        return (
          <Badge variant="default" className="bg-blue-600 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        )
      case "enterprise":
        return (
          <Badge variant="default" className="bg-purple-600 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Enterprise
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Zap className="w-3 h-3 mr-1" />
            Gratuit
          </Badge>
        )
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleNavigation("home")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RefineryAI
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Plan Badge */}
                {getPlanBadge(user.plan || "free")}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || user.email} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="border-t my-1" />
                    <DropdownMenuItem onClick={() => handleNavigation("dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigation("pricing")}>
                      <Crown className="mr-2 h-4 w-4" />
                      <span>Abonnement</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <div className="border-t my-1" />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("demo")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Essayer gratuitement
                </Button>
                <Button
                  onClick={() => handleNavigation("pricing")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Commencer
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        RefineryAI
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* User Info */}
                  {user && (
                    <div className="py-4 border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || user.email} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            {getUserInitials(user)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          {user.name && <p className="font-medium">{user.name}</p>}
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          <div className="mt-1">{getPlanBadge(user.plan || "free")}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Items */}
                  <div className="flex-1 py-4">
                    <div className="space-y-1">
                      {user && (
                        <>
                          <button
                            onClick={() => handleNavigation("dashboard")}
                            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                              currentPage === "dashboard"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <User className="w-5 h-5" />
                            <span className="font-medium">Dashboard</span>
                          </button>
                          <div className="border-t my-2" />
                        </>
                      )}

                      {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = currentPage === item.id

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavigation(item.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                              isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t pt-4 space-y-2">
                    {user ? (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleNavigation("pricing")}
                        >
                          <Crown className="mr-2 h-4 w-4" />
                          Abonnement
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="mr-2 h-4 w-4" />
                          Paramètres
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Support
                        </Button>
                        <div className="border-t my-2" />
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={onLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleNavigation("demo")}
                        >
                          Essayer gratuitement
                        </Button>
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => handleNavigation("pricing")}
                        >
                          Commencer
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
