"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "./file-upload"
import { AppGenerator } from "./app-generator"
import { AppPreview } from "./app-preview"
import { Upload, Wand2, Eye, CheckCircle, ArrowRight, FileText, Database, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DemoInteractive() {
  const [currentStep, setCurrentStep] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<any>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedApp, setGeneratedApp] = useState<any>(null)
  const { toast } = useToast()

  const steps = [
    {
      id: 0,
      title: "Upload de fichier",
      description: "Téléchargez votre fichier (CSV, Excel, JSON, etc.)",
      icon: Upload,
      color: "blue",
    },
    {
      id: 1,
      title: "Analyse IA",
      description: "Notre IA analyse votre fichier et suggère une structure",
      icon: Wand2,
      color: "purple",
    },
    {
      id: 2,
      title: "Configuration",
      description: "Personnalisez votre application selon vos besoins",
      icon: Code,
      color: "green",
    },
    {
      id: 3,
      title: "Aperçu",
      description: "Visualisez et testez votre application générée",
      icon: Eye,
      color: "orange",
    },
  ]

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsAnalyzing(true)
    setCurrentStep(1)

    toast({
      title: "Fichier uploadé !",
      description: `${file.name} est en cours d'analyse...`,
    })

    try {
      // Simulate file analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock analysis result based on file type
      const fileExtension = file.name.split(".").pop()?.toLowerCase()
      const mockAnalysis = {
        fileName: file.name,
        fileSize: file.size,
        fileType: fileExtension,
        suggestedAppType: "Dashboard Analytics",
        confidence: 92,
        detectedColumns: ["ID", "Nom", "Email", "Date", "Statut"],
        rowCount: 150,
        dataTypes: {
          ID: "number",
          Nom: "string",
          Email: "email",
          Date: "date",
          Statut: "enum",
        },
        suggestedFeatures: [
          "Tableau de données interactif",
          "Filtres et recherche",
          "Graphiques et statistiques",
          "Export PDF/Excel",
          "Gestion des utilisateurs",
        ],
      }

      // Customize based on file type
      if (fileExtension === "json") {
        mockAnalysis.suggestedAppType = "API Dashboard"
        mockAnalysis.confidence = 88
      } else if (fileExtension === "csv") {
        mockAnalysis.suggestedAppType = "Data Management App"
        mockAnalysis.confidence = 95
      } else if (fileExtension?.includes("xl")) {
        mockAnalysis.suggestedAppType = "Business Dashboard"
        mockAnalysis.confidence = 90
      }

      setAnalysisResult(mockAnalysis)
      setIsAnalyzing(false)
      setCurrentStep(2)

      toast({
        title: "Analyse terminée !",
        description: `Type suggéré: ${mockAnalysis.suggestedAppType} (${mockAnalysis.confidence}% de confiance)`,
      })
    } catch (error) {
      setIsAnalyzing(false)
      toast({
        title: "Erreur d'analyse",
        description: "Impossible d'analyser le fichier. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const handleGenerate = async (config: any) => {
    setIsGenerating(true)

    toast({
      title: "Génération démarrée !",
      description: "Création de votre application en cours...",
    })

    try {
      // Simulate app generation
      await new Promise((resolve) => setTimeout(resolve, 4000))

      const mockApp = {
        id: `app_${Date.now()}`,
        name: config.appName,
        description: config.description,
        type: config.appType,
        url: `https://${config.appName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.vercel.app`,
        features: Object.entries(config.features)
          .filter(([_, enabled]) => enabled)
          .map(([feature, _]) => {
            const featureNames: { [key: string]: string } = {
              responsive: "Design responsive",
              darkMode: "Mode sombre",
              authentication: "Authentification",
              realTime: "Temps réel",
              export: "Export de données",
              search: "Recherche avancée",
            }
            return featureNames[feature] || feature
          }),
        tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
        createdAt: new Date().toISOString(),
        status: "generated",
        code: {
          html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.appName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, ${config.primaryColor}15 0%, ${config.primaryColor}25 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .header {
            background: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: ${config.primaryColor};
        }
        
        .nav {
            display: flex;
            gap: 2rem;
        }
        
        .nav a {
            text-decoration: none;
            color: #666;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav a:hover {
            color: ${config.primaryColor};
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .hero {
            text-align: center;
            padding: 4rem 0;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, ${config.primaryColor}, #667eea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero p {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 2rem;
        }
        
        .cta-button {
            background: linear-gradient(135deg, ${config.primaryColor}, #667eea);
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            font-weight: 600;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }
        
        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, ${config.primaryColor}, #667eea);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            color: white;
        }
        
        .feature-card h3 {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: #333;
        }
        
        .feature-card p {
            color: #666;
            line-height: 1.6;
        }
        
        .data-table {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .search-box {
            padding: 0.5rem 1rem;
            border: 2px solid #e1e5e9;
            border-radius: 25px;
            outline: none;
            transition: border-color 0.3s;
        }
        
        .search-box:focus {
            border-color: ${config.primaryColor};
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e1e5e9;
        }
        
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }
        
        tr:hover {
            background: #f8f9fa;
        }
        
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .status-active {
            background: #d4edda;
            color: #155724;
        }
        
        .status-inactive {
            background: #f8d7da;
            color: #721c24;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .nav {
                display: none;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">${config.appName}</div>
        <nav class="nav">
            <a href="#dashboard">Dashboard</a>
            <a href="#data">Données</a>
            <a href="#analytics">Analytics</a>
            <a href="#settings">Paramètres</a>
        </nav>
    </header>

    <div class="container">
        <section class="hero">
            <h1>Bienvenue dans ${config.appName}</h1>
            <p>${config.description}</p>
            <button class="cta-button" onclick="showNotification('Fonctionnalité en cours de développement!')">
                Commencer l'exploration
            </button>
        </section>

        <section class="features">
            ${config.features
              .map(
                (feature: string) => `
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>${feature}</h3>
                    <p>Cette fonctionnalité vous permet de tirer le meilleur parti de vos données avec une interface intuitive.</p>
                </div>
            `,
              )
              .join("")}
        </section>

        <section class="data-table">
            <div class="table-header">
                <h2>Données récentes</h2>
                <input type="text" class="search-box" placeholder="Rechercher..." onkeyup="filterTable(this.value)">
            </div>
            
            <table id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>Jean Dupont</td>
                        <td>jean.dupont@email.com</td>
                        <td>2024-01-15</td>
                        <td><span class="status-badge status-active">Actif</span></td>
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>Marie Martin</td>
                        <td>marie.martin@email.com</td>
                        <td>2024-01-14</td>
                        <td><span class="status-badge status-active">Actif</span></td>
                    </tr>
                    <tr>
                        <td>003</td>
                        <td>Pierre Durand</td>
                        <td>pierre.durand@email.com</td>
                        <td>2024-01-13</td>
                        <td><span class="status-badge status-inactive">Inactif</span></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>

    <script>
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${config.primaryColor};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            \`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        function filterTable(searchTerm) {
            const table = document.getElementById('dataTable');
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const cells = row.getElementsByTagName('td');
                let found = false;
                
                for (let j = 0; j < cells.length; j++) {
                    if (cells[j].textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
                        found = true;
                        break;
                    }
                }
                
                row.style.display = found ? '' : 'none';
            }
        }
        
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            console.log('${config.appName} initialisé avec succès!');
            
            // Animate feature cards on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.feature-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`,
          css: `/* Styles CSS générés automatiquement pour ${config.appName} */

:root {
  --primary-color: ${config.primaryColor};
  --secondary-color: #667eea;
  --background-color: #f8f9fa;
  --text-color: #333;
  --border-color: #e1e5e9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .nav-links {
    display: none;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}`,
          javascript: `// JavaScript généré automatiquement pour ${config.appName}

class ${config.appName.replace(/\s+/g, "")}App {
    constructor() {
        this.data = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        
        this.init();
    }
    
    init() {
        console.log('Initialisation de ${config.appName}');
        this.loadData();
        this.setupEventListeners();
        this.renderUI();
    }
    
    loadData() {
        // Simulation de chargement de données
        this.data = [
            { id: 1, name: 'Jean Dupont', email: 'jean@email.com', status: 'active', date: '2024-01-15' },
            { id: 2, name: 'Marie Martin', email: 'marie@email.com', status: 'active', date: '2024-01-14' },
            { id: 3, name: 'Pierre Durand', email: 'pierre@email.com', status: 'inactive', date: '2024-01-13' },
            { id: 4, name: 'Sophie Chen', email: 'sophie@email.com', status: 'active', date: '2024-01-12' },
            { id: 5, name: 'Lucas Bernard', email: 'lucas@email.com', status: 'pending', date: '2024-01-11' }
        ];
        
        this.filteredData = [...this.data];
    }
    
    setupEventListeners() {
        // Recherche
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterData(e.target.value);
            });
        }
        
        // Pagination
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                this.currentPage = parseInt(e.target.dataset.page);
                this.renderTable();
            }
        });
        
        // Export
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }
    }
    
    filterData(searchTerm) {
        if (!searchTerm) {
            this.filteredData = [...this.data];
        } else {
            this.filteredData = this.data.filter(item => 
                Object.values(item).some(value => 
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        
        this.currentPage = 1;
        this.renderTable();
    }
    
    renderUI() {
        this.renderStats();
        this.renderTable();
        this.renderChart();
    }
    
    renderStats() {
        const statsContainer = document.getElementById('statsContainer');
        if (!statsContainer) return;
        
        const stats = {
            total: this.data.length,
            active: this.data.filter(item => item.status === 'active').length,
            inactive: this.data.filter(item => item.status === 'inactive').length,
            pending: this.data.filter(item => item.status === 'pending').length
        };
        
        statsContainer.innerHTML = \`
            <div class="stat-card">
                <h3>Total</h3>
                <p class="stat-number">\${stats.total}</p>
            </div>
            <div class="stat-card">
                <h3>Actifs</h3>
                <p class="stat-number text-green">\${stats.active}</p>
            </div>
            <div class="stat-card">
                <h3>Inactifs</h3>
                <p class="stat-number text-red">\${stats.inactive}</p>
            </div>
            <div class="stat-card">
                <h3>En attente</h3>
                <p class="stat-number text-orange">\${stats.pending}</p>
            </div>
        \`;
    }
    
    renderTable() {
        const tableContainer = document.getElementById('tableContainer');
        if (!tableContainer) return;
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        const tableHTML = \`
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    \${pageData.map(item => \`
                        <tr>
                            <td>\${item.id}</td>
                            <td>\${item.name}</td>
                            <td>\${item.email}</td>
                            <td>\${item.date}</td>
                            <td><span class="status-badge status-\${item.status}">\${item.status}</span></td>
                            <td>
                                <button onclick="app.editItem(\${item.id})" class="btn-small">Éditer</button>
                                <button onclick="app.deleteItem(\${item.id})" class="btn-small btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    \`).join('')}
                </tbody>
            </table>
        \`;
        
        tableContainer.innerHTML = tableHTML;
        this.renderPagination();
    }
    
    renderPagination() {
        const paginationContainer = document.getElementById('paginationContainer');
        if (!paginationContainer) return;
        
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        let paginationHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += \`
                <button class="page-btn \${i === this.currentPage ? 'active' : ''}" data-page="\${i}">
                    \${i}
                </button>
            \`;
        }
        
        paginationContainer.innerHTML = paginationHTML;
    }
    
    renderChart() {
        // Simulation d'un graphique simple
        const chartContainer = document.getElementById('chartContainer');
        if (!chartContainer) return;
        
        const statusCounts = {
            active: this.data.filter(item => item.status === 'active').length,
            inactive: this.data.filter(item => item.status === 'inactive').length,
            pending: this.data.filter(item => item.status === 'pending').length
        };
        
        const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
        
        chartContainer.innerHTML = \`
            <div class="chart-bar">
                <div class="bar-segment bar-active" style="width: \${(statusCounts.active / total) * 100}%"></div>
                <div class="bar-segment bar-inactive" style="width: \${(statusCounts.inactive / total) * 100}%"></div>
                <div class="bar-segment bar-pending" style="width: \${(statusCounts.pending / total) * 100}%"></div>
            </div>
            <div class="chart-legend">
                <span class="legend-item"><span class="legend-color bar-active"></span> Actifs (\${statusCounts.active})</span>
                <span class="legend-item"><span class="legend-color bar-inactive"></span> Inactifs (\${statusCounts.inactive})</span>
                <span class="legend-item"><span class="legend-color bar-pending"></span> En attente (\${statusCounts.pending})</span>
            </div>
        \`;
    }
    
    editItem(id) {
        const item = this.data.find(item => item.id === id);
        if (item) {
            const newName = prompt('Nouveau nom:', item.name);
            if (newName) {
                item.name = newName;
                this.renderTable();
                this.showNotification('Élément modifié avec succès!');
            }
        }
    }
    
    deleteItem(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément?')) {
            this.data = this.data.filter(item => item.id !== id);
            this.filteredData = this.filteredData.filter(item => item.id !== id);
            this.renderUI();
            this.showNotification('Élément supprimé avec succès!');
        }
    }
    
    exportData() {
        const csvContent = this.convertToCSV(this.filteredData);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '${config.appName.toLowerCase().replace(/\s+/g, "_")}_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        
        this.showNotification('Données exportées avec succès!');
    }
    
    convertToCSV(data) {
        if (!data.length) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? \`"\${value}"\` : value;
            });
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\\n');
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialisation de l'application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ${config.appName.replace(/\s+/g, "")}App();
});

// Fonctions utilitaires
const utils = {
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('fr-FR');
    },
    
    formatNumber(number) {
        return new Intl.NumberFormat('fr-FR').format(number);
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};`,
        },
      }

      setGeneratedApp(mockApp)
      setIsGenerating(false)
      setCurrentStep(3)

      toast({
        title: "Application générée ! 🎉",
        description: "Votre application est prête et peut être prévisualisée.",
      })
    } catch (error) {
      setIsGenerating(false)
      toast({
        title: "Erreur de génération",
        description: "Impossible de générer l'application. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setUploadedFile(null)
    setAnalysisResult(null)
    setGeneratedApp(null)
    setIsAnalyzing(false)
    setIsGenerating(false)

    toast({
      title: "Réinitialisation",
      description: "Vous pouvez maintenant commencer une nouvelle génération.",
    })
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed"
    if (stepId === currentStep) return "active"
    return "pending"
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id)
              const StepIcon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                        status === "completed"
                          ? "bg-green-100 text-green-600"
                          : status === "active"
                            ? `bg-${step.color}-100 text-${step.color}-600`
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {status === "completed" ? <CheckCircle className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                    </div>
                    <div className="text-center">
                      <h4
                        className={`font-semibold text-sm ${status === "pending" ? "text-gray-400" : "text-gray-900"}`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 max-w-24">{step.description}</p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                        step.id < currentStep ? "bg-green-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="min-h-96">
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                Téléchargez votre fichier
              </CardTitle>
              <CardDescription>
                Commencez par télécharger un fichier (CSV, Excel, JSON, etc.) pour générer votre application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload onFileUpload={handleFileUpload} />

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Fichiers supportés</h4>
                  <p className="text-sm text-gray-600">CSV, Excel, JSON, XML</p>
                </div>

                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Database className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Analyse automatique</h4>
                  <p className="text-sm text-gray-600">Structure et types détectés</p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Code className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Code généré</h4>
                  <p className="text-sm text-gray-600">Application complète prête</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 1 && (
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Wand2 className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Analyse en cours...</h3>
                  <p className="text-gray-600 mb-4">
                    Notre IA analyse votre fichier "{uploadedFile?.name}" pour déterminer la meilleure structure
                    d'application.
                  </p>
                  <div className="max-w-xs mx-auto">
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-500 mt-2">Détection des colonnes et types de données...</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && analysisResult && (
          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Analyse terminée</h3>
                    <p className="text-sm text-green-700">
                      Type suggéré: {analysisResult.suggestedAppType} • Confiance: {analysisResult.confidence}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Colonnes détectées</h4>
                    <div className="space-y-1">
                      {analysisResult.detectedColumns.map((column: string, index: number) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1">
                          {column}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Statistiques</h4>
                    <p className="text-sm text-green-700">Lignes: {analysisResult.rowCount}</p>
                    <p className="text-sm text-green-700">Taille: {(analysisResult.fileSize / 1024).toFixed(1)} KB</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Fonctionnalités suggérées</h4>
                    <div className="space-y-1">
                      {analysisResult.suggestedFeatures.slice(0, 3).map((feature: string, index: number) => (
                        <p key={index} className="text-xs text-green-700">
                          • {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AppGenerator analysisResult={analysisResult} onGenerate={handleGenerate} isProcessing={isGenerating} />
          </div>
        )}

        {currentStep === 3 && generatedApp && (
          <div className="space-y-6">
            <AppPreview app={generatedApp} onReset={handleReset} />

            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Félicitations ! 🎉</h3>
                <p className="text-gray-600 mb-6">
                  Votre application a été générée avec succès. Vous pouvez maintenant la prévisualiser, télécharger le
                  code source ou la déployer directement.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => window.open(generatedApp.url, "_blank")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir l'application
                  </Button>

                  <Button onClick={handleReset} variant="outline">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Créer une nouvelle app
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
