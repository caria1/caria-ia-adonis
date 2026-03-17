import { Head, useForm } from '@inertiajs/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Camera, Save } from 'lucide-react'

interface PageProps {
  user: {
    id: number
    fullName: string
    email: string
    avatar: string | null
    initialBalance: number
  }
}

export default function Profile({ user }: PageProps) {
  const { data, setData, post, processing } = useForm({
    fullName: user.fullName || '',
    initialBalance: user.initialBalance || 0,
  })

  const avatarForm = useForm({
    avatar: null as File | null,
  })

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault()
    post('/profile', {
      onSuccess: () => toast.success('Perfil atualizado com sucesso!'),
      onError: () => toast.error('Erro ao atualizar perfil.')
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      avatarForm.setData('avatar', file)
      avatarForm.post('/profile/avatar', {
        forceFormData: true,
        onSuccess: () => toast.success('Avatar atualizado!'),
        onError: () => toast.error('Falha ao subir imagem.')
      })
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard-content"
    >
      <Head title="Meu Perfil | Caria IA" />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Meu Perfil</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Gerencie suas informações e configurações de conta.</p>
      </div>
      
      <div className="profile-grid">
        {/* Left Column: User Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="profile-card" style={{ textAlign: 'center' }}>
            <div className="profile-card-body" style={{ padding: '40px 24px' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '16px', 
                  background: user.avatar ? `url(${user.avatar}) center/cover` : 'var(--bg-deep)',
                  border: '3px solid var(--border-dim)',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}>
                  {!user.avatar && (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: '800' }}>
                      {user.fullName?.[0] || user.email[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload" 
                  style={{ 
                    position: 'absolute', 
                    bottom: '-10px', 
                    right: '-10px', 
                    background: 'var(--primary)', 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '3px solid var(--bg-card)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    color: '#fff'
                  }}
                >
                  <Camera size={16} />
                  <input id="avatar-upload" type="file" hidden accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
              
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{user.fullName || user.email.split('@')[0]}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>{user.email}</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <span style={{ padding: '4px 8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>MEMBRO PREMIUM</span>
              </div>
            </div>
            
            <div style={{ padding: '20px', borderTop: '1px solid var(--border-dim)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: '800' }}>142</p>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Transações</p>
                </div>
                <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-dim)' }}>
                  <p style={{ fontSize: '16px', fontWeight: '800' }}>R$ 12k</p>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Economizados</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h3 style={{ fontSize: '14px', fontWeight: '700' }}>Sobre mim</h3>
            </div>
            <div className="profile-card-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Organizando minhas finanças com o poder da Inteligência Artificial. Focado em liberdade financeira e investimentos inteligentes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="profile-card">
            <div className="profile-card-header">
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Informações Pessoais</h3>
              <Save size={18} color="var(--primary)" />
            </div>
            <div className="profile-card-body">
              <form onSubmit={submitProfile} className="auth-form" style={{ marginTop: '0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="input-group">
                    <label className="input-label">Nome Completo</label>
                    <input 
                      type="text" 
                      className="auth-input" 
                      value={data.fullName}
                      onChange={e => setData('fullName', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">E-mail</label>
                    <input 
                      type="email" 
                      className="auth-input" 
                      value={user.email}
                      disabled
                      style={{ opacity: 0.5, cursor: 'not-allowed' }}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Saldo Inicial (R$)</label>
                    <input 
                      type="number" 
                      className="auth-input" 
                      value={data.initialBalance}
                      onChange={e => setData('initialBalance', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Telefone</label>
                    <input type="text" className="auth-input" placeholder="+55 00 00000-0000" disabled />
                  </div>
                </div>
                
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={processing} className="btn-premium">
                    {processing ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="profile-card" style={{ opacity: 0.8 }}>
            <div className="profile-card-header">
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Segurança</h3>
            </div>
            <div className="profile-card-body">
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Mantenha sua conta segura alterando sua senha regularmente.
              </p>
              <button disabled className="btn-premium" style={{ background: 'var(--border-dim)', cursor: 'not-allowed' }}>
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input-group { margin-bottom: 8px; }
        .input-label { margin-bottom: 8px; font-weight: 600; color: var(--text-main); font-size: 13px; display: block; }
      `}</style>
    </motion.div>
  )
}
