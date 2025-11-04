import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2 } from 'lucide-react';
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

interface Aircraft {
  id: string;
  model: string;
  type: string;
  status: string;
  progress: number;
  startDate: string;
  estimatedCompletion: string;
}

export function AeronavesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([
    { id: 'A380-001', model: 'Airbus A380', type: 'Comercial', status: 'Em Produção', progress: 85, startDate: '2024-01-15', estimatedCompletion: '2025-03-20' },
    { id: 'B737-045', model: 'Boeing 737 MAX', type: 'Comercial', status: 'Testes', progress: 60, startDate: '2024-03-10', estimatedCompletion: '2025-06-15' },
    { id: 'E195-023', model: 'Embraer E195-E2', type: 'Regional', status: 'Em Produção', progress: 72, startDate: '2024-02-20', estimatedCompletion: '2025-05-10' },
    { id: 'F35-012', model: 'F-35 Lightning II', type: 'Militar', status: 'Planejamento', progress: 25, startDate: '2024-08-01', estimatedCompletion: '2026-01-30' },
    { id: 'A320-089', model: 'Airbus A320neo', type: 'Comercial', status: 'Em Produção', progress: 45, startDate: '2024-05-15', estimatedCompletion: '2025-09-20' },
  ]);

  const filteredAircrafts = aircrafts.filter(aircraft =>
    aircraft.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aircraft.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Produção':
        return 'bg-blue-100 text-blue-700';
      case 'Testes':
        return 'bg-yellow-100 text-yellow-700';
      case 'Planejamento':
        return 'bg-gray-100 text-gray-700';
      case 'Concluído':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Aeronaves</h1>
        <p className="text-gray-600">Gerenciamento de aeronaves em produção</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por ID ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Aeronave
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-gray-700">Modelo</th>
                <th className="text-left py-3 px-4 text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-gray-700">Progresso</th>
                <th className="text-left py-3 px-4 text-gray-700">Data Início</th>
                <th className="text-left py-3 px-4 text-gray-700">Previsão</th>
                <th className="text-left py-3 px-4 text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAircrafts.map((aircraft) => (
                <tr key={aircraft.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{aircraft.id}</td>
                  <td className="py-4 px-4 text-gray-900">{aircraft.model}</td>
                  <td className="py-4 px-4 text-gray-600">{aircraft.type}</td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(aircraft.status)}>
                      {aircraft.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${aircraft.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{aircraft.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{aircraft.startDate}</td>
                  <td className="py-4 px-4 text-gray-600">{aircraft.estimatedCompletion}</td>
                  <td className="py-4 px-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Aeronave</DialogTitle>
            <DialogDescription>
              Adicione uma nova aeronave ao sistema de produção
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="id">ID da Aeronave</Label>
              <Input id="id" placeholder="Ex: A380-002" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input id="model" placeholder="Ex: Airbus A380" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="militar">Militar</SelectItem>
                  <SelectItem value="carga">Carga</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input id="startDate" type="date" />
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
