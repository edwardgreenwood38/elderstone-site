import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Lock, Shield, Zap, TrendingUp, Moon, Sun, CheckCircle2 } from 'lucide-react';

const ElderstoneTemplate = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tier, setTier] = useState('Starter'); // Starter, Growth, Pro

  // // Sync theme with HTML data-attribute for CSS variables
  // useEffect(() => {
  //   document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  // }, [darkMode]);

  // Apply Elderstone Branding via CSS Variables
  const themeStyles = {
    '--stone-blue': '#1F3A5F',
    '--copper': '#C07A2C',
    '--bg-page': darkMode ? '#0B1220' : '#F8FAFC',
    '--bg-card': darkMode ? '#111827' : '#FFFFFF',
    '--text-main': darkMode ? '#F9FAFB' : '#0F172A',
    '--text-muted': darkMode ? '#CBD5E1' : '#475569',
    '--border-color': darkMode ? '#1F2937' : '#E5E7EB',
  };

  // Feature Guard Component
  const ManagedFeature = ({ minTier, title, description, features = [], icon: Icon }) => {
    const tiers = ['Starter', 'Growth', 'Pro'];
    const isLocked = tiers.indexOf(tier) < tiers.indexOf(minTier);

    return (
      <div className="col-md-4 mb-4">
        <div 
          className={`card h-100 shadow-sm position-relative transition-all ${isLocked ? 'opacity-50' : ''}`}
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: isLocked ? 'transparent' : 'var(--border-color)',
            color: 'var(--text-main)' 
          }}
        >
          {isLocked && (
            <div className="position-absolute w-100 h-100 d-flex flex-column align-items-center justify-content-center rounded" 
                 style={{ backgroundColor: 'rgba(0,0,0,0.05)', zIndex: 2, backdropFilter: 'blur(1px)' }}>
              <Lock size={20} color="var(--copper)" />
              <small className="fw-bold mt-2" style={{ color: 'var(--copper)', fontSize: '0.7rem' }}>
                UPGRADE TO {minTier.toUpperCase()}
              </small>
            </div>
          )}
          <div className="card-body p-4">
            <Icon className="mb-3" color={isLocked ? 'gray' : 'var(--stone-blue)'} size={32} />
            <h5 className="fw-bold">{title}</h5>
            <p className="small" style={{ color: 'var(--text-muted)' }}>{description}</p>

            {/* New Bullet List Section */}
            <ul className="list-unstyled mt-auto mb-0">
              {features.map((feature, index) => (
                <li key={index} className="d-flex align-items-start mb-2 small" style={{ color: 'var(--text-main)' }}>
                  <CheckCircle2 size={16} className="me-2 mt-1 flex-shrink-0" color="var(--copper)" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  const logoLight = "/images/light logo.png"; // Stone Blue/Copper on White
  const logoDark = "/images/dark logo.png";   // Off-White/Copper on Deep Slate

  return (
    // <div className="app-container">
    //   <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
    //   <main className="container mt-5">
    //     <h1 style={{ color: 'var(--text-main)' }}>Welcome to Elderstone</h1>

    <div style={themeStyles}>
      <div style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-main)', minHeight: '100vh' }}>
        
        {/* Navigation */}
        <nav className="navbar border-bottom px-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
          {/* <span className="navbar-brand fw-bold" style={{ color: 'var(--stone-blue)' }}>
            Elderstone <span style={{ color: 'var(--copper)' }}>Digital Solutions, LLC</span>
          </span> */}
          <img 
            src={darkMode ? logoDark : logoLight} 
            alt="Elderstone Digital Solutions Logo" 
            style={{ height: '80px', width: 'auto' }}
            className="me-2"
          />
          <button 
            className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </nav>

        {/* Hero Section */}
        <header className="py-5 text-center text-white" style={{ background: 'linear-gradient(135deg, #1F3A5F 0%, #162C47 100%)' }}>
          <div className="container py-4">
            <h1 className="display-4 fw-bold">Managed Digital Excellence</h1>
            <p className="lead opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
              We build conversation-focused websites and manage everything-hosting, updates, security, and growth-on a simple monthy plan.
            </p>
            <button className="btn btn-lg mt-3 shadow" style={{ backgroundColor: 'var(--copper)', color: 'white', fontWeight: '600' }}>
              View Solutions
            </button>
          </div>
        </header>

        <section>
          <div className="container mt-5">
            <p className="opacity-75 mx-auto" style={{ maxWidth: '900px'}}><span className="fw-bold">Elderstone Digital Solutions, LLC</span> is a modern web infrastructure and managed solutions company that empowers small businesses and professionals to thrive online. We build high-performance websites, provide reliabile hosting and maintenance, and deliver ongoing digital support through simple monthly plans-freeing our clients to focus on growth while we ensure their digital presence is secure, scalable, and smartly optimized. Our mission is to replace one-time projects with predictable performance and strategic digital infastructure that works for the business, not just on it.</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container py-5">
          <div className="row">
            {/* <ManagedFeature 
              minTier="Starter" 
              icon={Shield} 
              title="Starter" 
              description="Best for basic website the need stability." 
            /> */}
            <ManagedFeature 
              minTier="Starter" 
              icon={Shield} 
              title="Starter" 
              description="Reliable foundation for your professional presence. Best for basic website that need stability." 
              features={[
                "Managed Secure Hosting",
                "SSL certificate",
                "Core updates & maintenance",
                "Security monitoring",
                "Daily backups",
                "Up to 1 content edit/month",
                "Email support (48-hr response)"
              ]}
            />
            <ManagedFeature 
              minTier="Growth" 
              icon={TrendingUp} 
              title="Performance SEO" 
              description="Monthly speed audits and on-page keyword optimization for growth." 
              features={[
                "All Starter Features",
                "Performance optimization",
                "Monthly uptime & health report",
                "Up to 3 content edits/month",
                "On-page SEO basics",
                "Priority support (24-hr response)"
              ]}
            />
            <ManagedFeature 
              minTier="Pro" 
              icon={Zap} 
              title="Priority Strategy" 
              description="Direct access to strategy consultants and same-day technical support." 
              features={[
                "All Growth Features",
                "Speed & conversion optimization",
                "Up to 6 content edits/month",
                "Monthly strategy check-in",
                "Priority support (same business day)"
              ]}
            />
          </div>
        </section>

        {/* Tier Control (For Internal Template Use) */}
        <div className="container pb-5 text-center border-top pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="small text-uppercase fw-bold opacity-50 mb-3">Template Preview Mode</p>
          <div className="btn-group shadow-sm">
            {['Starter', 'Growth', 'Pro'].map((t) => (
              <button 
                key={t}
                onClick={() => setTier(t)}
                className={`btn btn-sm ${tier === t ? 'btn-dark' : 'btn-light border'}`}
              >
                {t} Plan
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>

    //       </main>
    // </div>
  );
};

export default ElderstoneTemplate;