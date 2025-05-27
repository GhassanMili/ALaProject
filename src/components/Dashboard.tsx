
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Clock, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', demandes: 45, approuvees: 32, montant: 2850000 },
    { name: 'Fév', demandes: 52, approuvees: 38, montant: 3200000 },
    { name: 'Mar', demandes: 48, approuvees: 35, montant: 2950000 },
    { name: 'Avr', demandes: 61, approuvees: 44, montant: 3800000 },
    { name: 'Mai', demandes: 55, approuvees: 42, montant: 3500000 },
    { name: 'Jun', demandes: 67, approuvees: 48, montant: 4200000 },
  ];

  const loanTypeData = [
    { name: 'Immobilier', value: 65, color: '#3B82F6' },
    { name: 'Auto', value: 25, color: '#10B981' },
    { name: 'Personnel', value: 10, color: '#F59E0B' },
  ];

  const recentRequests = [
    { id: 1, client: 'Ahmed Ben Salem', montant: 250000, type: 'Immobilier', statut: 'en_cours', date: '2024-01-15' },
    { id: 2, client: 'Fatma Trabelsi', montant: 45000, type: 'Auto', statut: 'approuve', date: '2024-01-14' },
    { id: 3, client: 'Mohamed Gharbi', montant: 15000, type: 'Personnel', statut: 'rejete', date: '2024-01-13' },
    { id: 4, client: 'Leila Mansouri', montant: 180000, type: 'Immobilier', statut: 'en_cours', date: '2024-01-12' },
    { id: 5, client: 'Karim Bouazizi', montant: 35000, type: 'Auto', statut: 'approuve', date: '2024-01-11' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approuve':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejete':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'en_cours':
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approuve':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>;
      case 'rejete':
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>;
      case 'en_cours':
        return <Badge className="bg-orange-100 text-orange-800">En cours</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord</h2>
          <p className="text-gray-600">Interface Responsable d'Agence</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button>Générer Rapport</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Demandes ce mois</p>
                <p className="text-3xl font-bold">67</p>
                <p className="text-blue-100 text-xs">+15% vs mois dernier</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Taux d'approbation</p>
                <p className="text-3xl font-bold">72%</p>
                <p className="text-green-100 text-xs">+3% vs mois dernier</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Montant moyen</p>
                <p className="text-3xl font-bold">185K</p>
                <p className="text-orange-100 text-xs">TND par demande</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Volume total</p>
                <p className="text-3xl font-bold">4.2M</p>
                <p className="text-purple-100 text-xs">TND ce mois</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Demandes</CardTitle>
            <CardDescription>Demandes et approbations par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="demandes" fill="#3B82F6" name="Demandes" />
                <Bar dataKey="approuvees" fill="#10B981" name="Approuvées" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Loan Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Type de Crédit</CardTitle>
            <CardDescription>Distribution des demandes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={loanTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {loanTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Demandes Récentes
          </CardTitle>
          <CardDescription>
            Les dernières demandes de crédit soumises
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  {getStatusIcon(request.statut)}
                  <div>
                    <p className="font-medium">{request.client}</p>
                    <p className="text-sm text-gray-600">{request.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(request.montant)}</p>
                    <p className="text-xs text-gray-500">{request.date}</p>
                  </div>
                  {getStatusBadge(request.statut)}
                  <Button variant="outline" size="sm">
                    Voir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Volume Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Volume des Crédits</CardTitle>
          <CardDescription>Montants accordés par mois (TND)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line 
                type="monotone" 
                dataKey="montant" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
