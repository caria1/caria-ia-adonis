import { ReactElement, useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import { usePage, Link, router } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Form } from '@adonisjs/inertia/react'
import { Moon, Bell, ChevronDown, User, Settings, LogOut, LayoutGrid, FileText, Landmark, TrendingUp, Target, Search, Tag } from 'lucide-react'


export default function Layout({ children }: { children: ReactElement<any> }) {
  const { user } = usePage().props as any
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [sidebarSearch, setSidebarSearch] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const askAi = (query: string) => {
    setIsAiLoading(true)
    setTimeout(() => {
      let response = ""
      if (query.includes("saúde")) {
        response = "Sua saúde financeira está em 85%. Você economizou 15% mais que o mês passado! 🚀"
      } else if (query.includes("gastando")) {
        response = "Seus maiores gastos este mês são em 'Moradia' (40%) e 'Alimentação' (25%). Tente reduzir 5% em alimentação para bater sua meta! 🍕"
      } else {
        response = "Estou analisando seus dados... Parece que você tem uma reserva de emergência sólida. Continue assim! 💰"
      }
      setAiResponse(response)
      setIsAiLoading(false)
    }, 1500)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (sidebarSearch.trim()) {
      router.get('/transactions', { search: sidebarSearch }, { 
        preserveState: false,
        replace: true 
      })
      setSidebarSearch('')
    }
  }

  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  // Get current path for breadcrumbs
  const pathParts = usePage().url.split('/').filter(Boolean)
  const lastPart = pathParts[pathParts.length - 1] || 'Dashboard'
  const pageTitle = lastPart.charAt(0).toUpperCase() + lastPart.slice(1)

  return (
    <div className={`app-wrapper ${!user ? 'auth-mode' : ''}`}>
      {user && (
        <aside className="sidebar">
          <div className="logo-area" style={{ padding: '40px 24px', gap: '8px' }}>
            <TrendingUp className="logo-sparkle" size={24} style={{ color: 'var(--primary)', filter: 'none' }} />
            <h1 style={{ 
              fontSize: '22px', 
              fontWeight: '800', 
              letterSpacing: '-1px', 
              fontFamily: 'var(--font-display)',
              color: '#fff'
            }}>
              Caria<span style={{ color: 'var(--primary)' }}>.IA</span>
            </h1>
          </div>

          <div className="sidebar-user-card">
            <div className="sidebar-user-avatar">
              {user.avatar ? <img src={user.avatar} style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} /> : user.initials}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{user.fullName || user.email.split('@')[0]}</span>
              <span className="sidebar-user-status">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} /> Online
              </span>
            </div>
          </div>

          <div className="sidebar-search">
            <form onSubmit={handleSearch} className="sidebar-search-inner">
              <Search className="sidebar-search-icon" size={14} />
              <input 
                type="text" 
                placeholder="Pesquisar bancos, gastos..." 
                className="sidebar-search-input" 
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
              />
            </form>
          </div>

          <nav className="nav-links">
            <div className="nav-section-title" style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: '#555' }}>Navegação</div>
            <Link href="/" className={`nav-link ${usePage().url === '/' ? 'active' : ''}`}>
              <LayoutGrid size={18} /> Painel
            </Link>
            <Link href="/transactions" className={`nav-link ${usePage().url.startsWith('/transactions') ? 'active' : ''}`}>
              <FileText size={18} /> Transações
            </Link>
            <Link href="/banks" className={`nav-link ${usePage().url.startsWith('/banks') ? 'active' : ''}`}>
              <Landmark size={18} /> Bancos
            </Link>
            <Link href="/categories" className={`nav-link ${usePage().url.startsWith('/categories') ? 'active' : ''}`}>
              <Tag size={18} /> Categorias
            </Link>
            <Link href="/bills" className={`nav-link ${usePage().url.startsWith('/bills') ? 'active' : ''}`}>
              <FileText size={18} /> Contas a Pagar
            </Link>

            <div className="nav-section-title" style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: '#555' }}>IA & Insights</div>
            <Link href="/insights" className="nav-link">
              <TrendingUp size={18} /> Insights IA
            </Link>
            <Link href="/goals" className="nav-link">
              <Target size={18} /> Metas
            </Link>

            <div className="nav-section-title" style={{ fontFamily: 'var(--font-display)', fontSize: '10px', color: '#555' }}>Preferências</div>
            <Link href="/profile" className={`nav-link ${usePage().url.startsWith('/profile') ? 'active' : ''}`}>
              <Settings size={18} /> Perfil
            </Link>
            
            <Form route="session.destroy">
              <button type="submit" className="nav-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--red-accent)', opacity: 0.8 }}>
                <LogOut size={18} /> Sair
              </button>
            </Form>
          </nav>
        </aside>
      )}

      <main className="content-area" style={{ marginLeft: user ? 'var(--sidebar-w)' : '0', width: user ? 'calc(100% - var(--sidebar-w))' : '100%' }}>
        {user && (
          <header className="topbar">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
                {pathParts.length > 0 ? `${pathParts.join(' / ')}` : 'Geral / Painel'}
              </span>
              <h2 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '-0.5px' }}>{pageTitle}</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button className="topbar-icon-btn"><Moon size={18} /></button>
                <div style={{ position: 'relative' }}>
                  <button className="topbar-icon-btn"><Bell size={18} /></button>
                  <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--red-accent)', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid var(--bg-card)' }}></span>
                </div>
              </div>

              <div style={{ position: 'relative' }} id="user-menu-root">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{user.fullName || user.email.split('@')[0]}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Membro Premium</p>
                  </div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '10px', 
                    background: user.avatar ? `url(${user.avatar}) center/cover` : 'var(--bg-deep)',
                    border: '1px solid var(--border-dim)',
                    overflow: 'hidden'
                  }}>
                    {!user.avatar && (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                        {user.fullName?.[0] || user.email[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <ChevronDown size={14} style={{ color: 'var(--text-muted)', transform: showUserMenu ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      onClick={() => setShowUserMenu(false)} 
                      style={{ position: 'fixed', inset: 0, zIndex: 998 }} 
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        right: 0, 
                        marginTop: '12px',
                        width: '240px',
                        background: 'var(--bg-card)',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-dim)',
                        padding: '8px',
                        zIndex: 999
                      }}
                    >
                      <Link 
                        href="/profile" 
                        onClick={() => setShowUserMenu(false)}
                        className="dropdown-item"
                        style={{ color: 'var(--text-main)' }}
                      >
                        <User size={16} /> Meu Perfil
                      </Link>
                      <button className="dropdown-item" style={{ color: 'var(--text-main)' }}>
                        <Settings size={16} /> Configurações
                      </button>
                      <div style={{ height: '1px', background: 'var(--border-dim)', margin: '8px' }} />
                      <Form route="session.destroy">
                        <button type="submit" className="dropdown-item" style={{ color: 'var(--red-accent)', width: '100%', textAlign: 'left' }}>
                          <LogOut size={16} /> Sair
                        </button>
                      </Form>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </header>
        )}

        <div className={user ? "dashboard-container" : ""}>{children}</div>

        {user && (
          <div className="ai-advisor-bar">
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>IA Advisor:</span>
            <button className="ai-query-btn" onClick={() => askAi("Minha saúde financeira?")}>Minha saúde financeira?</button>
            <button className="ai-query-btn" onClick={() => askAi("Onde estou gastando?")}>Onde estou gastando?</button>
            <div style={{ flex: 1 }}></div>
            <button 
              className="ai-query-btn" 
              onClick={() => askAi("Dica geral")}
              style={{ background: 'var(--primary)', color: '#fff', border: 'none', fontWeight: 'bold' }}
            >
              {isAiLoading ? '🤖 Pensando...' : '✨ Perguntar à IA...'}
            </button>
          </div>
        )}

        {aiResponse && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="auth-card" 
              style={{ maxWidth: '500px', width: '90%', padding: '40px', border: '1px solid var(--primary)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <TrendingUp size={20} />
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Caria IA Insights</h2>
              </div>
              
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#fff' }}>{aiResponse}</p>
              
              <button 
                onClick={() => setAiResponse(null)}
                className="btn-auth" 
                style={{ marginTop: '32px', width: '100%' }}
              >
                Entendi, obrigado!
              </button>
            </motion.div>
          </div>
        )}
      </main>


      <Toaster position="top-right" richColors />
    </div>
  )
}
