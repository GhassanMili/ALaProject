
import { ArrowLeft, CreditCard, Home, Car, User, Shield, Calculator, TrendingUp, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Services = () => {
  const creditServices = [
    {
      icon: Home,
      title: 'Crédit Immobilier',
      description: 'Financez votre projet immobilier avec des taux compétitifs',
      features: ['Taux à partir de 4.5%', 'Durée jusqu\'à 30 ans', 'Frais de dossier réduits'],
      color: 'blue'
    },
    {
      icon: Car,
      title: 'Crédit Auto',
      description: 'Obtenez votre véhicule neuf ou d\'occasion',
      features: ['Financement jusqu\'à 100%', 'Durée jusqu\'à 7 ans', 'Réponse rapide'],
      color: 'orange'
    },
    {
      icon: User,
      title: 'Crédit Personnel',
      description: 'Pour tous vos projets personnels',
      features: ['Montants flexibles', 'Sans justificatif d\'usage', 'Déblocage rapide'],
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Garanties Bancaires',
      description: 'Solutions de garanties pour vos activités',
      features: ['Cautions de marché', 'Garanties de bonne fin', 'Cautions douanières'],
      color: 'orange'
    }
  ];

  const digitalServices = [
    {
      icon: Calculator,
      title: 'Simulateur en Ligne',
      description: 'Calculez vos mensualités instantanément'
    },
    {
      icon: TrendingUp,
      title: 'Suivi de Dossier',
      description: 'Suivez l\'avancement de votre demande'
    },
    {
      icon: FileText,
      title: 'Documentation Digitale',
      description: 'Gérez vos documents en ligne'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e1b9c36b-ea15-4ff0-9f62-59fb10afa8ca.png" 
                alt="BIAT Logo" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">BIAT IT</h1>
                <p className="text-sm text-gray-600">Plateforme de Crédit Bancaire</p>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos <span className="text-blue-600">Services</span> Financiers
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            BIAT IT vous propose une gamme complète de solutions de financement 
            adaptées à vos besoins personnels et professionnels.
          </p>
        </div>

        {/* Credit Services */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Solutions de Crédit</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {creditServices.map((service, index) => (
              <Card key={index} className={`bg-white/80 backdrop-blur-sm border-${service.color}-100 hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 text-${service.color}-600`}>
                    <service.icon className="w-6 h-6" />
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-${service.color}-500`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-4 bg-${service.color}-600 hover:bg-${service.color}-700`}>
                    Demander un devis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Digital Services */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Services Digitaux</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {digitalServices.map((service, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 border-blue-100">
                <CardContent className="p-6 text-center">
                  <service.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
          <h3 className="text-3xl font-bold mb-4">Prêt à démarrer votre projet ?</h3>
          <p className="text-xl mb-6 opacity-90">
            Nos conseillers BIAT IT sont là pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Nous contacter
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Simuler mon crédit
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
