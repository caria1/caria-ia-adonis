import { Head, useForm, router } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Plus, Landmark, Edit3, Trash2, X, DollarSign } from 'lucide-react'

interface Bank {
  id: number
  name: string
  type: string
  initialBalance: number
  currentBalance: number
  color: string
  icon: string
}

interface PageProps {
  banks: Bank[]
}

export default function Banks({ banks }: PageProps) {
  const [showModal, setShowModal] = useState(false)
  const [editingBank, setEditingBank] = useState<Bank | null>(null)

  const { data, setData, post, put, reset, processing } = useForm({
    name: '',
    type: 'checking',
    initialBalance: '0',
    color: '#6366f1',
    icon: 'bank',
  })

  // Synchronize form with editingBank
  useEffect(() => {
    if (editingBank) {
      setData({
        name: editingBank.name,
        type: editingBank.type,
        initialBalance: editingBank.initialBalance.toString(),
        color: editingBank.color,
        icon: editingBank.icon,
      })
    } else {
      reset()
    }
  }, [editingBank])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBank) {
      put(`/banks/${editingBank.id}`, {
        onSuccess: () => {
          toast.success('Banco atualizado!')
          setShowModal(false)
          setEditingBank(null)
          reset()
        }
      })
    } else {
      post('/banks', {
        onSuccess: () => {
          toast.success('Novo banco adicionado!')
          setShowModal(false)
          reset()
        }
      })
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este banco? As transações vinculadas ficarão sem banco.')) {
      router.delete(`/banks/${id}`, {
        onSuccess: () => toast.success('Banco removido.')
      })
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
  }

  return (
    <div className="dashboard-content">
      <Head title="Meus Bancos | Caria IA" />

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            marginBottom: '8px',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-1px' 
          }}>
            Meus Bancos & Contas
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Gerencie onde seu dinheiro está guardado.</p>
        </div>
        <button 
          onClick={() => { setEditingBank(null); setShowModal(true); }}
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
          <Plus size={18} /> Nova Conta
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {banks.map((bank) => (
          <motion.div 
            key={bank.id}
            whileHover={{ scale: 1.01 }}
            className="glow-card" 
            style={{ 
              padding: '32px', 
              border: '1px solid var(--border-dim)',
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.01)',
              borderRadius: '24px'
            }}
          >
            {/* Colored edge indicator */}
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '8px', height: '8px', borderRadius: '50%', background: bank.color }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '14px', 
                background: 'rgba(255,255,255,0.03)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: bank.color,
                border: '1px solid var(--border-dim)'
              }}>
                <Landmark size={24} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                  onClick={() => { setEditingBank(bank); setShowModal(true); }}
                  className="btn-icon-small"
                >
                  <Edit3 size={14} />
                </button>
                <button 
                  onClick={() => handleDelete(bank.id)}
                  className="btn-icon-small-danger"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div>
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '11px', 
                fontWeight: '800', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                fontFamily: 'var(--font-display)',
                marginBottom: '4px'
              }}>
                {bank.name}
              </p>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: '800', 
                fontFamily: 'var(--font-display)',
                color: '#fff'
              }}>
                {formatCurrency(bank.currentBalance)}
              </h2>
            </div>
            
            <div style={{ 
              marginTop: '24px', 
              paddingTop: '16px', 
              borderTop: '1px solid var(--border-dim)', 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>{bank.type.toUpperCase()}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Inicial: {formatCurrency(bank.initialBalance)}</span>
            </div>
          </motion.div>
        ))}

        {banks.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '80px', textAlign: 'center', border: '2px dashed var(--border-dim)', borderRadius: '24px' }}>
            <Landmark size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.3 }} />
            <p style={{ color: 'var(--text-muted)' }}>Você ainda não cadastrou nenhum banco.</p>
            <button 
              onClick={() => setShowModal(true)}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', marginTop: '12px', cursor: 'pointer' }}
            >
              + Adicionar o primeiro agora
            </button>
          </div>
        )}
      </div>

      {/* Modal Add/Edit Bank */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="auth-card" 
            style={{ maxWidth: '480px', width: '100%', padding: '40px' }}
          >
            <button onClick={() => { setShowModal(false); setEditingBank(null); reset(); }} style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 className="auth-title" style={{ fontSize: '24px', textAlign: 'left' }}>{editingBank ? 'Editar Conta' : 'Nova Conta Bancária'}</h2>
            
            <form onSubmit={submit} className="auth-form" style={{ marginTop: '24px' }}>
              <div className="input-group">
                <label className="input-label">Nome do Banco / Instituição</label>
                <input 
                  type="text" 
                  className="auth-input" 
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  placeholder="Ex: Nubank, Itaú, Binace..."
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Tipo de Conta</label>
                  <select 
                    className="auth-input" 
                    value={data.type}
                    onChange={e => setData('type', e.target.value)}
                    style={{ appearance: 'none' }}
                  >
                    <option value="checking">Corrente</option>
                    <option value="savings">Poupança</option>
                    <option value="investment">Investimento</option>
                    <option value="wallet">Carteira / Dinheiro</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">{editingBank ? 'Saldo Base (R$)' : 'Saldo Inicial (R$)'}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="number" 
                      step="0.01"
                      className="auth-input" 
                      style={{ paddingLeft: '40px' }}
                      value={data.initialBalance}
                      onChange={e => setData('initialBalance', e.target.value)}
                      required
                    />
                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                      <DollarSign size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Cor de Identificação</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    className="auth-input" 
                    style={{ width: '60px', height: '50px', padding: '4px', cursor: 'pointer' }}
                    value={data.color}
                    onChange={e => setData('color', e.target.value)}
                  />
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Escolha uma cor para identificar este banco no sistema.
                  </div>
                </div>
              </div>

              <button type="submit" disabled={processing} className="btn-auth" style={{ marginTop: '16px' }}>
                {processing ? 'Salvando...' : (editingBank ? 'Salvar Alterações' : 'Criar Conta Bancária')}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
