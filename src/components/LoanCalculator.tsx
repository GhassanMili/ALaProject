import { useState, useEffect } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface LoanCalculatorProps {
  onCalculate: (data: any) => void;
}

const LoanCalculator = ({ onCalculate }: LoanCalculatorProps) => {
  const [amount, setAmount] = useState([250000]);
  const [duration, setDuration] = useState([240]);
  const [rate, setRate] = useState([4.5]);
  const [loanType, setLoanType] = useState('housing');
  const [frequency, setFrequency] = useState('monthly');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateLoan = () => {
    const principal = amount[0];
    const months = duration[0];
    const monthlyRate = rate[0] / 100 / 12;
    
    if (monthlyRate === 0) {
      const payment = principal / months;
      setMonthlyPayment(payment);
      setTotalCost(principal);
      setTotalInterest(0);
    } else {
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);
      const total = payment * months;
      const interest = total - principal;
      
      setMonthlyPayment(payment);
      setTotalCost(total);
      setTotalInterest(interest);
    }

    // Generate amortization schedule
    const schedule = [];
    let remainingBalance = principal;
    const payment = monthlyPayment || (principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                                      (Math.pow(1 + monthlyRate, months) - 1));

    for (let i = 1; i <= months; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = payment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month: i,
        payment: payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });

      if (remainingBalance <= 0) break;
    }

    const loanData = {
      amount: principal,
      duration: months,
      rate: rate[0],
      loanType,
      frequency,
      monthlyPayment: payment,
      totalCost: payment * months,
      totalInterest: (payment * months) - principal,
      schedule
    };

    onCalculate(loanData);
  };

  useEffect(() => {
    calculateLoan();
  }, [amount, duration, rate, loanType, frequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getLoanTypeLabel = (type: string) => {
    const types = {
      housing: 'Crédit Immobilier',
      auto: 'Crédit Auto',
      personal: 'Crédit Personnel'
    };
    return types[type] || type;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-600">
          <Calculator className="w-5 h-5" />
          Simulateur de Crédit
        </CardTitle>
        <CardDescription>
          Calculez vos mensualités en temps réel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loan Type */}
        <div className="space-y-2">
          <Label htmlFor="loanType">Type de crédit</Label>
          <Select value={loanType} onValueChange={setLoanType}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir le type de crédit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="housing">Crédit Immobilier</SelectItem>
              <SelectItem value="auto">Crédit Auto</SelectItem>
              <SelectItem value="personal">Crédit Personnel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Montant du crédit</Label>
            <span className="text-sm font-medium text-blue-600">
              {formatCurrency(amount[0])}
            </span>
          </div>
          <Slider
            value={amount}
            onValueChange={setAmount}
            max={1000000}
            min={10000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10,000 TND</span>
            <span>1,000,000 TND</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Durée (mois)</Label>
            <span className="text-sm font-medium text-blue-600">
              {duration[0]} mois ({(duration[0] / 12).toFixed(1)} ans)
            </span>
          </div>
          <Slider
            value={duration}
            onValueChange={setDuration}
            max={360}
            min={12}
            step={12}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 an</span>
            <span>30 ans</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Taux d'intérêt (%)</Label>
            <span className="text-sm font-medium text-blue-600">
              {rate[0]}%
            </span>
          </div>
          <Slider
            value={rate}
            onValueChange={setRate}
            max={15}
            min={1}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Frequency */}
        <div className="space-y-2">
          <Label htmlFor="frequency">Fréquence de remboursement</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir la fréquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensuel</SelectItem>
              <SelectItem value="quarterly">Trimestriel</SelectItem>
              <SelectItem value="annual">Annuel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-gray-900 mb-3">Résultats de la simulation</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(monthlyPayment)}
              </div>
              <div className="text-sm text-gray-600">Mensualité</div>
            </div>
            
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalCost)}
              </div>
              <div className="text-sm text-gray-600">Coût total</div>
            </div>
          </div>

          <div className="text-center p-3 bg-white rounded-lg">
            <div className="text-xl font-bold text-orange-600">
              {formatCurrency(totalInterest)}
            </div>
            <div className="text-sm text-gray-600">Total des intérêts</div>
          </div>
        </div>

        <Button 
          onClick={calculateLoan} 
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Recalculer
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanCalculator;
