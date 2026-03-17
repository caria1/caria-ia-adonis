import { Head, Link, router } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Plus, Calendar, CheckCircle, AlertCircle, Trash2, ArrowLeft } from 'lucide-react'

interface BillProps {
  bills: Array<{
    id: number
    description: string
    amount: number
    type: 'income' | 'expense'
    dueDate: string
    status: 'pending' | 'paid' | 'overdue'
    category?: {
      name: string
      icon: string
    }
  }>
}

export default function Bills({ bills }: BillProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  const handlePay = (id: number) => {
    if (confirm('Marcar esta conta como paga? Isso criará uma transação automática.')) {
      router.post(`/bills/${id}/pay`)
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Excluir esta conta?')) {
      router.delete(`/bills/${id}`)
    }
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
      <Head title="Contas a Pagar | Caria IA" />

      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="btn-icon">
            <ArrowLeft size={20} />
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Contas a Pagar</h1>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Nova Conta
        </button>
      </div>

      <div className="glow-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-dim)' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: 'var(--text-muted)' }}>Vencimento</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: 'var(--text-muted)' }}>Descrição</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', color: 'var(--text-muted)' }}>Categoria</th>
              <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', color: 'var(--text-muted)' }}>Valor</th>
              <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <motion.tr 
                key={bill.id}
                variants={itemVariants}
                style={{ borderBottom: '1px solid var(--border-dim)', transition: '0.2s' }}
                className="table-row-hover"
              >
                <td style={{ padding: '16px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    color: bill.status === 'paid' ? '#00FF88' : (bill.status === 'overdue' ? '#FF4444' : '#FBBF24'),
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {bill.status === 'paid' ? <CheckCircle size={14} /> : (bill.status === 'overdue' ? <AlertCircle size={14} /> : <Calendar size={14} />)}
                    {bill.status.toUpperCase()}
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  {new Date(bill.dueDate).toLocaleDateString('pt-BR')}
                </td>
                <td style={{ padding: '16px', fontWeight: '600', fontSize: '14px' }}>
                  {bill.description}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    background: 'rgba(255,255,255,0.05)', 
                    fontSize: '11px',
                    border: '1px solid var(--border-dim)'
                  }}>
                    {bill.category?.name || 'Sem Categoria'}
                  </span>
                </td>
                <td style={{ 
                  padding: '16px', 
                  textAlign: 'right', 
                  fontWeight: '700', 
                  color: bill.type === 'expense' ? 'var(--red-accent)' : 'var(--green-accent)' 
                }}>
                  {formatCurrency(bill.amount)}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    {bill.status !== 'paid' && (
                      <button 
                        onClick={() => handlePay(bill.id)}
                        className="btn-icon" 
                        style={{ color: 'var(--green-accent)', background: 'rgba(0,255,136,0.1)' }}
                        title="Pagar"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(bill.id)}
                      className="btn-icon" 
                      style={{ color: 'var(--red-accent)', background: 'rgba(255,68,68,0.1)' }}
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {bills.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Nenhuma conta cadastrada para este período.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
