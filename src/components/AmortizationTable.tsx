
import { useState } from 'react';
import { FileText, Download, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AmortizationTableProps {
  loanData: {
    amount: number;
    duration: number;
    rate: number;
    loanType: string;
    monthlyPayment: number;
    totalCost: number;
    totalInterest: number;
    schedule: Array<{
      month: number;
      payment: number;
      principal: number;
      interest: number;
      balance: number;
    }>;
  };
}

const AmortizationTable = ({ loanData }: AmortizationTableProps) => {
  const [showFullTable, setShowFullTable] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (month: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + month - 1);
    return date.toLocaleDateString('fr-FR', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const displayedSchedule = showFullTable 
    ? loanData.schedule 
    : loanData.schedule.slice(0, 12);

  const groupByYear = () => {
    const years = {};
    loanData.schedule.forEach(payment => {
      const year = Math.ceil(payment.month / 12);
      if (!years[year]) {
        years[year] = {
          payments: [],
          totalPayment: 0,
          totalPrincipal: 0,
          totalInterest: 0
        };
      }
      years[year].payments.push(payment);
      years[year].totalPayment += payment.payment;
      years[year].totalPrincipal += payment.principal;
      years[year].totalInterest += payment.interest;
    });
    return years;
  };

  const yearlyData = groupByYear();

  const downloadPDF = () => {
    // Simple CSV download for now - in a real app you'd generate a proper PDF
    const csvContent = [
      ['Mois', 'Date', 'Mensualité', 'Capital', 'Intérêts', 'Solde restant'],
      ...loanData.schedule.map(row => [
        row.month,
        formatDate(row.month),
        row.payment.toFixed(2),
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.balance.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tableau-amortissement.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-green-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <FileText className="w-5 h-5" />
              Tableau d'Amortissement
            </CardTitle>
            <CardDescription>
              Détail des remboursements sur {loanData.duration} mois
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFullTable(!showFullTable)}
            >
              {showFullTable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showFullTable ? 'Résumer' : 'Tout voir'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadPDF}
            >
              <Download className="w-4 h-4 mr-1" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {formatCurrency(loanData.amount)}
            </div>
            <div className="text-xs text-gray-600">Capital emprunté</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {formatCurrency(loanData.monthlyPayment)}
            </div>
            <div className="text-xs text-gray-600">Mensualité</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">
              {formatCurrency(loanData.totalInterest)}
            </div>
            <div className="text-xs text-gray-600">Total intérêts</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {loanData.rate}%
            </div>
            <div className="text-xs text-gray-600">Taux annuel</div>
          </div>
        </div>

        {/* Yearly Summary */}
        {showFullTable && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Résumé par année</h3>
            <div className="grid gap-2">
              {Object.entries(yearlyData).map(([year, data]: [string, any]) => (
                <div key={year} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Année {year}</Badge>
                    <span className="text-sm text-gray-600">
                      {data.payments.length} paiements
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>Capital: {formatCurrency(data.totalPrincipal)}</span>
                    <span>Intérêts: {formatCurrency(data.totalInterest)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Schedule Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-center">Mois</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Mensualité</TableHead>
                <TableHead className="text-center">Capital</TableHead>
                <TableHead className="text-center">Intérêts</TableHead>
                <TableHead className="text-center">Solde restant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSchedule.map((payment, index) => (
                <TableRow 
                  key={payment.month}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                >
                  <TableCell className="text-center font-medium">
                    {payment.month}
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-600">
                    {formatDate(payment.month)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {formatCurrency(payment.payment)}
                  </TableCell>
                  <TableCell className="text-center text-blue-600">
                    {formatCurrency(payment.principal)}
                  </TableCell>
                  <TableCell className="text-center text-orange-600">
                    {formatCurrency(payment.interest)}
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {formatCurrency(payment.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!showFullTable && loanData.schedule.length > 12 && (
          <div className="text-center mt-4">
            <Button 
              variant="outline"
              onClick={() => setShowFullTable(true)}
            >
              Voir les {loanData.schedule.length - 12} autres paiements
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmortizationTable;
