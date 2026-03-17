import { Link, Head, useForm } from '@inertiajs/react'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <div className="auth-wrapper" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-deep)',
      padding: '24px'
    }}>
      <Head title="Acessar conta" />
      
      <div className="auth-card" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '48px',
        background: 'var(--bg-card)',
        borderRadius: '24px',
        boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        border: '1px solid var(--border-dim)'
      }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="logo-area" style={{ justifyContent: 'center', padding: '0 0 24px' }}>
            <svg className="logo-sparkle" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <span style={{ fontSize: '28px', fontStyle: 'italic', fontWeight: '800', letterSpacing: '-1px' }}>
              Caria<span style={{ color: 'var(--primary)' }}>IA</span>
            </span>
          </div>
          <h1 className="auth-title" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Entrar</h1>
          <p className="auth-subtitle" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Bem-vindo de volta! Por favor, insira seus dados.</p>
        </div>

        <form onSubmit={submit} className="auth-form" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label" htmlFor="email" style={{ fontSize: '12px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="auth-input"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-dim)' }}
              placeholder="seu@email.com"
              autoComplete="username"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              required
            />
            {errors.email && <span className="error-msg" style={{ fontSize: '12px', color: 'var(--red-accent)', marginTop: '4px', display: 'block' }}>{errors.email as string}</span>}
          </div>

          <div className="input-group" style={{ margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="input-label" htmlFor="password" style={{ fontSize: '12px', fontWeight: '600', margin: 0 }}>Senha</label>
              <a href="#" className="auth-link" style={{ fontSize: '12px', color: 'var(--primary)' }}>Esqueceu a senha?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                className="auth-input"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-dim)', paddingRight: '48px' }}
                placeholder="••••••••"
                autoComplete="current-password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="error-msg" style={{ fontSize: '12px', color: 'var(--red-accent)', marginTop: '4px', display: 'block' }}>{errors.password as string}</span>}
          </div>

          <button 
            type="submit" 
            className="btn-auth" 
            disabled={processing}
            style={{
              marginTop: '12px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'var(--font-display)',
              fontWeight: '700',
              fontSize: '15px'
            }}
          >
            {processing ? <Loader2 size={18} className="spin" /> : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
          Ainda não tem uma conta?{' '}
          <Link href="/signup" className="auth-link" style={{ color: 'var(--primary)', fontWeight: '600' }}>Inscreva-se</Link>
        </div>
      </div>
      
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
