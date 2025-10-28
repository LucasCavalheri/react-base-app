import { motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  Download,
  Calendar,
  Target
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useAuth } from '@/contexts/auth-context'

// Dados fictícios para demonstração
const salesData = [
  { month: 'Jan', revenue: 4200, users: 240, orders: 89 },
  { month: 'Fev', revenue: 5100, users: 300, orders: 125 },
  { month: 'Mar', revenue: 4800, users: 280, orders: 102 },
  { month: 'Abr', revenue: 6200, users: 380, orders: 156 },
  { month: 'Mai', revenue: 7100, users: 420, orders: 189 },
  { month: 'Jun', revenue: 6800, users: 390, orders: 167 }
]

const trafficData = [
  { day: 'Seg', visits: 1200, pageviews: 2400 },
  { day: 'Ter', visits: 1900, pageviews: 3200 },
  { day: 'Qua', visits: 1600, pageviews: 2800 },
  { day: 'Qui', visits: 2100, pageviews: 3600 },
  { day: 'Sex', visits: 2400, pageviews: 4200 },
  { day: 'Sáb', visits: 1800, pageviews: 3100 },
  { day: 'Dom', visits: 1300, pageviews: 2200 }
]

const categoryData = [
  { name: 'Vendas', value: 35, color: 'var(--chart-1)' },
  { name: 'Marketing', value: 25, color: 'var(--chart-2)' },
  { name: 'Suporte', value: 20, color: 'var(--chart-3)' },
  { name: 'Desenvolvimento', value: 20, color: 'var(--chart-4)' }
]

const chartConfig = {
  revenue: {
    label: 'Receita',
    color: 'var(--chart-1)'
  },
  users: {
    label: 'Usuários',
    color: 'var(--chart-1)'
  },
  orders: {
    label: 'Pedidos',
    color: 'var(--chart-2)'
  },
  visits: {
    label: 'Visitas',
    color: 'var(--chart-1)'
  },
  pageviews: {
    label: 'Visualizações',
    color: 'var(--chart-2)'
  }
}

export function HomePage() {
  const { user } = useAuth()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container max-w-7xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Bem-vindo de volta, {user?.name}! Aqui está um resumo das suas
          métricas.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+20.1%</span>
              <span>em relação ao mês passado</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.350</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.3%</span>
              <span>novos usuários</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-linear-to-br from-chart-2/5 to-transparent pointer-events-none" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.234</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>este mês</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-linear-to-br from-chart-3/5 to-transparent pointer-events-none" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conversão
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.5%</span>
              <span>melhoria</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-linear-to-br from-chart-4/5 to-transparent pointer-events-none" />
        </Card>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>
                    Acompanhe o crescimento da receita ao longo do tempo
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  +12.3%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="h-[220px] sm:h-[260px] md:h-[300px]"
              >
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="fillRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-revenue)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-revenue)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    fillOpacity={1}
                    fill="url(#fillRevenue)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Users Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Usuários & Pedidos</CardTitle>
                  <CardDescription>
                    Comparação entre usuários ativos e pedidos realizados
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="h-[220px] sm:h-[260px] md:h-[300px]"
              >
                <BarChart data={salesData}>
                  {/* <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} /> */}
                  <Bar dataKey="users" fill="var(--color-users)" radius={4} />
                  <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Traffic Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Tráfego Semanal</CardTitle>
                  <CardDescription>
                    Visitas e visualizações de página nos últimos 7 dias
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Tempo real
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="h-[220px] sm:h-[260px] md:h-[300px]"
              >
                <LineChart data={trafficData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="var(--color-visits)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pageviews"
                    stroke="var(--color-pageviews)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>
                    Breakdown das atividades por departamento
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Metas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ChartContainer
                  config={chartConfig}
                  className="h-[220px] sm:h-[260px] md:h-[300px] w-full"
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas ações realizadas na plataforma
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Ver Histórico
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Novo usuário registrado',
                  user: 'João Silva',
                  time: '2 min atrás',
                  type: 'user'
                },
                {
                  action: 'Pedido #1234 finalizado',
                  user: 'Maria Santos',
                  time: '5 min atrás',
                  type: 'order'
                },
                {
                  action: 'Relatório mensal gerado',
                  user: 'Sistema',
                  time: '10 min atrás',
                  type: 'system'
                },
                {
                  action: 'Backup realizado com sucesso',
                  user: 'Sistema',
                  time: '1 hora atrás',
                  type: 'system'
                },
                {
                  action: 'Novo feedback recebido',
                  user: 'Carlos Lima',
                  time: '2 horas atrás',
                  type: 'feedback'
                }
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === 'user'
                        ? 'bg-chart-1'
                        : activity.type === 'order'
                        ? 'bg-chart-2'
                        : activity.type === 'system'
                        ? 'bg-chart-3'
                        : 'bg-chart-4'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
