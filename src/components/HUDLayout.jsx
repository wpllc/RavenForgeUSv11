import React, { useState, useEffect, useRef } from 'react';
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
import { getPendingReviewCount } from '../data/selectors';

export default function HUDLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);

  // Derive counts dynamically from dataset
  const pendingReviews = getPendingReviewCount();

  // Close mobile drawer and restore scroll on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle mobile drawer body scroll locking, escape key listener, and resize resets
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        // Restore focus to trigger button
        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    };

    const handleResize = () => {
      // Auto close drawer if resizing to desktop breakpoint
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Restore focus to trigger when closing mobile menu programmatically
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => {
      const next = !prev;
      if (!next && menuButtonRef.current) {
        // Delay focus slightly to allow DOM changes
        setTimeout(() => {
          menuButtonRef.current?.focus();
        }, 50);
      }
      return next;
    });
  };

  const assessmentItems = [
    { path: '/overview', label: 'Overview', icon: Info },
    { path: '/assets', label: 'Assets', icon: Cpu },
    { path: '/evidence', label: 'Source Evidence', icon: Database },
    { path: '/findings', label: 'Findings', icon: AlertTriangle },
    { path: '/reports', label: 'Reports', icon: BookOpen }
  ];

  const governanceItems = [
    { path: '/audit-trail', label: 'Audit History', icon: Terminal },
    { 
      path: '/review-queue', 
      label: 'Reviews', 
      icon: CheckCircle,
      badge: pendingReviews > 0 ? pendingReviews : null
    }
  ];

  const learnItems = [
    { path: '/guided-demo', label: 'Product Tour', icon: Activity },
    { path: '/how-it-works', label: 'How It Works', icon: Shield },
    { path: '/simulator', label: 'Policy Test Lab', icon: Lock }
  ];

  const renderNavList = () => (
    <div className="flex flex-col gap-4">
      {/* Assessment section */}
      <div>
        <div className="sidebar-group-title">Assessment</div>
        <nav className="flex flex-col gap-1" aria-label="Assessment Navigation">
          {assessmentItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Governance section */}
      <div>
        <div className="sidebar-group-title">Governance</div>
        <nav className="flex flex-col gap-1" aria-label="Governance Navigation">
          {governanceItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {item.badge !== null && (
                  <span className="badge badge-amber text-[10px] px-1.5 py-0.5" aria-label={`${item.badge} pending items`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Advanced / Simulation tools */}
      <div>
        <div className="sidebar-group-title">System Tools</div>
        <nav className="flex flex-col gap-1" aria-label="System Tools Navigation">
          {learnItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f8fafc] font-sans antialiased">
      
      {/* 1. GLOBAL DEMO ENVIRONMENT BANNER */}
      <div className="demo-environment-banner" role="status">
        Demo Environment — Operating with simulated validation datasets
      </div>

      {/* 2. MAIN HEADER (TOP BAR) */}
      <header className="app-header bg-[#0f172a] border-b border-[#334155] px-4 md:px-6 py-3.5 flex justify-between items-center z-50 shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger menu toggle button */}
          <button 
            ref={menuButtonRef}
            onClick={toggleMobileMenu} 
            className="mobile-menu-toggle-btn text-[#94a3b8] hover:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
            aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-drawer-menu"
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
          
          <div className="app-logo">
            <Shield size={20} className="text-[#38bdf8]" aria-hidden="true" />
            <span className="font-bold text-white tracking-tight uppercase">
              RAVENFORGE <span className="text-[#94a3b8] font-light">SYSTEMS</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="badge badge-gray normal-case font-sans">
            Sandbox Environment
          </span>
        </div>
      </header>

      {/* 3. WORKSPACE (SIDEBAR + MAIN CONTENT) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* DESKTOP SIDEBAR (Isolated via CSS desktop-only-sidebar) */}
        <aside className="app-sidebar desktop-only-sidebar bg-[#0f172a] border-r border-[#334155] w-64 p-5 z-40 flex flex-col justify-between shrink-0">
          <div>
            {renderNavList()}
          </div>
          <div className="pt-6 border-t border-[#334155]/40 text-[10px] text-[#64748b] font-mono space-y-1">
            <div>ENVIRONMENT: SANDBOX</div>
            <div>RULES ACTIVE: 32 VERIFIED</div>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER OVERLAY & CONTENT */}
        {mobileMenuOpen && (
          <>
            <div 
              className="mobile-overlay" 
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <aside 
              id="mobile-drawer-menu"
              className="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#334155]/50">
                <span className="font-bold text-sm text-[#94a3b8] uppercase tracking-wider">Navigation</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#94a3b8] hover:text-white p-1"
                  aria-label="Close navigation menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1">
                {renderNavList()}
              </div>

              <div className="pt-6 border-t border-[#334155]/50 text-[10px] text-[#64748b] font-mono">
                <div>ENVIRONMENT: SANDBOX</div>
              </div>
            </aside>
          </>
        )}

        {/* MAIN DISPLAY AREA */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#090d16]" aria-label="Main Content">
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* 4. FOOTER */}
      <footer className="bg-[#090d16] border-t border-[#334155]/30 py-3.5 px-4 md:px-6 flex justify-between items-center text-xs text-[#64748b] shrink-0 font-sans">
        <div>
          <span>RAVENFORGE SYSTEMS LLC &copy; 2026</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <span>Recorded in Audit History</span>
          <span>Review Rules Active</span>
        </div>
      </footer>
    </div>
  );
}
