import { Head, useForm, Link, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Plus, Trash2, ArrowUpCircle, ArrowDownCircle, Search, Edit3, X, Calendar, DollarSign, Tag, Home, Utensils, Car, HeartPulse, Palmtree, BookOpen, TrendingUp, ShoppingBag, CreditCard, Briefcase, Gift, Dog, Box, ChevronRight, Landmark } from 'lucide-react'

const CATEGORY_ICONS: Record<string, any> = {
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

interface Transaction {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
  date: string
  categoryId: number
  bankId: number | null
  isRecurring: boolean
  category?: {
    id: number
    name: string
    icon: string
    color: string
  }
  bank?: {
    id: number
    name: string
    icon: string
    color: string
  }
}

interface PageProps {
  transactions: {
    data: Transaction[]
    meta: any
  }
  categories: Array<{
    id: number
    name: string
    icon: string
  }>
  banks: Array<{
    id: number
    name: string
    icon: string
    color: string
  }>
  filters: {
    search?: string
    categoryId?: string
  }
}

export default function Transactions({ transactions, categories, banks, filters }: PageProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [showBankPicker, setShowBankPicker] = useState(false)

  const { data, setData, post, put, reset, processing } = useForm({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    categoryId: '',
    bankId: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
  })

  // Live Search with Debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== (filters.search || '')) {
        router.get('/transactions', { search: searchTerm, categoryId: filters.categoryId }, { 
          preserveState: true,
          preserveScroll: true,
          replace: true 
        })
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  // Update form when editing
  useEffect(() => {
    if (editingTransaction) {
      setData({
        description: editingTransaction.description,
        amount: editingTransaction.amount.toString(),
        type: editingTransaction.type,
        categoryId: editingTransaction.categoryId.toString(),
        bankId: editingTransaction.bankId?.toString() || '',
        date: editingTransaction.date.split('T')[0],
        isRecurring: editingTransaction.isRecurring,
      })
      setShowModal(true)
    } else {
      reset()
    }
  }, [editingTransaction])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTransaction) {
      put(`/transactions/${editingTransaction.id}`, {
        onSuccess: () => {
          toast.success('Transação atualizada!')
          setShowModal(false)
          setEditingTransaction(null)
          reset()
        },
        onError: () => toast.error('Erro ao editar transação.')
      })
    } else {
      post('/transactions', {
        onSuccess: () => {
          toast.success('Transação registrada com sucesso!')
          setShowModal(false)
          reset()
        },
        onError: () => toast.error('Erro ao salvar. Verifique os campos.')
      })
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      router.delete(`/transactions/${id}`, {
        onSuccess: () => toast.success('Transação excluída.'),
        onError: () => toast.error('Falha ao deletar.')
      })
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  return (
    <div className="dashboard-content">
      <Head title="Transações | Caria IA" />

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            marginBottom: '8px', 
            fontFamily: 'var(--font-display)',
            letterSpacing: '-1px'
          }}>
            Minhas Transações
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Gerencie cada centavo da sua inteligência financeira.</p>
        </div>
        <button 
          onClick={() => { setEditingTransaction(null); setShowModal(true); }}
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
          <Plus size={18} /> Nova Transação
        </button>
      </div>

      <div className="glow-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-dim)', borderRadius: '24px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-dim)', display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Pesquisar por descrição..." 
              className="auth-input" 
              style={{ paddingLeft: '40px', marginTop: '0' }} 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={18} />
            </span>
          </div>
          {filters.categoryId && (
            <Link 
              href="/transactions" 
              className="nav-link" 
              style={{ background: 'rgba(123, 47, 190, 0.1)', border: '1px solid var(--primary)', padding: '0 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '13px' }}
            >
               Categoria Filtrada <X size={14} />
            </Link>
          )}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-dim)', color: 'var(--text-muted)', fontSize: '13px' }}>
              <th style={{ padding: '16px 24px' }}>Descrição</th>
              <th style={{ padding: '16px 24px' }}>Categoria</th>
              <th style={{ padding: '16px 24px' }}>Data</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>Valor</th>
              <th style={{ padding: '16px 24px' }}></th>
            </tr>
          </thead>
          <tbody>
            {(transactions?.data || []).map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--border-dim)', transition: '0.2s' }} className="table-row-hover">
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {t.type === 'income' ? 
                      <ArrowUpCircle size={20} color="var(--green-accent)" /> : 
                      <ArrowDownCircle size={20} color="var(--red-accent)" />
                    }
                    <div>
                      <span style={{ fontWeight: '600', display: 'block', fontSize: '15px', color: '#fff' }}>{t.description}</span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                        {t.bank && (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '2px 6px', borderRadius: '4px' }}>
                              <Landmark size={12} style={{ color: t.bank.color }} /> {t.bank.name}
                            </span>
                        )}
                        {t.isRecurring && (
                          <>
                            <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 'bold' }}>RECORRENTE</span>
                            {t.type === 'income' && (
                              <span style={{ fontSize: '10px', color: 'var(--green-accent)', fontWeight: 'bold', background: 'rgba(0, 255, 136, 0.1)', padding: '0 4px', borderRadius: '4px' }}>REND FIXA</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  {t.category ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '20px', width: 'fit-content', fontSize: '12px' }}>
                      <span>{t.category.name}</span>
                    </div>
                  ) : '-'}
                </td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: 'var(--text-muted)' }}>
                  {new Date(t.date).toLocaleDateString('pt-BR')}
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: '700', color: t.type === 'income' ? 'var(--green-accent)' : '#fff' }}>
                  {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => setEditingTransaction(t)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(t.id)}
                      style={{ background: 'none', border: 'none', color: 'var(--red-accent)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {(!transactions?.data || transactions.data.length === 0) && (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>Nenhuma transação encontrada.</p>
          </div>
        )}
      </div>

      {/* Modal Nova/Editar Transação (REFINED) */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="auth-card" 
            style={{ maxWidth: '600px', width: '100%', position: 'relative', padding: '40px' }}
          >
            <button onClick={() => { setShowModal(false); setEditingTransaction(null); setShowCategoryPicker(false); setShowBankPicker(false); reset(); }} style={{ position: 'absolute', right: '32px', top: '32px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
            <h2 className="auth-title" style={{ fontSize: '26px', textAlign: 'left', marginBottom: '8px' }}>
              {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Preencha os detalhes abaixo para manter sua IA atualizada.</p>
            
            <form onSubmit={submit} className="auth-form" style={{ marginTop: '0' }}>
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Tag size={14} /> {data.type === 'income' ? 'Descrição da Receita' : 'Descrição do Gasto'}
                </label>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  placeholder={data.type === 'income' ? "Ex: Salário Mensal" : "Ex: Assinatura Netflix"}
                  list="description-suggestions"
                  required
                />
                <datalist id="description-suggestions">
                  {data.type === 'income' ? (
                    <>
                      <option value="Salário" />
                      <option value="Pensão" />
                      <option value="Diária" />
                      <option value="Rendimento" />
                      <option value="Vendas" />
                      <option value="Reembolso" />
                      <option value="Outras formas de ganhos" />
                    </>
                  ) : (
                    <>
                      <option value="Mercado" />
                      <option value="Aluguel" />
                      <option value="Combustível" />
                      <option value="Restaurante" />
                      <option value="Internet" />
                      <option value="Energia Elétrica" />
                      <option value="Água" />
                      <option value="Farmácia" />
                      <option value="Academia" />
                    </>
                  )}
                  {Array.from(new Set(transactions.data.map(t => t.description))).map(desc => (
                    <option key={desc} value={desc} />
                  ))}
                </datalist>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={14} /> Valor Total (R$)
                  </label>
                  <input 
                    type="number" 
                    step="100"
                    className="auth-input" 
                    value={data.amount}
                    onChange={e => setData('amount', e.target.value)}
                    placeholder="0,00"
                    required
                  />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Tipo de Fluxo</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button 
                      type="button"
                      onClick={() => setData('type', 'expense')}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: `2px solid ${data.type === 'expense' ? 'var(--red-accent)' : 'var(--bg-card)'}`,
                        background: data.type === 'expense' ? 'rgba(235, 87, 87, 0.1)' : 'var(--bg-deep)',
                        color: data.type === 'expense' ? 'var(--red-accent)' : 'var(--text-muted)',
                        fontWeight: '600',
                        fontSize: '13px',
                        transition: '0.2s'
                      }}
                    >
                      Despesa
                    </button>
                    <button 
                      type="button"
                      onClick={() => setData('type', 'income')}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        border: `2px solid ${data.type === 'income' ? 'var(--primary)' : 'var(--bg-card)'}`,
                        background: data.type === 'income' ? 'rgba(123, 47, 190, 0.1)' : 'var(--bg-deep)',
                        color: data.type === 'income' ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: '600',
                        fontSize: '13px',
                        transition: '0.2s'
                      }}
                    >
                      Receita
                    </button>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Categoria</label>
                <button 
                  type="button"
                  onClick={() => { setShowCategoryPicker(!showCategoryPicker); setShowBankPicker(false); }}
                  className="auth-input"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {data.categoryId ? (
                      <>
                        {(() => {
                          const cat = categories.find(c => c.id.toString() === data.categoryId.toString())
                          const IconComp = cat ? CATEGORY_ICONS[cat.icon] || Box : Box
                          return <IconComp size={18} className="text-primary" />
                        })()}
                        <span>{categories.find(c => c.id.toString() === data.categoryId.toString())?.name}</span>
                      </>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Selecionar Categoria...</span>
                    )}
                  </div>
                  <ChevronRight size={16} style={{ transform: showCategoryPicker ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
                </button>

                {showCategoryPicker && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      marginTop: '8px', 
                      padding: '12px', 
                      background: 'var(--bg-card)', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-dim)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                      gap: '8px',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}
                  >
                    {categories.map((cat: any) => {
                      const IconComp = CATEGORY_ICONS[cat.icon] || Box
                      const isActive = data.categoryId === cat.id.toString() || data.categoryId === cat.id

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setData('categoryId', cat.id.toString())
                            setShowCategoryPicker(false)
                          }}
                          style={{ 
                            padding: '10px 8px', 
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: isActive ? 'var(--primary)' : 'transparent',
                            background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            transition: '0.2s'
                          }}
                        >
                          <IconComp size={14} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                          <span style={{ fontSize: '10px', fontWeight: '600', color: isActive ? '#fff' : 'var(--text-muted)' }}>{cat.name}</span>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Conta / Banco</label>
                <button 
                  type="button"
                  onClick={() => { setShowBankPicker(!showBankPicker); setShowCategoryPicker(false); }}
                  className="auth-input"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {data.bankId ? (
                      <>
                        <Landmark size={18} style={{ color: banks.find(b => b.id.toString() === data.bankId.toString())?.color }} />
                        <span>{banks.find(b => b.id.toString() === data.bankId.toString())?.name}</span>
                      </>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Selecionar Banco...</span>
                    )}
                  </div>
                  <ChevronRight size={16} style={{ transform: showBankPicker ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
                </button>

                {showBankPicker && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      marginTop: '8px', 
                      padding: '12px', 
                      background: 'var(--bg-card)', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-dim)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(1, 1fr)',
                      gap: '8px'
                    }}
                  >
                    {banks.map((bank: any) => {
                      const isActive = data.bankId === bank.id.toString()
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => {
                            setData('bankId', bank.id.toString())
                            setShowBankPicker(false)
                          }}
                          style={{ 
                            padding: '12px 16px', 
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: isActive ? bank.color : 'transparent',
                            background: isActive ? `${bank.color}15` : 'rgba(255,255,255,0.02)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: '0.2s',
                            textAlign: 'left'
                          }}
                        >
                          <Landmark size={16} style={{ color: bank.color }} />
                          <span style={{ fontSize: '13px', fontWeight: '600', color: isActive ? '#fff' : 'var(--text-muted)' }}>{bank.name}</span>
                        </button>
                      )
                    })}
                    {banks.length === 0 && (
                      <div style={{ padding: '12px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                        Nenhum banco cadastrado. <Link href="/banks" style={{ color: 'var(--primary)' }}>Criar um agora.</Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'end', marginBottom: '24px' }}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} /> Data do Registro
                  </label>
                  <input 
                    type="date" 
                    className="auth-input" 
                    value={data.date}
                    onChange={e => setData('date', e.target.value)}
                    required
                  />
                </div>
                <div className="input-group" style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  padding: '16px', 
                  borderRadius: '16px', 
                  border: '1px solid var(--border-dim)',
                  marginTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>Gasto/Renda Recorrente?</span>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Se repete todo mês automaticamente.
                      </p>
                    </div>
                    
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={data.isRecurring}
                        onChange={e => setData('isRecurring', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={processing} className="btn-auth" style={{ marginTop: '16px', borderRadius: '16px', height: '56px' }}>
                {processing ? 'Salvando...' : (editingTransaction ? 'Salvar Alterações' : 'Confirmar Transação')}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  )
}
