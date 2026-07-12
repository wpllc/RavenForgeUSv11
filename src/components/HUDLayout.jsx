import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Terminal, 
  Database, 
  Cpu, 
  AlertTriangle, 
  CheckCircle, 
  BookOpen, 
  Info, 
  Activity, 
  Menu, 
  X, 
  Lock 
} from 'lucide-react';

export default function HUDLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/overview', label: 'Overview', icon: Info },
    { path: '/guided-demo', label: 'Guided Demo', icon: Activity },
    { path: '/evidence', label: 'Evidence', icon: Database },
    { path: '/assets', label: 'Assets', icon: Cpu },
    { path: '/findings', label: 'Findings', icon: AlertTriangle },
    { path: '/audit-trail', label: 'Audit Trail', icon: Terminal },
    { path: '/review-queue', label: 'Review Queue', icon: CheckCircle },
    { path: '/reports', label: 'Reports', icon: BookOpen },
    { path: '/how-it-works', label: 'How RavenForge Works', icon: Shield }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-[#f8fafc] font-sans antialiased">
      {/* 1. GLOBAL DEMO ENVIRONMENT BANNER */}
      <div className="demo-environment-banner" role="status">
        DEMO ENVIRONMENT // VALIDATION SANDBOX UTILIZING SIMULATED DATASETS
      </div>

      {/* 2. MAIN HEADER (TOP BAR) */}
      <header className="app-header bg-[#131c2e] border-b border-[#334155] px-4 md:px-6 py-3.5 flex justify-between items-center z-50 shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-[#94a3b8] hover:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="app-logo flex items-center gap-2">
            <Shield size={20} className="text-[#38bdf8]" />
            <span className="font-extrabold tracking-tight text-white font-sans uppercase">
              RAVENFORGE <span className="text-[#94a3b8] font-light">SYSTEMS</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 text-[#94a3b8] bg-[#0b0f19] px-3 py-1 rounded border border-[#334155]/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            <span className="font-mono">PORTFOLIO STATUS: OPTIMIZED</span>
          </div>
          <NavLink 
            to="/simulator" 
            className={`btn btn-secondary py-1 px-3 text-xs flex items-center gap-1.5 transition-all ${
              location.pathname === '/simulator' ? 'bg-[#334155]/50 border-[#38bdf8] text-white' : ''
            }`}
          >
            <Lock size={12} className="text-amber-500" />
            <span>GATED SIMULATOR</span>
          </NavLink>
        </div>
      </header>

      {/* 3. WORKSPACE (SIDEBAR + MAIN CONTENT) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="app-sidebar hidden lg:flex flex-col shrink-0 bg-[#131c2e] border-r border-[#334155] w-64 p-5 z-40">
          <div className="flex flex-col h-full justify-between">
            <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
              <div className="text-[10px] text-[#64748b] font-mono uppercase tracking-wider mb-2 px-3">
                Governance Dashboard
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-[#334155]/40 font-mono text-[10px] text-[#64748b]">
              <div>SYSTEM ENVIRONMENT: SANDBOX</div>
              <div>VALIDATION TESTS: 32 / 32 PASS</div>
            </div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER OVERLAY */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* MOBILE SIDEBAR DRAWER */}
        <aside className={`lg:hidden fixed top-0 bottom-0 left-0 w-64 bg-[#131c2e] border-r border-[#334155] p-5 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#334155]/50">
            <span className="font-bold text-sm text-[#94a3b8] uppercase tracking-wider">Navigation</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#94a3b8] hover:text-white p-1"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            
            <div className="h-px bg-[#334155]/50 my-2" />
            
            <NavLink
              to="/simulator"
              className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
            >
              <Lock size={16} className="text-amber-500" />
              <span>Gated Simulator</span>
            </NavLink>
          </nav>
        </aside>

        {/* MAIN DISPLAY AREA */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#0b0f19]">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* 4. FOOTER */}
      <footer className="bg-[#0b0f19] border-t border-[#334155]/30 py-3 px-4 md:px-6 flex justify-between items-center text-[11px] text-[#64748b] font-mono shrink-0">
        <div>
          <span>RAVENFORGE SYSTEMS LLC &copy; 2026</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <span>LEDGER: CERTIFIED</span>
          <span>POLICIES: ENFORCED</span>
        </div>
      </footer>
    </div>
  );
}
