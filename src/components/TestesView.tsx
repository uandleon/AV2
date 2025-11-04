import { useState } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, FileText } from 'lucide-react';
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
import { Textarea } from './ui/textarea';

interface Test {
  id: string;
  name: string;
  aircraft: string;
  type: string;
  date: string;
  result: string;
  inspector: string;
  notes: string;
}

export function TestesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [tests] = useState<Test[]>([
    { id: 'T001', name: 'Teste de Motor - GE90', aircraft: 'A380-001', type: 'Motor', date: '2024-10-15', result: 'Aprovado', inspector: 'Juliana Lima', notes: 'Motor funcionando dentro dos parâmetros esperados. Teste de potência máxima aprovado.' },
    { id: 'T002', name: 'Teste Hidráulico', aircraft: 'B737-045', type: 'Sistemas', date: '2024-10-18', result: 'Aprovado', inspector: 'Pedro Oliveira', notes: 'Sistema hidráulico sem vazamentos. Pressão estável em todos os circuitos.' },
    { id: 'T003', name: 'Teste de Pressurização', aircraft: 'A380-001', type: 'Estrutura', date: '2024-10-20', result: 'Reprovado', inspector: 'Roberto Alves', notes: 'Detectada pequena perda de pressão na seção 43. Requer correção.' },
    { id: 'T004', name: 'Teste de Aviônicos', aircraft: 'E195-023', type: 'Eletrônica', date: '2024-10-22', result: 'Aprovado', inspector: 'Ana Costa', notes: 'Todos os sistemas eletrônicos operacionais. Comunicação e navegação OK.' },
    { id: 'T005', name: 'Teste de Combustível', aircraft: 'B737-045', type: 'Sistemas', date: '2024-10-25', result: 'Em Análise', inspector: 'Juliana Lima', notes: 'Teste em andamento. Resultados preliminares normais.' },
    { id: 'T006', name: 'Teste de Trem de Pouso', aircraft: 'E195-023', type: 'Estrutura', date: '2024-10-28', result: 'Aprovado', inspector: 'Carlos Ferreira', notes: 'Mecanismo de recolhimento funcionando perfeitamente. Teste de carga aprovado.' },
    { id: 'T007', name: 'Teste de Superfícies', aircraft: 'A380-001', type: 'Estrutura', date: '2024-10-30', result: 'Aprovado', inspector: 'Maria Santos', notes: 'Todos os controles de voo respondendo corretamente.' },
  ]);

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.aircraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResultColor = (result: string) => {
    switch (result) {
      case 'Aprovado':
        return 'bg-green-100 text-green-700';
      case 'Reprovado':
        return 'bg-red-100 text-red-700';
      case 'Em Análise':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const openDetails = (test: Test) => {
    setSelectedTest(test);
    setDetailsDialogOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Testes e Inspeções</h1>
        <p className="text-gray-600">Controle de qualidade e testes técnicos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Total de Testes</p>
          <p className="text-gray-900">{tests.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Aprovados</p>
          <p className="text-green-600">
            {tests.filter(t => t.result === 'Aprovado').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Reprovados</p>
          <p className="text-red-600">
            {tests.filter(t => t.result === 'Reprovado').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 mb-1">Em Análise</p>
          <p className="text-yellow-600">
            {tests.filter(t => t.result === 'Em Análise').length}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar teste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Teste
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">ID</th>
                <th className="text-left py-3 px-4 text-gray-700">Nome do Teste</th>
                <th className="text-left py-3 px-4 text-gray-700">Aeronave</th>
                <th className="text-left py-3 px-4 text-gray-700">Tipo</th>
                <th className="text-left py-3 px-4 text-gray-700">Data</th>
                <th className="text-left py-3 px-4 text-gray-700">Inspetor</th>
                <th className="text-left py-3 px-4 text-gray-700">Resultado</th>
                <th className="text-left py-3 px-4 text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{test.id}</td>
                  <td className="py-4 px-4 text-gray-900">{test.name}</td>
                  <td className="py-4 px-4 text-gray-600">{test.aircraft}</td>
                  <td className="py-4 px-4">
                    <Badge className="bg-blue-100 text-blue-700">{test.type}</Badge>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{test.date}</td>
                  <td className="py-4 px-4 text-gray-600">{test.inspector}</td>
                  <td className="py-4 px-4">
                    <Badge className={getResultColor(test.result)}>
                      {test.result}
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
                        <DropdownMenuItem onClick={() => openDetails(test)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
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
            <DialogTitle>Novo Teste</DialogTitle>
            <DialogDescription>
              Registre um novo teste ou inspeção
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="testName">Nome do Teste</Label>
              <Input id="testName" placeholder="Ex: Teste de Motor - GE90" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testAircraft">Aeronave</Label>
              <Select>
                <SelectTrigger id="testAircraft">
                  <SelectValue placeholder="Selecione a aeronave" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A380-001">A380-001</SelectItem>
                  <SelectItem value="B737-045">B737-045</SelectItem>
                  <SelectItem value="E195-023">E195-023</SelectItem>
                  <SelectItem value="F35-012">F35-012</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="testType">Tipo de Teste</Label>
              <Select>
                <SelectTrigger id="testType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motor">Motor</SelectItem>
                  <SelectItem value="sistemas">Sistemas</SelectItem>
                  <SelectItem value="estrutura">Estrutura</SelectItem>
                  <SelectItem value="eletronica">Eletrônica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspector">Inspetor</Label>
              <Select>
                <SelectTrigger id="inspector">
                  <SelectValue placeholder="Selecione o inspetor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="juliana">Juliana Lima</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                  <SelectItem value="roberto">Roberto Alves</SelectItem>
                  <SelectItem value="ana">Ana Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="testDate">Data do Teste</Label>
              <Input id="testDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea id="notes" placeholder="Detalhes do teste..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Registrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Teste</DialogTitle>
            <DialogDescription>
              Informações completas do teste realizado
            </DialogDescription>
          </DialogHeader>
          {selectedTest && (
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-gray-500">ID</Label>
                <p className="text-gray-900">{selectedTest.id}</p>
              </div>
              <div>
                <Label className="text-gray-500">Nome do Teste</Label>
                <p className="text-gray-900">{selectedTest.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Aeronave</Label>
                  <p className="text-gray-900">{selectedTest.aircraft}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Tipo</Label>
                  <Badge className="bg-blue-100 text-blue-700">{selectedTest.type}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Data</Label>
                  <p className="text-gray-900">{selectedTest.date}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Inspetor</Label>
                  <p className="text-gray-900">{selectedTest.inspector}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-500">Resultado</Label>
                <div className="mt-1">
                  <Badge className={getResultColor(selectedTest.result)}>
                    {selectedTest.result}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-gray-500">Observações</Label>
                <p className="text-gray-900 mt-1">{selectedTest.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
