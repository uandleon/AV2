import { useState } from 'react';
import { Plane, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './vazio/ImageWithFallback';

interface LoginViewProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export function LoginView({ onLogin, onSwitchToRegister }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
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
            <h2 className="text-gray-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-600">Entre com suas credenciais para acessar o sistema</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Lembrar-me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>

            <Button type="submit" className="w-full group">
              Entrar
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Criar conta
              </button>
            </p>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-900 mb-2">💡 Demo - Use qualquer e-mail e senha</p>
            <p className="text-xs text-blue-700">
              Este é um protótipo. Qualquer credencial válida dará acesso ao sistema.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-blue-800 p-12 items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"
            alt="Aircraft Manufacturing"
            className="rounded-2xl shadow-2xl mb-8 w-full h-64 object-cover"
          />
          
          <h2 className="text-white mb-4">Sistema Completo de Gestão Aeronáutica</h2>
          <p className="text-blue-100 mb-6">
            Gerencie toda a produção de aeronaves em um único lugar. 
            Controle aeronaves, equipes, peças, etapas e testes com eficiência.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-white">Controle Total de Produção</p>
                <p className="text-sm text-blue-100">
                  Acompanhe cada etapa do processo de fabricação
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-white">Gestão de Equipe</p>
                <p className="text-sm text-blue-100">
                  Organize funcionários e responsabilidades
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-white">Qualidade Garantida</p>
                <p className="text-sm text-blue-100">
                  Sistema completo de testes e inspeções
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
