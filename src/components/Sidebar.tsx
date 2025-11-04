import { Plane, Users, Package, GitBranch, FlaskConical } from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'aeronaves' as ViewType, label: 'Aeronaves', icon: Plane },
    { id: 'funcionarios' as ViewType, label: 'Funcionários', icon: Users },
    { id: 'pecas' as ViewType, label: 'Peças', icon: Package },
    { id: 'etapas' as ViewType, label: 'Etapas', icon: GitBranch },
    { id: 'testes' as ViewType, label: 'Testes', icon: FlaskConical },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Plane className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-gray-900">Aerocode</h1>
            <p className="text-sm text-gray-500">Sistema de Produção</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            A
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">admin@aerocode.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
