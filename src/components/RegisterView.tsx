import { useState } from 'react';
import { Plane, Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './vazio/ImageWithFallback';

interface RegisterViewProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterView({ onRegister, onSwitchToLogin }: RegisterViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    if (!acceptTerms) {
      alert('Você precisa aceitar os termos de uso');
      return;
    }
    if (Object.values(formData).every(value => value)) {
      onRegister();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
            alt="Aircraft Production"
            className="rounded-2xl shadow-2xl mb-8 w-full h-64 object-cover"
          />
          
          <h2 className="text-white mb-4">Junte-se aos Líderes da Indústria</h2>
          <p className="text-blue-100 mb-6">
            Milhares de empresas aeronáuticas confiam no Aerocode para 
            otimizar sua produção e garantir qualidade excepcional.
          </p>

          <div className="grid grid-cols-3 gap-4 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <p className="text-white mb-1">500+</p>
              <p className="text-xs text-blue-100">Aeronaves</p>
            </div>
            <div className="text-center border-x border-white/20">
              <p className="text-white mb-1">10k+</p>
              <p className="text-xs text-blue-100">Usuários</p>
            </div>
            <div className="text-center">
              <p className="text-white mb-1">98%</p>
              <p className="text-xs text-blue-100">Satisfação</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Aerocode</h1>
              <p className="text-sm text-gray-500">Sistema de Produção</p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-gray-900 mb-2">Crie sua conta</h2>
            <p className="text-gray-600">Preencha os dados para começar a usar o sistema</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="company"
                  type="text"
                  placeholder="Nome da empresa"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail Corporativo</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                Eu aceito os{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700">
                  termos de uso
                </button>{' '}
                e{' '}
                <button type="button" className="text-blue-600 hover:text-blue-700">
                  política de privacidade
                </button>
              </Label>
            </div>

            <Button type="submit" className="w-full group">
              Criar conta
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Fazer login
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-900 mb-2">💡 Protótipo Demo</p>
            <p className="text-xs text-blue-700">
              Esta é uma demonstração. Preencha o formulário para acessar o sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
