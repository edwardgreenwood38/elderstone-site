import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO'; 
import { Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
// Import the renderer. If npm install failed, see the "SafeRender" fallback below.
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// const STRAPI_URL = "http://127.0.0.1:1337";

const Home = ({ tier, setTier, darkMode }) => {
  const [cmsData, setCmsData] = useState({
    heroTitle: "Managed Digital Excellence Built Like Stone.", 
    heroDescription: null // Initialized as null to handle conditional rendering
  });
  const [loading, setLoading] = useState(true);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);

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
      description: 'Stability & protection for small businesses', 
      listTitle: 'Includes:',
      features: ['Up to 5 pages (Home, About, Services, Contact, +1 custom page)', 'Secure managed cloud hosting', 'SSL certificates & standard security hardening', 'Daily cloud backups & uptime monitoring', 'Performance optimization (Core Web Vitals)', '1 content update per month', 'Email support'],
      footerTitle: 'Best for:',
      footerDesc: 'businesses that need a professional, reliable website without ongoing complexity.',
      faqs: [
        { q: 'Can I add more pages later?', a: 'Yes. You can upgrade to Growth anytime to get more pages and features.' },
        { q: 'Is SSL included?', a: 'Yes, SSL certificates are included with all plans for secure HTTPS.' },
        { q: 'How often do you update the site?', a: 'You get 1 content update per month. Additional updates can be purchased separately.' }
      ]
    },
    { name: 'Growth', 
      price: '249', 
      listTitle: 'Everything in Starter, plus:',
      description: 'Performance & lead generation for growing businesses', 
      features: ['Up to 10 pages', 'Advanced speed & performance tuning', 'SEO & analytics setup', 'Contact forms & lead routing', '3 content updates per month', 'Monthly site health report', 'Monthly strategy check-in'],
      footerTitle: 'Best for:',
      footerDesc: 'businesses using their website to attract leads and make regular updates.',
      faqs: [
        { q: 'What does SEO setup include?', a: 'We configure Google Analytics, set up meta tags, create sitemaps, and optimize Core Web Vitals for search visibility.' },
        { q: 'Can I integrate third-party tools?', a: 'Yes, basic integrations like email signup, CRM connectors, and analytics tools are included.' },
        { q: 'Is the monthly check-in optional?', a: 'No, monthly strategy check-ins are included to review performance and discuss optimizations.' }
      ]
    },
    { name: 'Pro', 
      price: '399', 
      listTitle: 'Everything in Growth, plus:',
      description: 'Advanced security and strategy for enterprises.', 
      features: ['Unlimited pages', 'Priority support', 'Advanced security hardening', 'Backend & database management (PostgreSQL)', 'Automated deployments & zero-downtime updates', 'Integrations & custom workflows', '6 content updates per month'],
      footerTitle: 'Best for:',
      footerDesc: 'businesses that rely on their website for operations, revenue, or automation.',
      faqs: [
        { q: 'What custom workflows can we build?', a: 'We can build custom automations for lead scoring, payment processing, inventory management, and more.' },
        { q: 'Is database access included?', a: 'Yes, you get PostgreSQL database management. We handle scaling, backups, and optimization.' },
        { q: 'How fast is priority support?', a: 'Critical issues get 2-hour response time. Standard issues within 24 hours.' }
      ]
    }
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
            <button className="btn btn-lg px-4 py-3 btn-outline-light" onClick={() => window.location.href = `/services?theme=${darkMode ? 'dark' : 'light'}`}>
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
                onMouseEnter={() => {
                  setHoveredPlan(plan.name);
                  setTier(plan.name);
                }}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{ 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '16px', 
                  border: tier === plan.name || hoveredPlan === plan.name ? '2px solid var(--copper)' : '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  transform: hoveredPlan === plan.name ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredPlan === plan.name ? '0 12px 24px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="card-body p-4">
                  <h3 className="display-6 fw-bold mb-2" style={{ color: 'var(--text-main)' }}>{plan.name}</h3>
                  <p className="mb-4 fw-bold" style={{ color: 'var(--text-muted)' }}>{plan.description}</p>
                  
                  <div className="mb-4">
                    {/* Use Stone Blue for price in Light mode, but White/Off-White in Dark mode for better contrast */}
                    <span className="display-4 fw-bold" style={{ color: 'var(--text-main)' }}>${plan.price}</span>
                    <span style={{ color: 'var(--text-muted)' }}>/mo</span>
                  </div>

                  <div className='text-start'>
                    <span className='fw-bold' style={{ color: 'var(--text-main)' }}>{plan.listTitle}</span>
                  </div>

                  <ul className="list-unstyled mb-5 text-start">
                    {plan.features.map((f, i) => (
                      <li key={i} className="mb-3 d-flex align-items-start">
                        <CheckCircle size={18} className="me-2 mt-1" style={{ color: 'var(--copper)', flexShrink: 0 }} />
                        <span className="small" style={{ color: 'var(--text-main)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className='mb-4'>
                    <span className="fw-bold" style={{ color: 'var(--text-main)' }}>{plan.footerTitle}</span> {plan.footerDesc}
                  </div>

                  <button 
                    onClick={() => setSelectedPlanModal(plan.name)}
                    className="btn w-100 py-2 mb-2" 
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'var(--copper)', 
                      border: '2px solid var(--copper)',
                      fontSize: '0.9rem'
                    }}
                  >
                    Learn More
                  </button>

                  <button 
                    onClick={() => { setTier(plan.name); window.location.href = `/onboarding?tier=${encodeURIComponent(plan.name)}&theme=${darkMode ? 'dark' : 'light'}` }} 
                    className="btn w-100 py-3 fw-bold" 
                    style={{ 
                      backgroundColor: tier === plan.name ? 'var(--stone-blue)' : 'transparent', 
                      color: tier === plan.name ? 'white' : 'var(--stone-blue)', 
                      border: '2px solid var(--stone-blue)' 
                    }}
                  >
                    {tier === plan.name ? 'Get Started' : `Get Started`}
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
            <h4 className="text-uppercase fw-bold mb-4" style={{ color: 'var (--text-muted)', letterSpacing: '0.1em' }} >The Elderstone Advantage</h4>

            <div className="row g-4 justify-content-center">

              {/* Security */}
              <div className="col-lg-4 col-md-6">
                <div style={{ backgroundColor: 'rgba(31, 58, 95, 0.08)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--stone-blue)', borderOpacity: '0.2' }}>
                  <Shield className="mb-2" style={{ color: 'var(--copper)' }} size={32} />
                  <p className="fw-bold small mb-3" style={{ color: 'var(--text-main)' }}>
                    Security
                  </p>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Your website is protected, monitored, and maintained — every day.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Most websites don’t fail because of bad design. They fail because no one is responsible for maintaining them.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Every Elderstone plan includes:</p>
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                          <li style={{ marginBottom: '0.5rem' }}>Secure, professionally managed hosting</li>
                          <li style={{ marginBottom: '0.5rem' }}>Ongoing software and security updates</li>
                          <li style={{ marginBottom: '0.5rem' }}>Monitoring, backups, and uptime checks</li>
                          <li style={{ marginBottom: '0.5rem' }}>Active protection against common failures</li>
                          <li style={{ marginBottom: '0.5rem' }}>A team accountable for keeping your site online</li>
                      </ul>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>DIY platforms and one-off builds leave security in your hands. We don’t.</p>
                    {/* <p style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>DIY platforms and one-off builds leave security in your hands. We don't.</p> */}
                    </div>
                </div>

              </div>

              {/* Performance */}
              <div className="col-lg-4 col-md-6">
                <div style={{ backgroundColor: 'rgba(31, 58, 95, 0.08)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--stone-blue)', borderOpacity: '0.2' }}>
                  <Zap className="mb-2" style={{ color: 'var(--copper)' }} size={32} />
                  <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                    Performance
                  </p>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Built on proven frameworks, optimized for reliability — not experimentation.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>We use battle-tested systems and customize them for your business instead of rebuilding from scratch each time. This allows us to:</p>
                    {/* <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>This allows us to:</p> */}
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                          <li style={{ marginBottom: '0.5rem' }}>Launch faster</li>
                          <li style={{ marginBottom: '0.5rem' }}>Reduce bugs and downtime</li>
                          <li style={{ marginBottom: '0.5rem' }}>Keep costs predictable</li>
                          <li style={{ marginBottom: '0.5rem' }}>Maintain and update sites reliably over time</li>
                      </ul>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>You’re not paying for experimentation — you’re paying for stability.</p>
                    {/* <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>Our plans also eliminate unpredictable agency billing. No hourly invoices. No surprise charges.</p>
                    <p style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>Everything you need to keep your site running smoothly is bundled into one clear monthly price. If something falls outside your plan, we’ll tell you before doing the work.</p> */}
                  </div>

                </div>
              </div>

              {/* Growth */}
              <div className="col-lg-4 col-md-6">
                <div style={{ backgroundColor: 'rgba(31, 58, 95, 0.08)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--stone-blue)', borderOpacity: '0.2' }}>
                  <TrendingUp className="mb-2" style={{ color: 'var(--copper)' }} size={32} />
                  <p className="fw-bold small mb-0" style={{ color: 'var(--text-main)' }}>
                    Growth
                  </p>

                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>Right-sized plans that scale with your business.</p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>Your website should support your business — not hold it back.</p>
                    {/* <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>Each plan is designed to match how critical your website is to your operations:</p> */}
                      <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '600' }}>Starter</span> keeps your site stable, secure, and protected</li>
                          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '600' }}>Growth</span> supports lead generation, reporting, and ongoing changes</li>
                          <li style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '600' }}>Pro</span> supports revenue-critical systems, automation, and integrations</li>
                      </ul>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>As your business grows, your website can grow with it — without rebuilding or switching providers.</p>
                    {/* <p style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>Our long-term model only works if your site stays online, performs well, and continues to deliver value month after month. That’s why we focus on ongoing management instead of one-off projects.</p> */}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <hr className="my-2 px-5" style={{ borderColor: 'var(--stone-blue)' }} />

      {/* Follow up */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-5 border rounded p-4" style={{ backgroundColor: 'rgba(192, 122, 44, 0.06)', borderColor: 'var(--border-color)' }}>
            <div className="py-3 text-center">
                  
                  <h2 className="fw-bold mb-3" style={{ color: 'var(--stone-blue)' }}>No Surprise Fees</h2>
                  <p className="text-start" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Traditional agencies charge:</p>
                      <ul style={{ listStyleType: 'disc', paddingLeft: '3.5rem', marginTop: '1rem', textAlign: 'start' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Large upfront builds</li>
                        <li style={{ marginBottom: '0.5rem' }}>Hourly rates for every change</li>
                        <li style={{ marginBottom: '0.5rem' }}>Unpredictable maintenance costs</li>
                      </ul>
                  <p className="text-start" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Elderstone bundles everything into one clear monthly price.</p>
                  <p className="text-start" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>If something falls outside your plan, we’ll tell you before doing the work.</p>

                  <hr className="my-3 px-5" style={{ color: 'var(--stone-blue)' }} />

                  <h2 className="fw-bold mb-3" style={{ color: 'var(--stone-blue)' }}>Still Comparing Options?</h2>
                  <p className="text-start" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Ask yourself:</p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '3.5rem', marginTop: '1rem', textAlign: 'start' }}>
                      <li style={{ marginBottom: '0.5rem' }}>Who is responsible if the site goes down?</li>
                      <li style={{ marginBottom: '0.5rem' }}>Who updates it and keeps it secure?</li>
                      <li style={{ marginBottom: '0.5rem' }}>Who fixes issues when something breaks?</li>
                      <li style={{ marginBottom: '0.5rem' }}>Who makes changes as your business evolves?</li>
                    </ul>
                  <p className="text-start" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}> That’s what our pricing covers.</p>

                  <hr className="my-3 px-5" style={{ color: 'var(--stone-blue)' }} />

                  <h2 className="fw-bold mb-3" style={{ color: 'var(--stone-blue)' }}>Simple. Predictable. Managed.</h2>
                  <p className="text start" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Your website, handled.</p>

                  <hr className="my-5" />

                  <p className="lead opacity-75 mb-4" style={{ color: 'var(--text-muted)' }}>Get in touch today to discuss your project and see how we can help.</p>
                  <button className="btn btn-lg px-4 py-3 shadow" onClick={() => window.location.href = `/contact?theme=${darkMode ? 'dark' : 'light'}`} style={{ backgroundColor: 'var(--copper)', color: 'white', fontWeight: '700' }}>
                    Contact Us
                  </button>

                </div>
            </div>
        </div>
      </section>

      {/* Plan Details Modal */}
      {selectedPlanModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
            padding: '1rem'
          }}
          onClick={() => setSelectedPlanModal(null)}
        >
          <div 
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'var(--text-main)', margin: 0 }}>{selectedPlanModal} Plan</h3>
              <button
                onClick={() => setSelectedPlanModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '0',
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>

            {plans.find(p => p.name === selectedPlanModal) && (
              <>
                <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{plans.find(p => p.name === selectedPlanModal)?.description}</p>
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ color: 'var(--text-main)', fontSize: '2rem', fontWeight: 'bold' }}>
                      ${plans.find(p => p.name === selectedPlanModal)?.price}
                    </span>
                    <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>/month</span>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h5 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontWeight: '600' }}>Frequently Asked Questions</h5>
                  {plans.find(p => p.name === selectedPlanModal)?.faqs.map((faq, idx) => (
                    <div key={idx} style={{ marginBottom: '1.5rem' }}>
                      <p style={{ color: 'var(--copper)', fontWeight: '600', marginBottom: '0.5rem', margin: 0 }}>
                        {faq.q}
                      </p>
                      <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', margin: 0, fontSize: '0.95rem' }}>
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedPlanModal(null);
                    setTier(selectedPlanModal);
                    window.location.href = `/onboarding?tier=${encodeURIComponent(selectedPlanModal)}&theme=${darkMode ? 'dark' : 'light'}`;
                  }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'var(--stone-blue)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Get Started with {selectedPlanModal}
                </button>
              </>
            )}
          </div>
        </div>
      )}
      

    </div>
  );
};

export default Home;