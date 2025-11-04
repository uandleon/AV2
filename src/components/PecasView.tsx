import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, AlertCircle } from 'lucide-react';
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

interface Part {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  location: string;
  supplier: string;
  status: string;
}

export function PecasView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [parts] = useState<Part[]>([
    { id: 'P001', name: 'Turbina GE90-115B', category: 'Motor', quantity: 8, minQuantity: 5, location: 'Armazém A - Setor 1', supplier: 'GE Aviation', status: 'Em Estoque' },
    { id: 'P002', name: 'Asa Esquerda A320', category: 'Estrutura', quantity: 3, minQuantity: 4, location: 'Armazém B - Setor 2', supplier: 'Airbus Parts', status: 'Estoque Baixo' },
    { id: 'P003', name: 'Sistema Hidráulico', category: 'Sistemas', quantity: 15, minQuantity: 8, location: 'Armazém A - Setor 3', supplier: 'Parker Aerospace', status: 'Em Estoque' },
    { id: 'P004', name: 'Trem de Pouso Principal', category: 'Estrutura', quantity: 6, minQuantity: 5, location: 'Armazém C - Setor 1', supplier: 'Safran Landing Systems', status: 'Em Estoque' },
    { id: 'P005', name: 'Painel de Controle', category: 'Eletrônica', quantity: 2, minQuantity: 6, location: 'Armazém D - Setor 4', supplier: 'Honeywell', status: 'Estoque Crítico' },
    { id: 'P006', name: 'Fuselagem Seção 43', category: 'Estrutura', quantity: 5, minQuantity: 3, location: 'Armazém B - Setor 1', supplier: 'Spirit AeroSystems', status: 'Em Estoque' },
    { id: 'P007', name: 'Sistema APU', category: 'Motor', quantity: 7, minQuantity: 4, location: 'Armazém A - Setor 2', supplier: 'Pratt & Whitney', status: 'Em Estoque' },
    { id: 'P008', name: 'Vidro Cockpit', category: 'Estrutura', quantity: 12, minQuantity: 8, location: 'Armazém D - Setor 2', supplier: 'PPG Aerospace', status: 'Em Estoque' },
  ]);

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Estoque':
        return 'bg-green-100 text-green-700';
      case 'Estoque Baixo':
        return 'bg-yellow-100 text-yellow-700';
      case 'Estoque Crítico':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Peças</h1>
        <p className="text-gray-600">Controle de estoque de componentes aeronáuticos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total de Peças</p>
          <p className="text-gray-900">58</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Em Estoque</p>
          <p className="text-green-600">45</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Estoque Baixo</p>
          <p className="text-yellow-600">8</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Estoque Crítico</p>
          <p className="text-red-600">5</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar peça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Peça
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-gray-700">Nome</th>
                <th className="text-left py-3 px-4 text-gray-700">Categoria</th>
                <th className="text-left py-3 px-4 text-gray-700">Quantidade</th>
                <th className="text-left py-3 px-4 text-gray-700">Localização</th>
                <th className="text-left py-3 px-4 text-gray-700">Fornecedor</th>
                <th className="text-left py-3 px-4 text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map((part) => (
                <tr key={part.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{part.id}</td>
                  <td className="py-4 px-4 text-gray-900">{part.name}</td>
                  <td className="py-4 px-4">
                    <Badge className="bg-blue-100 text-blue-700">{part.category}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{part.quantity}</span>
                      {part.quantity < part.minQuantity && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Min: {part.minQuantity}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{part.location}</td>
                  <td className="py-4 px-4 text-gray-600">{part.supplier}</td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(part.status)}>
                      {part.status}
                    </Badge>
                  </td>
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
            <DialogTitle>Nova Peça</DialogTitle>
            <DialogDescription>
              Adicione uma nova peça ao inventário
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="partName">Nome da Peça</Label>
              <Input id="partName" placeholder="Ex: Turbina GE90-115B" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motor">Motor</SelectItem>
                  <SelectItem value="estrutura">Estrutura</SelectItem>
                  <SelectItem value="sistemas">Sistemas</SelectItem>
                  <SelectItem value="eletronica">Eletrônica</SelectItem>
                  <SelectItem value="interior">Interior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minQuantity">Quantidade Mínima</Label>
                <Input id="minQuantity" type="number" placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input id="location" placeholder="Ex: Armazém A - Setor 1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Input id="supplier" placeholder="Ex: GE Aviation" />
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
