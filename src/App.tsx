import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AeronavesView } from './components/AeronavesView';
import { FuncionariosView } from './components/FuncionariosView';
import { PecasView } from './components/PecasView';
import { EtapasView } from './components/EtapasView';
import { TestesView } from './components/TestesView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';

export type ViewType = 'aeronaves' | 'funcionarios' | 'pecas' | 'etapas' | 'testes';
type AuthView = 'login' | 'register';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [currentView, setCurrentView] = useState<ViewType>('aeronaves');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const renderView = () => {
    switch (currentView) {
      case 'aeronaves':
        return <AeronavesView />;
      case 'funcionarios':
        return <FuncionariosView />;
      case 'pecas':
        return <PecasView />;
      case 'etapas':
        return <EtapasView />;
      case 'testes':
        return <TestesView />;
      default:
        return <AeronavesView />;
    }
  };

  // Tela de autenticação
  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <LoginView
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthView('register')}
        />
      );
    } else {
      return (
        <RegisterView
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
  }

  // Aplicação principal após login
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}
