"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle, FileText, Database, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function FileUpload({
  onFileUpload,
  maxSize = 10,
  acceptedTypes = [".csv", ".xlsx", ".xls", ".json", ".xml", ".txt"],
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `Le fichier est trop volumineux. Taille maximale: ${maxSize}MB`
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `Type de fichier non supporté. Types acceptés: ${acceptedTypes.join(", ")}`
    }

    return null
  }

  const simulateUpload = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      setUploadedFile(file)
      onFileUpload(file)

      toast({
        title: "Fichier uploadé avec succès !",
        description: `${file.name} (${(file.size / 1024).toFixed(1)} KB)`,
      })
    } catch (error) {
      setError("Erreur lors de l'upload du fichier")
      toast({
        title: "Erreur d'upload",
        description: "Impossible d'uploader le fichier. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = useCallback(
    async (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        toast({
          title: "Fichier invalide",
          description: validationError,
          variant: "destructive",
        })
        return
      }

      await simulateUpload(file)
    },
    [maxSize, acceptedTypes, onFileUpload, toast],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setError(null)
    setUploadProgress(0)
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "csv":
        return <Database className="w-8 h-8 text-green-600" />
      case "xlsx":
      case "xls":
        return <FileText className="w-8 h-8 text-blue-600" />
      case "json":
        return <Code className="w-8 h-8 text-purple-600" />
      default:
        return <File className="w-8 h-8 text-gray-600" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (uploadedFile && !isUploading) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">{getFileIcon(uploadedFile.name)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900 truncate">{uploadedFile.name}</h4>
              </div>
              <p className="text-sm text-green-700">{formatFileSize(uploadedFile.size)} • Uploadé avec succès</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="text-green-700 hover:text-red-600">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-all duration-300 ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className={`w-8 h-8 ${isDragOver ? "text-blue-600" : "text-gray-400"}`} />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isDragOver ? "Déposez votre fichier ici" : "Téléchargez votre fichier"}
              </h3>
              <p className="text-gray-600 mb-4">Glissez-déposez votre fichier ou cliquez pour sélectionner</p>

              <input
                type="file"
                accept={acceptedTypes.join(",")}
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />

              <label htmlFor="file-upload">
                <Button
                  asChild
                  variant="outline"
                  className="cursor-pointer bg-transparent"
                  disabled={isUploading}
                  size="lg"
                >
                  <span>
                    <File className="w-4 h-4 mr-2" />
                    Sélectionner un fichier
                  </span>
                </Button>
              </label>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-600">Upload en cours... {uploadProgress}%</p>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Type Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-3">
              <Database className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">CSV / Excel</h4>
                <p className="text-xs text-green-700">Données tabulaires, listes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-3">
              <Code className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-semibold text-purple-900">JSON / XML</h4>
                <p className="text-xs text-purple-700">Données structurées, APIs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Texte</h4>
                <p className="text-xs text-blue-700">Logs, configurations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Conseils pour un meilleur résultat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold mb-2">✅ Recommandé</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Fichiers avec en-têtes clairs</li>
                <li>• Données cohérentes et complètes</li>
                <li>• Format CSV ou Excel bien structuré</li>
                <li>• Taille inférieure à {maxSize}MB</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">❌ À éviter</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Fichiers corrompus ou vides</li>
                <li>• Données sensibles non chiffrées</li>
                <li>• Formats propriétaires complexes</li>
                <li>• Fichiers trop volumineux</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Formats supportés:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {acceptedTypes.map((type) => (
            <Badge key={type} variant="outline" className="text-xs">
              {type.replace(".", "").toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
