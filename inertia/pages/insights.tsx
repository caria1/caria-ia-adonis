import { Head, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft, TrendingDown, Target, Lightbulb, AlertTriangle } from 'lucide-react'

interface InsightProps {
  stats: {
    monthlyIncome: number
    monthlyExpense: number
    ratio: number
  }
  tips: Array<{
    title: string
    message: string
    type: 'critical' | 'warning' | 'info'
  }>
  topExpenses: Array<{
    name: string
    spent: number
    limit: number
  }>
}

export default function Insights({ stats, tips, topExpenses }: InsightProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
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
      <Head title="IA Advisor | Caria IA" />

      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/" className="btn-icon">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Caria IA Advisor</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Dicas inteligentes baseadas em seus dados reais</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Relação Gasto/Receita</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: stats.ratio > 90 ? 'var(--red-accent)' : 'var(--green-accent)' }}>
                {stats.ratio}%
              </div>
            </div>
            <TrendingDown size={32} color="var(--primary)" />
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginTop: '16px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(stats.ratio, 100)}%` }}
              style={{ 
                height: '100%', 
                background: stats.ratio > 90 ? 'var(--red-accent)' : 'var(--primary)' 
              }} 
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glow-card" style={{ padding: '24px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>Principais Gastos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topExpenses.slice(0, 3).map((exp) => (
              <div key={exp.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px' }}>{exp.name}</span>
                <span style={{ fontWeight: '700' }}>{formatCurrency(exp.spent)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Lightbulb size={20} color="var(--primary)" /> Dicas Recomendadas
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {tips.map((tip, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="glow-card" 
            style={{ 
              padding: '20px', 
              borderLeft: `4px solid ${tip.type === 'critical' ? 'var(--red-accent)' : (tip.type === 'warning' ? '#FBBF24' : 'var(--primary)')}`
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              {tip.type === 'critical' || tip.type === 'warning' ? (
                <AlertTriangle size={24} color={tip.type === 'critical' ? 'var(--red-accent)' : '#FBBF24'} />
              ) : (
                <Brain size={24} color="var(--primary)" />
              )}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>{tip.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>{tip.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={itemVariants}
        className="glow-card" 
        style={{ 
          marginTop: '40px', 
          padding: '32px', 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}
      >
        <Target size={48} color="var(--primary)" style={{ marginBottom: '16px', opacity: 0.8 }} />
        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Mantenha o FOCO!</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
          O Caria IA está analisando seus padrões de gastos diários. 
          Logo teremos mais previsões automáticas sobre seu saldo futuro.
        </p>
        <Link href="/transactions" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Revisar Transações
        </Link>
      </motion.div>
    </motion.div>
  )
}
