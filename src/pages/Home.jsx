import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO'; 
import { Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
// Import the renderer. If npm install failed, see the "SafeRender" fallback below.
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const STRAPI_URL = "http://localhost:1337";

const Home = ({ tier, setTier, darkMode }) => {
  const [cmsData, setCmsData] = useState({
    heroTitle: "Managed Digital Excellence Built Like Stone.", 
    heroDescription: null // Initialized as null to handle conditional rendering
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        // Strapi v5 uses lowercase plural or single names
        const response = await fetch(`${STRAPI_URL}/api/homepage`);
        const json = await response.json();
        
        if (json.data) {
          // Strapi v5 FIX: Data is flat, no more .attributes
          setCmsData({
            heroTitle: json.data.heroTitle || "Managed Digital Excellence Built Like Stone.",
            heroDescription: json.data.heroDescription
          });
        }
      } catch (error) {
        console.error("Strapi Connection Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  useSEO({
    title: 'Modern Web Infrastructure',
    // SEO description needs a string, so we fall back to a default if heroDescription is a block array
    description: Array.isArray(cmsData.heroDescription) 
      ? "Managed infrastructure and security for scaling businesses." 
      : cmsData.heroDescription,
    image: '/images/home-share-preview.jpg', 
    url: window.location.href,
    type: 'website',
    tier: tier 
  });

  const plans = [
    { name: 'Starter', 
      price: '149', 
      description: 'Essential maintenance and security.', 
      features: ['Secure Managed Hosting', 'Daily Cloud Backups', '1 Content Edit Per Month', 'Standard Security Patching'] },
    { name: 'Growth', 
      price: '249', 
      description: 'Performance and reporting for growing footprints.', 
      features: ['Everything in Starter', 'Monthly Health Reports', '3 Content Edits Per Month', 'Speed Optimization Tuning'] },
    { name: 'Pro', 
      price: '399', 
      description: 'Advanced security and strategy for enterprises.', 
      features: ['Everything in Growth', 'Advanced Security Hardening', '6 Content Edits Per Month', 'Monthly Strategy Check-ins'] }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section 
        className="py-5 text-center text-white" 
        style={{ background: 'linear-gradient(135deg, #1F3A5F 0%, #162C47 100%)' }}
      >
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">{cmsData.heroTitle}</h1>
          
          <div className="lead opacity-75 mx-auto mb-5" style={{ maxWidth: '750px' }}>
            {/* Strapi v5 FIX: Render Blocks or String safely */}
            {cmsData.heroDescription ? (
              Array.isArray(cmsData.heroDescription) ? (
                <BlocksRenderer content={cmsData.heroDescription} />
              ) : (
                <p>{cmsData.heroDescription}</p>
              )
            ) : (
              <p>We build conversation-focused websites and manage everything—hosting, updates, security, and growth.</p>
            )}
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-lg px-4 py-3 shadow" style={{ backgroundColor: 'var(--copper)', color: 'white', fontWeight: '700' }}>
              Start Your Plan
            </button>
            <button className="btn btn-lg px-4 py-3 btn-outline-light">
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section - FIXED FOR THEME COMPATIBILITY */}
      <section className="container py-5 mt-n5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5" style={{ color: 'var(--text-main)' }}>Predictable Managed Pricing</h2>
          <p style={{ color: 'var(--text-muted)' }}>No hidden fees. No technical jargon. Just reliable results.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {plans.map((plan) => (
            <div className="col-lg-4 col-md-6" key={plan.name}>
              <div 
                className="card h-100 shadow-sm transition-all" 
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '16px', 
                  border: tier === plan.name ? '2px solid var(--copper)' : '1px solid var(--border-color)',
                  color: 'var(--text-main)' // Ensures card text flips based on theme
                }}
              >
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-2" style={{ color: 'var(--text-main)' }}>{plan.name}</h3>
                  <p className="small mb-4" style={{ color: 'var(--text-muted)' }}>{plan.description}</p>
                  
                  <div className="mb-4">
                    {/* Use Stone Blue for price in Light mode, but White/Off-White in Dark mode for better contrast */}
                    <span className="display-4 fw-bold" style={{ color: 'var(--text-main)' }}>${plan.price}</span>
                    <span style={{ color: 'var(--text-muted)' }}>/mo</span>
                  </div>

                  <ul className="list-unstyled mb-5 text-start">
                    {plan.features.map((f, i) => (
                      <li key={i} className="mb-3 d-flex align-items-start">
                        <CheckCircle size={18} className="me-2 mt-1" style={{ color: 'var(--copper)', flexShrink: 0 }} />
                        <span className="small" style={{ color: 'var(--text-main)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setTier(plan.name)} 
                    className="btn w-100 py-3 fw-bold" 
                    style={{ 
                      backgroundColor: tier === plan.name ? 'var(--stone-blue)' : 'transparent', 
                      color: tier === plan.name ? 'white' : 'var(--stone-blue)', 
                      border: '2px solid var(--stone-blue)' 
                    }}
                  >
                    {tier === plan.name ? 'Plan Selected' : `Select ${plan.name}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container py-5 text-center border-top">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h4 className="text-uppercase small fw-bold mb-4" style={{ color: 'var (--text-muted)', letterSpacing: '0.1em' }} >The Elderstone Advantage</h4>

            <div className="row g-4">

              {/* Security */}
              <div className="col-lg-4 col-md-6">
                <div style={{ backgroundColor: 'rgba(31, 58, 95, 0.08)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--stone-blue)', borderOpacity: '0.2' }}>
                  <Shield className="mb-2" style={{ color: 'var(--stone-blue)' }} size={32} />
                  <p className="fw-bold small mb-3" style={{ color: 'var(--text-main)' }}>
                    Security
                  </p>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Your website is protected, monitored, and maintained—every day.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Most websites don't fail because of bad design. They fail because no one is responsible for maintaining them.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Every Elderstone plan includes:</p>
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                          <li style={{ marginBottom: '0.5rem' }}>Secure, professionally managed hosting</li>
                          <li style={{ marginBottom: '0.5rem' }}>Ongoing software and security updates</li>
                          <li style={{ marginBottom: '0.5rem' }}>Monitoring, backups, and uptime checks</li>
                          <li style={{ marginBottom: '0.5rem' }}>Active protection against common failures and breakages</li>
                          <li style={{ marginBottom: '0.5rem' }}>A team accountable for keeping your site online and working</li>
                      </ul>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>This is why our plans are monthly—your website isn't a one-time project. It's a system that needs ongoing care.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>DIY platforms and one-off builds leave security in your hands. We don't.</p>
                    </div>
                </div>

              </div>

              {/* Performance */}
              <div className="col-lg-4 col-md-6">
                <div style={{ backgroundColor: 'rgba(31, 58, 95, 0.08)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--stone-blue)', borderOpacity: '0.2' }}>
                  <Zap className="mb-2" style={{ color: 'var(--stone-blue)' }} size={32} />
                  <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                    Performance
                  </p>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Built on proven frameworks, optimized for reliability—not experimentation.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>We use professional, battle-tested frameworks and customize them for your business instead of rebuilding from scratch every time.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>This allows us to:</p>
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                          <li style={{ marginBottom: '0.5rem' }}>Launch faster</li>
                          <li style={{ marginBottom: '0.5rem' }}>Reduce bugs and downtime</li>
                          <li style={{ marginBottom: '0.5rem' }}>Keep costs predictable</li>
                          <li style={{ marginBottom: '0.5rem' }}>Maintain and update sites reliably over time</li>
                      </ul>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>You’re not paying for experimentation—you’re paying for stability.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Our plans also eliminate unpredictable agency billing. No hourly invoices. No surprise charges.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>Everything you need to keep your site running smoothly is bundled into one clear monthly price. If something falls outside your plan, we’ll tell you before doing the work.</p>
                  </div>

                </div>
              </div>

              {/* Growth */}
              <div className="col-lg-4 col-md-6">
                <div style={{ backgroundColor: 'rgba(31, 58, 95, 0.08)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--stone-blue)', borderOpacity: '0.2' }}>
                  <TrendingUp className="mb-2" style={{ color: 'var(--stone-blue)' }} size={32} />
                  <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                    Growth
                  </p>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Right-sized plans that scale as your business does.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Your website should support your business—not hold it back.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Each plan is designed to match how critical your website is to your operations:</p>
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '600' }}>Starter</span> keeps your site stable, secure, and protected</li>
                          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '600' }}>Growth</span> supports lead generation, updates, and ongoing changes</li>
                          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '600' }}>Pro</span> supports revenue-critical sites, automation, and integrations</li>
                      </ul>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>As your business grows, your website can grow with it—without rebuilding or switching providers.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>Our long-term model only works if your site stays online, performs well, and continues to deliver value month after month. That’s why we focus on ongoing management instead of one-off projects.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Follow up */}
      <section className="container py-5" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="py-5 text-center">

                  <h2 className="fw-bold mb-3" style={{ color: 'var(--text-main)' }}>Still Comparing Options?</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Ask yourself:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '3.5rem', marginTop: '1rem', textAlign: 'start' }}>
                      <li style={{ marginBottom: '0.5rem' }}>Who is responsible if the site goes down?</li>
                      <li style={{ marginBottom: '0.5rem' }}>Who updates it and keeps it secure?</li>
                      <li style={{ marginBottom: '0.5rem' }}>Who fixes issues when something breaks?</li>
                      <li style={{ marginBottom: '0.5rem' }}>Who makes changes as your business evolves?</li>
                    </ul>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}> That’s what our pricing covers.</p>

                  <h2 className="fw-bold mb-3" style={{ color: 'var(--text-main)' }}>Simple. Predictable. Managed.</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Your website, handled.</p>

                  <hr className="my-4" />

                  <p className="lead opacity-75 mb-4" style={{ color: 'var(--text-muted)' }}>Get in touch today to discuss your project and see how we can help.</p>
                  <button className="btn btn-lg px-4 py-3 shadow" onClick={() => window.location.href = `/contact?theme=${darkMode ? 'dark' : 'light'}`} style={{ backgroundColor: 'var(--copper)', color: 'white', fontWeight: '700' }}>
                    Contact Us
                  </button>

                </div>
            </div>
        </div>
      </section>
      

    </div>
  );
};

export default Home;