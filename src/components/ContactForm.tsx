
import { useState } from 'react';
import { Phone, Mail, MessageCircle, Calendar, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ville: '',
    typeContact: '',
    sujet: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.nom || !formData.email || !formData.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    console.log('Form submitted:', formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Un conseiller vous contactera dans les plus brefs délais.",
    });

    // Reset form
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      ville: '',
      typeContact: '',
      sujet: '',
      message: ''
    });
  };

  const quickActions = [
    {
      icon: Phone,
      title: 'Appel téléphonique',
      description: 'Parlez directement avec un conseiller',
      action: () => window.open('tel:+21673821801'),
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Envoyez-nous un message',
      action: () => window.open('mailto:h.sammouda@elfaraj.com'),
      color: 'green'
    },
    {
      icon: Calendar,
      title: 'Rendez-vous',
      description: 'Planifiez une rencontre',
      action: () => toast({
        title: "Planification",
        description: "Module de rendez-vous en développement.",
      }),
      color: 'purple'
    },
    {
      icon: MessageCircle,
      title: 'Chat en ligne',
      description: 'Assistance immédiate',
      action: () => toast({
        title: "Chat",
        description: "Service de chat en cours de déploiement.",
      }),
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
      green: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Contactez nos Conseillers</h2>
        <p className="text-lg text-gray-600">
          Notre équipe d'experts est à votre disposition pour vous accompagner
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 ${getColorClasses(action.color)}`}
            onClick={action.action}
          >
            <CardContent className="p-6 text-center">
              <action.icon className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-80">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Formulaire de Contact
            </CardTitle>
            <CardDescription>
              Laissez-nous vos coordonnées, nous vous recontacterons rapidement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ville">Ville</Label>
                <Input
                  id="ville"
                  value={formData.ville}
                  onChange={(e) => handleInputChange('ville', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="typeContact">Type de contact souhaité</Label>
                <Select value={formData.typeContact} onValueChange={(value) => handleInputChange('typeContact', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir le type de contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appel">Appel téléphonique</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="rdv">Rendez-vous en agence</SelectItem>
                    <SelectItem value="visio">Visioconférence</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sujet">Sujet de votre demande</Label>
                <Select value={formData.sujet} onValueChange={(value) => handleInputChange('sujet', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir le sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simulation">Simulation de crédit</SelectItem>
                    <SelectItem value="immobilier">Crédit immobilier</SelectItem>
                    <SelectItem value="auto">Crédit auto</SelectItem>
                    <SelectItem value="personnel">Crédit personnel</SelectItem>
                    <SelectItem value="garantie">Garantie bancaire</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Décrivez votre projet ou vos besoins..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Envoyer la demande
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-blue-600">Informations de Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-600">(+216) 73 821 801</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">h.sammouda@elfaraj.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-600">Centre ville, Tunisie</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Horaires d'Ouverture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="font-medium">8h00 - 17h00</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="font-medium">8h00 - 12h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-red-500">Fermé</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-600 mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nos conseillers experts sont disponibles pour vous accompagner 
                dans votre projet de financement.
              </p>
              <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                <Calendar className="w-4 h-4 mr-2" />
                Prendre rendez-vous
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
