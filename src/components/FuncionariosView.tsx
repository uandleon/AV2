import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

export function FuncionariosView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [employees] = useState<Employee[]>([
    { id: 'E001', name: 'João Silva', role: 'Engenheiro Aeronáutico', department: 'Engenharia', email: 'joao.silva@aero.com', phone: '(11) 98765-4321', status: 'Ativo' },
    { id: 'E002', name: 'Maria Santos', role: 'Técnica de Montagem', department: 'Produção', email: 'maria.santos@aero.com', phone: '(11) 98765-4322', status: 'Ativo' },
    { id: 'E003', name: 'Pedro Oliveira', role: 'Inspetor de Qualidade', department: 'Qualidade', email: 'pedro.oliveira@aero.com', phone: '(11) 98765-4323', status: 'Ativo' },
    { id: 'E004', name: 'Ana Costa', role: 'Gerente de Projeto', department: 'Gestão', email: 'ana.costa@aero.com', phone: '(11) 98765-4324', status: 'Ativo' },
    { id: 'E005', name: 'Carlos Ferreira', role: 'Soldador Especializado', department: 'Produção', email: 'carlos.ferreira@aero.com', phone: '(11) 98765-4325', status: 'Férias' },
    { id: 'E006', name: 'Juliana Lima', role: 'Engenheira de Testes', department: 'Testes', email: 'juliana.lima@aero.com', phone: '(11) 98765-4326', status: 'Ativo' },
    { id: 'E007', name: 'Roberto Alves', role: 'Técnico de Manutenção', department: 'Manutenção', email: 'roberto.alves@aero.com', phone: '(11) 98765-4327', status: 'Ativo' },
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-700';
      case 'Férias':
        return 'bg-yellow-100 text-yellow-700';
      case 'Afastado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Funcionários</h1>
        <p className="text-gray-600">Gerenciamento da equipe de produção</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar funcionário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Funcionário
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-600">{employee.id}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="space-y-2 mb-3">
                <p className="text-sm text-gray-700">{employee.role}</p>
                <Badge className="bg-blue-100 text-blue-700">{employee.department}</Badge>
                <Badge className={getStatusColor(employee.status)}>{employee.status}</Badge>
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  {employee.phone}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Funcionário</DialogTitle>
            <DialogDescription>
              Adicione um novo funcionário ao sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="Ex: João Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input id="role" placeholder="Ex: Engenheiro Aeronáutico" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="email@aero.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="(11) 98765-4321" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
