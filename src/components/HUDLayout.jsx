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
  Settings,
  ChevronDown
} from 'lucide-react';
import { getPendingReviewCount } from '../data/selectors';

export default function HUDLayout({ children }) {
  const location = useLocation();
  const menuButtonRef = useRef(null);

  // Parse mobileMenuOpen query parameter
  const queryParams = new URLSearchParams(location.search);
  const isMobileQuery = queryParams.get('mobileMenuOpen') === 'true';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(isMobileQuery);

  // Sync state if query changes
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get('mobileMenuOpen') === 'true') {
      setMobileMenuOpen(true);
    } else {
      setMobileMenuOpen(false);
    }
  }, [location.search]);

  // Derive counts dynamically from dataset
  const pendingReviews = getPendingReviewCount();

  // Close mobile drawer on route change
  useEffect(() => {
    // Only close if it's not a forced query-param state
    const q = new URLSearchParams(window.location.search);
    if (q.get('mobileMenuOpen') !== 'true') {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  // Handle body scroll locking, escape key listener, and resize resets
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    };

    const handleResize = () => {
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => {
      const next = !prev;
      if (!next && menuButtonRef.current) {
        setTimeout(() => {
          menuButtonRef.current?.focus();
        }, 50);
      }
      return next;
    });
  };

  const primaryItems = [
    { path: '/overview', label: 'Overview', icon: Info },
    { path: '/assets', label: 'Assets', icon: Cpu },
    { path: '/evidence', label: 'Evidence', icon: Database },
    { path: '/findings', label: 'Findings', icon: AlertTriangle },
    { 
      path: '/review-queue', 
      label: 'Reviews', 
      icon: CheckCircle,
      badge: pendingReviews > 0 ? pendingReviews : null
    },
    { path: '/reports', label: 'Reports', icon: BookOpen }
  ];

  const secondaryItems = [
    { path: '/audit-trail', label: 'Audit History', icon: Terminal },
    { path: '/guided-demo', label: 'Product Tour', icon: Activity },
    { path: '/how-it-works', label: 'How It Works', icon: Shield },
    { path: '/simulator', label: 'Policy Test Lab', icon: Settings }
  ];

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
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
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
            Demo Sandbox
          </span>
        </div>
      </header>

      {/* 3. DESKTOP HORIZONTAL Navigation Ribbon (With Dropdown for Secondary items) */}
      <div className="desktop-nav-ribbon bg-[#0f172a]" role="navigation" aria-label="Main Navigation">
        {/* Primary Links */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '4px', flex: 1 }}>
          {primaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-ribbon-link ${isActive ? 'active' : ''}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span className="badge badge-amber text-[9px] px-1 py-0" style={{ marginLeft: '4px' }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Secondary Links Dropdown to prevent scrollbar/wrap wrapping */}
        <div className="nav-dropdown-container">
          <button 
            className="nav-ribbon-link dropdown-trigger" 
            aria-haspopup="true"
            aria-expanded="false"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            <Settings size={14} aria-hidden="true" />
            <span>More</span>
            <ChevronDown size={12} style={{ marginLeft: '4px' }} aria-hidden="true" />
          </button>
          <div className="nav-dropdown-menu">
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `dropdown-menu-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. WORKSPACE CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        
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

              {/* Navigation items within drawer */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <div className="sidebar-group-title">Assessment</div>
                  <nav className="flex flex-col gap-1" aria-label="Assessment Navigation">
                    {primaryItems.map(item => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
                        >
                          <Icon size={16} aria-hidden="true" />
                          <span>{item.label}</span>
                          {item.badge !== null && (
                            <span className="badge badge-amber text-[10px] px-1.5 py-0.5" style={{ marginLeft: 'auto' }}>
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </nav>
                </div>

                <div>
                  <div className="sidebar-group-title">System Tools</div>
                  <nav className="flex flex-col gap-1" aria-label="System Tools Navigation">
                    {secondaryItems.map(item => {
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

              <div className="pt-6 border-t border-[#334155]/50 text-[10px] text-[#64748b] font-mono">
                <div>ENVIRONMENT: SANDBOX</div>
              </div>
            </aside>
          </>
        )}

        {/* MAIN DISPLAY AREA */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#090d16]" aria-label="Main Content" style={{ minHeight: 0 }}>
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8" style={{ minHeight: 0 }}>
            <div className="max-w-6xl mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* 5. FOOTER */}
      <footer className="bg-[#090d16] border-t border-[#334155]/30 py-3 px-4 md:px-6 flex justify-between items-center text-xs text-[#64748b] shrink-0 font-sans">
        <div>
          <span>RAVENFORGE SYSTEMS LLC &copy; 2026</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <span>Audit Log Recorded</span>
          <span>Rules Enforced</span>
        </div>
      </footer>
    </div>
  );
}
