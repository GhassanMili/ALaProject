
import { useState } from 'react';
import { Calculator, TrendingUp, Users, FileText, Phone, Mail, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoanCalculator from '@/components/LoanCalculator';
import AmortizationTable from '@/components/AmortizationTable';
import ContactForm from '@/components/ContactForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('simulator');
  const [loanData, setLoanData] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CreditPro</h1>
                <p className="text-sm text-gray-600">Plateforme de Crédit Bancaire</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Accueil
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Services
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Contact
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Connexion
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simulez votre <span className="text-blue-600">crédit</span> en temps réel
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plateforme moderne de gestion des prêts et garanties bancaires. 
            Calculez, simulez et gérez vos demandes de crédit facilement.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Simulateur
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <LoanCalculator onCalculate={setLoanData} />
              </div>
              <div>
                {loanData && <AmortizationTable loanData={loanData} />}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Interface Commerciale
                </CardTitle>
                <CardDescription>
                  Gestion des clients et des demandes de crédit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Module clients en développement</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Consultation des simulations, prise de rendez-vous, suivi des dossiers
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="bg-white/50 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Calculator className="w-5 h-5" />
                Simulation en Temps Réel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Calculez instantanément vos mensualités et visualisez votre tableau d'amortissement
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <FileText className="w-5 h-5" />
                Gestion Numérique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Traitement entièrement digital des documents et dossiers de crédit
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <TrendingUp className="w-5 h-5" />
                Suivi Avancé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Tableaux de bord et KPIs pour un suivi optimal de votre activité
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CreditPro</span>
              </div>
              <p className="text-gray-400">
                Plateforme moderne de gestion des crédits et garanties bancaires.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Crédit Immobilier</li>
                <li>Crédit Auto</li>
                <li>Crédit Personnel</li>
                <li>Garanties Bancaires</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(+216) 73 821 801</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>h.sammouda@elfaraj.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CreditPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
