import { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const totalSteps = 6

  const { data, setData } = useForm({
    fullName: '',
    income: '',
    balance: '',
    investments: '',
    fixedExpenses: '',
    objective: '',
    emailPreferences: {
      budgetAlerts: true,
      weeklySummary: true,
      lowBalance: true
    }
  })

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < totalSteps) {
      nextStep()
    } else {
      // Final submission logic here
      console.log('Final data:', data)
      // post('/onboarding/complete')
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="onboarding-step">
            <h2 className="auth-title">Olá! Qual seu nome e renda mensal?</h2>
            <p className="auth-subtitle">Isso nos ajuda a personalizar sua experiência.</p>
            <div className="input-group" style={{ marginTop: '24px' }}>
              <label className="input-label">Nome Completo</label>
              <input 
                type="text" 
                className="auth-input" 
                value={data.fullName}
                onChange={e => setData('fullName', e.target.value)}
                placeholder="Ex: João Silva"
              />
            </div>
            <div className="input-group" style={{ marginTop: '16px' }}>
              <label className="input-label">Renda Mensal Estimada (R$)</label>
              <input 
                type="number" 
                className="auth-input" 
                value={data.income}
                onChange={e => setData('income', e.target.value)}
                placeholder="Ex: 5000"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="onboarding-step">
            <h2 className="auth-title">Qual seu saldo atual disponível?</h2>
            <p className="auth-subtitle">Soma de todas as suas contas correntes e dinheiro vivo.</p>
            <div className="input-group" style={{ marginTop: '24px' }}>
              <label className="input-label">Saldo Total (R$)</label>
              <input 
                type="number" 
                className="auth-input" 
                value={data.balance}
                onChange={e => setData('balance', e.target.value)}
                placeholder="Ex: 2500"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="onboarding-step">
            <h2 className="auth-title">Você já possui investimentos?</h2>
            <p className="auth-subtitle">Ações, FIIs, Tesouro, CDB, etc.</p>
            <div className="input-group" style={{ marginTop: '24px' }}>
              <label className="input-label">Valor Total Investido (R$)</label>
              <input 
                type="number" 
                className="auth-input" 
                value={data.investments}
                onChange={e => setData('investments', e.target.value)}
                placeholder="Deixe em branco se não tiver"
              />
            </div>
          </div>
        )
      case 4:
        return (
          <div className="onboarding-step">
            <h2 className="auth-title">Quais seus principais gastos fixos?</h2>
            <p className="auth-subtitle">Aluguel, Internet, Assinaturas, etc.</p>
            <div className="input-group" style={{ marginTop: '24px' }}>
              <label className="input-label">Total de Gastos Fixos (R$)</label>
              <input 
                type="number" 
                className="auth-input" 
                value={data.fixedExpenses}
                onChange={e => setData('fixedExpenses', e.target.value)}
                placeholder="Ex: 1800"
              />
            </div>
          </div>
        )
      case 5:
        return (
          <div className="onboarding-step">
            <h2 className="auth-title">Qual seu maior objetivo hoje?</h2>
            <p className="auth-subtitle">A IA vai focar nisso para te ajudar.</p>
            <div className="categories-container" style={{ marginTop: '24px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {['Reserva de Emergência', 'Comprar um Bem', 'Aposentadoria', 'Sair das Dívidas'].map(obj => (
                <button 
                  key={obj}
                  type="button"
                  className={`cat-box ${data.objective === obj ? 'active' : ''}`}
                  onClick={() => setData('objective', obj)}
                  style={{ cursor: 'pointer', border: data.objective === obj ? '1px solid var(--primary)' : '' }}
                >
                  {obj}
                </button>
              ))}
            </div>
          </div>
        )
      case 6:
        return (
          <div className="onboarding-step">
            <h2 className="auth-title">Quase lá! Preferências de notificações?</h2>
            <p className="auth-subtitle">Escolha o que quer receber no seu e-mail.</p>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.emailPreferences.budgetAlerts} onChange={e => setData('emailPreferences', {...data.emailPreferences, budgetAlerts: e.target.checked})} />
                Alertas de orçamento estourado
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.emailPreferences.weeklySummary} onChange={e => setData('emailPreferences', {...data.emailPreferences, weeklySummary: e.target.checked})} />
                Resumo semanal de gastos
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.emailPreferences.lowBalance} onChange={e => setData('emailPreferences', {...data.emailPreferences, lowBalance: e.target.checked})} />
                Aviso de saldo baixo em conta
              </label>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="auth-wrapper">
      <Head title="Caria IA | Boas-vindas" />
      
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>Passo {step} de {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div style={{ height: '4px', background: '#2a2a44', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              background: 'var(--primary)', 
              width: `${(step / totalSteps) * 100}%`,
              transition: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}></div>
          </div>
        </div>

        <form onSubmit={submit}>
          {renderStep()}

          <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
            {step > 1 && (
              <button type="button" onClick={prevStep} className="btn-auth" style={{ background: 'none', border: '1px solid var(--border-dim)', flex: 1 }}>
                Voltar
              </button>
            )}
            <button type="submit" className="btn-auth" style={{ flex: 2 }}>
              {step === totalSteps ? 'Finalizar e Ver Dashboard' : 'Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
