import { useState } from 'react';
import { Plus, Search, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
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

interface Stage {
  id: string;
  name: string;
  aircraft: string;
  status: string;
  startDate: string;
  endDate: string;
  responsible: string;
  progress: number;
}

export function EtapasView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stages] = useState<Stage[]>([
    { id: 'ET001', name: 'Montagem de Fuselagem', aircraft: 'A380-001', status: 'Concluído', startDate: '2024-01-15', endDate: '2024-03-20', responsible: 'João Silva', progress: 100 },
    { id: 'ET002', name: 'Instalação de Asas', aircraft: 'A380-001', status: 'Concluído', startDate: '2024-03-21', endDate: '2024-05-10', responsible: 'Maria Santos', progress: 100 },
    { id: 'ET003', name: 'Sistema Elétrico', aircraft: 'A380-001', status: 'Em Andamento', startDate: '2024-05-11', endDate: '2024-07-15', responsible: 'Pedro Oliveira', progress: 75 },
    { id: 'ET004', name: 'Instalação de Motores', aircraft: 'B737-045', status: 'Em Andamento', startDate: '2024-06-01', endDate: '2024-08-20', responsible: 'Ana Costa', progress: 45 },
    { id: 'ET005', name: 'Pintura e Acabamento', aircraft: 'E195-023', status: 'Em Andamento', startDate: '2024-07-10', endDate: '2024-09-05', responsible: 'Carlos Ferreira', progress: 60 },
    { id: 'ET006', name: 'Montagem de Fuselagem', aircraft: 'B737-045', status: 'Concluído', startDate: '2024-03-10', endDate: '2024-05-15', responsible: 'João Silva', progress: 100 },
    { id: 'ET007', name: 'Sistema Hidráulico', aircraft: 'E195-023', status: 'Concluído', startDate: '2024-04-20', endDate: '2024-06-10', responsible: 'Juliana Lima', progress: 100 },
    { id: 'ET008', name: 'Instalação de Aviônicos', aircraft: 'F35-012', status: 'Planejado', startDate: '2024-12-01', endDate: '2025-02-15', responsible: 'Roberto Alves', progress: 0 },
  ]);

  const filteredStages = stages.filter(stage =>
    stage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.aircraft.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Concluído':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'Em Andamento':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Planejado':
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-green-100 text-green-700';
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-700';
      case 'Planejado':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const stagesByAircraft = filteredStages.reduce((acc, stage) => {
    if (!acc[stage.aircraft]) {
      acc[stage.aircraft] = [];
    }
    acc[stage.aircraft].push(stage);
    return acc;
  }, {} as Record<string, Stage[]>);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Etapas de Produção</h1>
        <p className="text-gray-600">Acompanhamento das etapas de fabricação</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar etapa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Etapa
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-gray-600 mb-1">Etapas Concluídas</p>
            <p className="text-gray-900">
              {stages.filter(s => s.status === 'Concluído').length}
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-l-blue-500">
            <p className="text-sm text-gray-600 mb-1">Em Andamento</p>
            <p className="text-gray-900">
              {stages.filter(s => s.status === 'Em Andamento').length}
            </p>
          </Card>
          <Card className="p-4 border-l-4 border-l-gray-500">
            <p className="text-sm text-gray-600 mb-1">Planejadas</p>
            <p className="text-gray-900">
              {stages.filter(s => s.status === 'Planejado').length}
            </p>
          </Card>
        </div>
      </Card>

      <div className="space-y-6">
        {Object.entries(stagesByAircraft).map(([aircraft, aircraftStages]) => (
          <Card key={aircraft} className="p-6">
            <h2 className="text-gray-900 mb-4">Aeronave: {aircraft}</h2>
            <div className="space-y-4">
              {aircraftStages.map((stage, index) => (
                <div key={stage.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(stage.status)}
                    {index < aircraftStages.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 my-1" />
                    )}
                  </div>
                  <Card className="flex-1 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{stage.name}</p>
                        <p className="text-sm text-gray-600">ID: {stage.id}</p>
                      </div>
                      <Badge className={getStatusColor(stage.status)}>
                        {stage.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Responsável</p>
                        <p className="text-sm text-gray-700">{stage.responsible}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Data Início</p>
                        <p className="text-sm text-gray-700">{stage.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Data Fim</p>
                        <p className="text-sm text-gray-700">{stage.endDate}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-500">Progresso</p>
                        <span className="text-sm text-gray-700">{stage.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${stage.progress}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Etapa</DialogTitle>
            <DialogDescription>
              Adicione uma nova etapa ao processo de produção
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="stageName">Nome da Etapa</Label>
              <Input id="stageName" placeholder="Ex: Montagem de Fuselagem" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aircraft">Aeronave</Label>
              <Select>
                <SelectTrigger id="aircraft">
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
              <Label htmlFor="responsible">Responsável</Label>
              <Select>
                <SelectTrigger id="responsible">
                  <SelectValue placeholder="Selecione o responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                  <SelectItem value="ana">Ana Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Término</Label>
                <Input id="endDate" type="date" />
              </div>
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
