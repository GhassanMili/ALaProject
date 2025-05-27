
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    // Demo login - in real app this would connect to authentication service
    toast({
      title: "Connexion réussie !",
      description: "Bienvenue sur BIAT IT.",
    });

    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/6c36c5e0-4d13-479b-ad32-5b89f5a86265.png" 
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
        <div className="max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Espace <span className="text-blue-600">Client</span>
            </h2>
            <p className="text-lg text-gray-600">
              Connectez-vous à votre espace BIAT IT
            </p>
          </div>

          {/* Login Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <LogIn className="w-5 h-5" />
                Connexion
              </CardTitle>
              <CardDescription>
                Accédez à votre espace client sécurisé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre.email@biat.com.tn"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link to="#" className="text-blue-600 hover:underline">
                    Mot de passe oublié ?
                  </Link>
                  <Link to="#" className="text-blue-600 hover:underline">
                    Première connexion ?
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-orange-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sécurité BIAT</h4>
                  <p className="text-sm text-gray-600">
                    Vos données sont protégées par un chiffrement de niveau bancaire
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Besoin d'aide ? {' '}
              <Link to="/contact" className="text-blue-600 hover:underline">
                Contactez notre support
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
