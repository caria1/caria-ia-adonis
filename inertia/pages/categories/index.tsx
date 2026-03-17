import { Head, useForm, router } from '@inertiajs/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, X, DollarSign, Home, Utensils, Car, HeartPulse, Palmtree, BookOpen, TrendingUp, ShoppingBag, CreditCard, Briefcase, Gift, Dog, Box } from 'lucide-react'

const CATEGORY_ICONS = {
  'home': Home,
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

interface Category {
  id: number
  name: string
  icon: string
  color: string
  type: 'expense' | 'income'
  budgetLimit: number | null
  spent: number
  percentage: number
}

interface PageProps {
  categories: Category[]
}

export default function Categories({ categories }: PageProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const { data, setData, post, put, reset, processing } = useForm({
    name: '',
    type: 'expense' as 'expense' | 'income',
    budgetLimit: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      put(`/categories/${editingCategory.id}`, {
        onSuccess: () => {
          toast.success('Configuração atualizada!')
          setShowModal(false)
          setEditingCategory(null)
          reset()
        }
      })
    } else {
      post('/categories', {
        onSuccess: () => {
          toast.success('Novo limitador criado!')
          setShowModal(false)
          reset()
        }
      })
    }
  }

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat)
    setData({
      name: cat.name,
      type: cat.type || 'expense',
      budgetLimit: cat.budgetLimit?.toString() || '',
    })
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este limitador?')) {
      router.delete(`/categories/${id}`, {
        onSuccess: () => toast.success('Removido com sucesso.')
      })
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  return (
    <div className="dashboard-content">
      <Head title="Limitadores & Metas | Caria IA" />

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            marginBottom: '8px',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-1px' 
          }}>
            Gestão de Orçamento
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Configure seus limites mensais e metas de ganhos.</p>
        </div>
        <button 
          onClick={() => { setEditingCategory(null); reset(); setShowModal(true); }}
          className="btn-auth" 
          style={{ 
            width: 'auto', 
            padding: '12px 24px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            fontSize: '14px'
          }}
        >
          <Plus size={18} /> Novo Orçamento
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {categories.map((cat) => {
          const IconComp = CATEGORY_ICONS[cat.icon as keyof typeof CATEGORY_ICONS] || Box

          return (
            <motion.div 
              key={cat.id}
              whileHover={{ scale: 1.01 }}
              className="glow-card" 
              style={{ 
                padding: '32px', 
                border: '1px solid var(--border-dim)',
                background: 'rgba(255, 255, 255, 0.01)',
                borderRadius: '24px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '14px', 
                  background: `${cat.color}20`, 
                  display: 'flex', 
                  alignItems: 'center', justifyContent: 'center',
                  color: cat.color,
                  flexShrink: 0
                }}>
                  <IconComp size={24} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px',
                      color: cat.type === 'income' ? 'var(--green-accent)' : cat.color,
                      fontFamily: 'var(--font-display)'
                    }}>
                      {cat.type === 'income' ? 'Renda' : 'Despesa'}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => handleEdit(cat)} className="btn-icon-small"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(cat.id)} className="btn-icon-small-danger"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#fff', 
                    marginBottom: '16px',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {cat.name}
                  </h3>
                  
                  <button 
                    onClick={() => handleEdit(cat)}
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid var(--border-dim)', 
                      padding: '16px', 
                      borderRadius: '16px', 
                      width: '100%', 
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: '0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                    onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border-dim)')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Meta Mensal:</span>
                        <span style={{ fontSize: '18px', color: '#fff', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                          {cat.budgetLimit ? formatCurrency(cat.budgetLimit) : 'Adicione um valor'}
                        </span>
                      </div>
                      {cat.budgetLimit && (
                        <div style={{ fontSize: '12px', color: cat.percentage > 100 ? 'var(--red-accent)' : 'var(--text-muted)', fontWeight: '600' }}>
                          Usado: {formatCurrency(cat.spent)}
                        </div>
                      )}
                    </div>
                    {cat.budgetLimit && (
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>Progresso</span>
                          <span>{cat.percentage}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(cat.percentage, 100)}%` }}
                            style={{ 
                              height: '100%', 
                              background: cat.type === 'income' ? 'var(--green-accent)' : (cat.percentage > 100 ? 'var(--red-accent)' : cat.color) 
                            }} 
                          />
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Simplified Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="auth-card" 
            style={{ maxWidth: '440px', width: '90%', padding: '40px' }}
          >
            <button onClick={() => { setShowModal(false); setEditingCategory(null); reset(); }} style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 className="auth-title" style={{ fontSize: '24px', textAlign: 'left', marginBottom: '8px' }}>
              {editingCategory ? 'Configurar' : 'Criar Novo'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>A IA usará este valor para monitorar sua conta.</p>
            
            <form onSubmit={submit} className="auth-form" style={{ marginTop: '0' }}>
              <div className="input-group">
                <label className="input-label">Nome (Ex: Aluguel, Salário...)</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  placeholder="Defina o nome aqui"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">O que deseja monitorar?</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button 
                    type="button"
                    onClick={() => setData('type', 'expense')}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: `2px solid ${data.type === 'expense' ? 'var(--red-accent)' : 'var(--bg-deep)'}`,
                      background: data.type === 'expense' ? 'rgba(255, 68, 68, 0.1)' : 'var(--bg-deep)',
                      color: data.type === 'expense' ? 'var(--red-accent)' : 'var(--text-muted)',
                      fontWeight: '700',
                      transition: '0.2s'
                    }}
                  >
                    Gastos
                  </button>
                  <button 
                    type="button"
                    onClick={() => setData('type', 'income')}
                    style={{
                      padding: '14px',
                      borderRadius: '12px',
                      border: `2px solid ${data.type === 'income' ? 'var(--green-accent)' : 'var(--bg-deep)'}`,
                      background: data.type === 'income' ? 'rgba(0, 255, 136, 0.1)' : 'var(--bg-deep)',
                      color: data.type === 'income' ? 'var(--green-accent)' : 'var(--text-muted)',
                      fontWeight: '700',
                      transition: '0.2s'
                    }}
                  >
                    Ganhos
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Valor do Objetivo (R$)</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="number" 
                    step="0.01"
                    className="auth-input" 
                    style={{ paddingLeft: '40px' }}
                    value={data.budgetLimit}
                    onChange={e => setData('budgetLimit', e.target.value)}
                    placeholder="0,00"
                    required
                  />
                  <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <DollarSign size={16} />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={processing} className="btn-auth" style={{ marginTop: '16px', borderRadius: '14px' }}>
                {processing ? 'Gravando...' : 'Confirmar Objetivo'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
