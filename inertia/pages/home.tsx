import { Head, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
  BarElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { Brain, TrendingUp, TrendingDown, Landmark, Home as HomeIcon, Utensils, Car, HeartPulse, Palmtree, BookOpen, ShoppingBag, CreditCard, Briefcase, Gift, Dog, Box } from 'lucide-react'
import { Bar } from 'react-chartjs-2'

const CATEGORY_ICONS: Record<string, any> = {
  'home': HomeIcon,
  'utensils': Utensils,
  'car': Car,
  'heart-pulse': HeartPulse,
  'palmtree': Palmtree,
  'book-open': BookOpen,
  'trending-up': TrendingUp,
  'shopping-bag': ShoppingBag,
  'credit-card': CreditCard,
  'briefcase': Briefcase,
  'gift': Gift,
  'dog': Dog,
  'box': Box,
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
)

interface DashboardProps {
  stats: {
    balance: number
    monthlyIncome: number
    monthlyExpense: number
    healthScore: number
    lastMonthBalance: number
  }
  categories: Array<{
    id: number
    name: string
    icon: string
    color: string
    type: 'income' | 'expense'
    spent: number
    budget: number
    percentage: number
  }>
  alerts: Array<{
    message: string
    severity: 'warning' | 'danger'
  }>
  charts: {
    evolution: {
      labels: string[]
      income: number[]
      expense: number[]
    }
    distribution: Array<{
      name: string
      value: number
      color: string
    }>
    topCategories: Array<{
      name: string
      spent: number
      budget: number
      color: string
    }>
  }
}

export default function Home({ stats, categories, alerts, charts }: DashboardProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  const evolutionData = {
    labels: charts.evolution.labels,
    datasets: [
      {
        label: 'Receitas',
        data: charts.evolution.income,
        borderColor: '#00FF88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Despesas',
        data: charts.evolution.expense,
        borderColor: '#FF4444',
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const distributionData = {
    labels: charts.distribution.map(d => d.name),
    datasets: [
      {
        data: charts.distribution.map(d => d.value),
        backgroundColor: charts.distribution.map(d => d.color || '#7B2FBE'),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }

  const topCategoriesData = {
    labels: charts.topCategories.map(c => c.name),
    datasets: [
      {
        label: 'Gasto',
        data: charts.topCategories.map(c => c.spent),
        backgroundColor: charts.topCategories.map(c => c.color),
        borderRadius: 8,
      },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="dashboard-content"
    >
      <Head title="Caria IA | Console Financeiro" />

      {alerts && alerts.length > 0 && (
        <motion.div variants={itemVariants} style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {alerts.map((alert, i) => (
            <div 
              key={i} 
              style={{ 
                padding: '12px 16px', 
                borderRadius: '8px', 
                background: alert.severity === 'danger' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                borderLeft: `4px solid ${alert.severity === 'danger' ? '#EF4444' : '#F59E0B'}`,
                color: alert.severity === 'danger' ? '#FCA5A5' : '#FDE68A',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Brain size={16} />
              {alert.message}
            </div>
          ))}
        </motion.div>
      )}
      
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--green-accent)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>Receita</span>
            <TrendingUp size={16} style={{ color: 'var(--green-accent)' }} />
          </div>
          <h3 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            {formatCurrency(stats.monthlyIncome).replace('R$', '')}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Entradas de Março</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--red-accent)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>Despesa</span>
            <TrendingDown size={16} style={{ color: 'var(--red-accent)' }} />
          </div>
          <h3 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            {formatCurrency(stats.monthlyExpense).replace('R$', '')}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total gasto no mês</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--blue-accent)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>Saldo</span>
            <Landmark size={16} style={{ color: 'var(--blue-accent)' }} />
          </div>
          <h3 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
            {formatCurrency(stats.balance).replace('R$', '')}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Saldo atual em contas</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '32px', border: '1px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary)', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>IA Health</span>
            <Brain size={16} style={{ color: 'var(--primary)' }} />
          </div>
          {stats.monthlyIncome === 0 && stats.monthlyExpense === 0 ? (
            <>
              <h3 style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'var(--font-display)', marginBottom: '4px', color: 'var(--text-muted)' }}>
                Adicione dados para calcular
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Registre receitas e despesas para ver sua saúde financeira
              </p>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                {stats.healthScore}<span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '400' }}>/100</span>
              </h3>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${stats.healthScore}%` }} style={{ height: '100%', background: 'var(--primary)' }} />
              </div>
            </>
          )}
        </motion.div>
      </div>

      <motion.div variants={itemVariants} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>Análise por Categoria</h2>
        <Link href="/categories" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', fontFamily: 'var(--font-display)' }}>
          Configurar Orçamentos →
        </Link>
      </motion.div>

      <div className="categories-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
        {categories.map((cat) => {
          const IconComp = CATEGORY_ICONS[cat.icon] || Box

          return (
            <Link key={cat.id} href={`/transactions?categoryId=${cat.id}`} style={{ textDecoration: 'none' }}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
                className="glow-card"
                style={{ padding: '24px', border: '1px solid var(--border-dim)' }}
              >
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: `${cat.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                  color: cat.color
                }}>
                  <IconComp size={18} />
                </div>
                <h4 style={{ fontWeight: '700', fontSize: '15px', color: '#fff', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>{cat.name}</h4>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {cat.percentage}% do limite
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(cat.percentage, 100)}%` }}
                    style={{
                      height: '100%',
                      background: cat.type === 'income' ? 'var(--green-accent)' : (cat.percentage > 100 ? 'var(--red-accent)' : cat.color)
                    }}
                  />
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', minHeight: '320px' }}>
        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '24px', gridRow: 'span 2' }}>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Evolução Mensal</div>
          <div style={{ height: '280px' }}>
            <Line
              data={evolutionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true, position: 'top', labels: { color: '#888', font: { size: 11 } } } },
                scales: {
                  y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#666', callback: (val) => `R$ ${val}` } },
                  x: { grid: { display: false }, border: { display: false }, ticks: { color: '#666' } }
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Distribuição de Gastos</div>
          <div style={{ flex: 1, position: 'relative', minHeight: '180px' }}>
            <Doughnut
              data={distributionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right', labels: { color: '#888', boxWidth: 10, padding: 15, font: { size: 10 } } } },
                cutout: '65%'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total</div>
              <div style={{ fontSize: '16px', fontWeight: '800' }}>{formatCurrency(stats.monthlyExpense)}</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>Top 5 Categorias</div>
          <div style={{ height: '180px' }}>
            <Bar
              data={topCategoriesData}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { grid: { display: false }, border: { display: false }, ticks: { color: '#888', font: { size: 10 } } },
                  x: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: '#666', callback: (val) => `R$ ${val}` } }
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
