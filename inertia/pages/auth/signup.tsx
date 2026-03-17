import { Form } from '@adonisjs/inertia/react'
import { Link, Head } from '@inertiajs/react'

export default function Signup() {
  return (
    <div className="auth-wrapper">
      <Head title="Criar conta" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-area" style={{ justifyContent: 'center', padding: '0 0 24px' }}>
            <svg className="logo-sparkle" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <span style={{ fontSize: '24px', fontStyle: 'italic', fontWeight: '800', letterSpacing: '-1px' }}>
              Caria<span style={{ color: 'var(--primary)' }}>IA</span>
            </span>
          </div>
          <h1 className="auth-title">Comece sua jornada</h1>
          <p className="auth-subtitle">Transforme sua vida financeira hoje.</p>
        </div>

        <Form route="new_account.store">
          {({ errors }) => (
            <div className="auth-form">
              <div className="input-group">
                <label className="input-label" htmlFor="fullName">Nome Completo</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="auth-input"
                  placeholder="Seu nome"
                  required
                />
                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="auth-input"
                  placeholder="exemplo@email.com"
                  autoComplete="email"
                  required
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="password">Senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth-input"
                  placeholder="Crie uma senha forte"
                  autoComplete="new-password"
                  required
                />
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="passwordConfirmation">Confirmar Senha</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="auth-input"
                  placeholder="Repita a senha"
                  autoComplete="new-password"
                  required
                />
                {errors.passwordConfirmation && <span className="error-msg">{errors.passwordConfirmation}</span>}
              </div>

              <button type="submit" className="btn-auth">
                Criar Conta Grátis
              </button>
            </div>
          )}
        </Form>

        <div className="auth-footer">
          Já tem uma conta? 
          <Link href="/login" className="auth-link">Fazer login</Link>
        </div>
      </div>
    </div>
  )
}
