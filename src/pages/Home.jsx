import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO'; 
import { Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
// Import the renderer. If npm install failed, see the "SafeRender" fallback below.
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const STRAPI_URL = "http://localhost:1337";

const Home = ({ tier, setTier }) => {
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
          <div className="col-md-8">
            <h4 className="text-uppercase small fw-bold mb-4" style={{ color: 'var (--text-muted)', letterSpacing: '0.1em' }} >The Elderstone Advantage</h4>

            <div className="row g-4">

              {/* Security */}
              <div className="col-4">
                <Shield className="mb-2" style={{ color: 'var(--stone-blue)' }} size={32} />
                <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                  Security
                </p>
              </div>

              {/* Performance */}
              <div className="col-4">
                <Zap className="mb-2" style={{ color: 'var(--stone-blue)' }} size={32} />
                <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                  Performance
                </p>
              </div>

              {/* Growth */}
              <div className="col-4">
                <TrendingUp className="mb-2" style={{ color: 'var(--stone-blue)' }} size={32} />
                <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                  Growth
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;