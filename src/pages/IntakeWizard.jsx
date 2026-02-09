import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Info, Upload, Globe, Shield } from 'lucide-react';

const IntakeWizard = ({ tier, darkMode, setDarkMode, setTier }) => {
  // Plan details for display
  const planDetails = {
    'Starter': { price: 149, features: 'Up to 5 pages, Managed hosting, SSL, Backups, 1 update/month' },
    'Growth': { price: 249, features: 'Up to 10 pages, Advanced performance, SEO setup, 3 updates/month' },
    'Pro': { price: 399, features: 'Unlimited pages, Priority support, Custom workflows, 6 updates/month' }
  };

  const [step, setStep] = useState(1);
  const [hasPaid, setHasPaid] = useState(false); // New state to track payment return

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    const tierParam = params.get('tier');
    
    // Check for a success indicator from Stripe (e.g., session_id or a custom 'success' param)
    const paymentSuccess = params.get('session_id') || params.get('success');

    if (themeParam === 'dark') {
      setDarkMode(true);
    } else if (themeParam === 'light') {
      setDarkMode(false);
    }
    
    if (tierParam) {
      setTier(decodeURIComponent(tierParam));
    }

    // If returning from a successful payment, keep them on Step 1 but toggle the view
    if (paymentSuccess) {
      setHasPaid(true);
      setStep(1); 
    }
  }, [setDarkMode, setTier]);

  const [formData, setFormData] = useState({
    businessName: '', dba: '', industry: '', ownDomain: 'not-sure', 
    hasWebsite: 'no', pageCount: 1, videoInclude: 'no',
    contactName: '', contactEmail: '', contactPhone: '',
    primaryGoals: [], shortDescription: '',
    domainName: '', registrar: '', dnsAccess: '', preferredDomains: [],
    currentWebsiteUrl: '', currentHost: '', authorizeReplace: false
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      const draft = localStorage.getItem('intakeDraft');
      if (draft) setFormData(JSON.parse(draft));
    } catch (e) {}
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      try { localStorage.setItem('intakeDraft', JSON.stringify(next)); } catch (e) {}
      return next;
    });
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const toggleGoal = (goal) => {
    const current = formData.primaryGoals || [];
    const next = current.includes(goal) ? current.filter(g => g !== goal) : [...current, goal];
    handleFieldChange('primaryGoals', next);
  };

  const handlePreferredDomainChange = (index, value) => {
    const current = formData.preferredDomains || [];
    const next = [...current];
    next[index] = value;
    handleFieldChange('preferredDomains', next.slice(0,3));
  };

  const addPreferredDomain = () => {
    const current = formData.preferredDomains || [];
    if (current.length >= 3) return;
    handleFieldChange('preferredDomains', [...current, '']);
  };

  const removePreferredDomain = (index) => {
    const current = formData.preferredDomains || [];
    const next = current.filter((_, i) => i !== index);
    handleFieldChange('preferredDomains', next);
  };

  const nextStep = () => {
    if (step === 1 && hasPaid) { // Only validate if they've paid and are seeing the form
      const required = ['businessName','industry','contactName','contactEmail','contactPhone'];
      const newErrors = {};
      required.forEach(f => {
        if (!formData[f] || String(formData[f]).trim() === '') newErrors[f] = 'Required';
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      case 1: 
        // Logic: If NOT paid, show the Stripe Button. If PAID, show the Business Basics form.
        if (!hasPaid) {
          const buyButtons = {
            'Starter': 'buy_btn_1Sz3tEQy3FAf552LOWDPRF37',
            'Growth': 'buy_btn_1Sz3ufQy3FAf552LD1pxG2gg',
            'Pro': 'buy_btn_1Sz3yiQy3FAf552L15FQdG5A'
          };

          return (
            <div className="text-center animate-fade-in">
              <h3 className="fw-bold mb-4">Step 1: Complete Your Purchase</h3>
              <p className="text-muted mb-5">Complete payment to proceed with your intake form. After payment, you'll continue with business details and project setup.</p>
              
              <script async src="https://js.stripe.com/v3/buy-button.js"></script>
              <stripe-buy-button
                buy-button-id={buyButtons[tier]}
                publishable-key="pk_live_51Sw5irQy3FAf552LxH4K1ZxjvouRpLs7gyDDBkEHks9WlHb5BXYKrNIYqYZ5GRC0nO0hUFPOe5rHWYco7lyncnU800MTcWrloj"
              ></stripe-buy-button>

              <div className="alert alert-info mt-5 text-start">
                <Info size={18} className="me-2" style={{ display: 'inline-block', verticalAlign: 'text-top' }} />
                <small>After successful payment, you'll be redirected to complete your business information and project details.</small>
              </div>
            </div>
          );
        }

        // Return from Stripe: Show the Business Basics form
        return (
          <div className="animate-fade-in">
            <h3 className="fw-bold mb-4">Step 1: Business Basics</h3>
            <div className="alert alert-success mb-4 d-flex align-items-center">
              <CheckCircle size={18} className="me-2" />
              <span>Payment confirmed! Let's get started with your business details.</span>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Business Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.businessName}
                onChange={(e) => handleFieldChange('businessName', e.target.value)}
              />
              {errors.businessName && <div className="text-danger small mt-1">{errors.businessName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">DBA (optional)</label>
              <input
                type="text"
                className="form-control"
                value={formData.dba}
                onChange={(e) => handleFieldChange('dba', e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Industry</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Legal, Retail, Tech"
                value={formData.industry}
                onChange={(e) => handleFieldChange('industry', e.target.value)}
              />
              {errors.industry && <div className="text-danger small mt-1">{errors.industry}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Primary Contact Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.contactName}
                onChange={(e) => handleFieldChange('contactName', e.target.value)}
              />
              {errors.contactName && <div className="text-danger small mt-1">{errors.contactName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.contactEmail}
                onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
              />
              {errors.contactEmail && <div className="text-danger small mt-1">{errors.contactEmail}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Phone</label>
              <input
                type="tel"
                className="form-control"
                value={formData.contactPhone}
                onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
              />
              {errors.contactPhone && <div className="text-danger small mt-1">{errors.contactPhone}</div>}
            </div>
          </div>
        );

      case 2: // Website Goals & Plan Confirmation
        return (
          <div>
            <h3 className="fw-bold mb-4">Step 2: Website Goals & Plan Confirmation</h3>
            {/* ... remaining form cases same as your previous code ... */}
            <div className="mb-3 text-start">
              <label className="form-label small fw-bold">Primary website goal (select all that apply)</label>
              <div className="mt-2">
                {['Generate leads','Increase sales','Brand awareness','Provide information','E-commerce','Other'].map(goal => (
                  <div className="form-check" key={goal}>
                    <input className="form-check-input" type="checkbox" checked={(formData.primaryGoals || []).includes(goal)} id={`goal-${goal}`} onChange={() => toggleGoal(goal)} />
                    <label className="form-check-label" htmlFor={`goal-${goal}`}>{goal}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Confirm selected plan</label>
              <input type="text" className="form-control" value={tier} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Short description of business (2–3 sentences)</label>
              <textarea className="form-control" rows={3} value={formData.shortDescription} onChange={(e) => handleFieldChange('shortDescription', e.target.value)} />
            </div>
          </div>
        );
      
      // ... Step 3, 4, 6, 12 Cases ...
      
      default:
        return <div className="py-5 text-center text-muted">Step {step} details coming soon...</div>;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          {tier && (
            <div style={{ backgroundColor: 'rgba(192, 122, 44, 0.1)', border: '2px solid var(--copper)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ color: 'var(--copper)', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{tier} Plan</h4>
                  <p style={{ color: 'var(--text-main)', margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>${planDetails[tier]?.price}</span>
                    <span style={{ color: 'var(--text-muted)' }}>/month</span>
                  </p>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>{planDetails[tier]?.features}</p>
                </div>
                <CheckCircle size={28} style={{ color: 'var(--copper)', flexShrink: 0 }} />
              </div>
            </div>
          )}

          <div className="progress mb-4" style={{ height: '8px', backgroundColor: 'var(--border-color)' }}>
            <div className="progress-bar" style={{ width: `${(step / 12) * 100}%`, backgroundColor: 'var(--copper)' }}></div>
          </div>
          
          <div className="p-5 rounded shadow-lg" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
            {renderStep()}
            
            {/* Show controls only if the user has paid OR they aren't on Step 1 (to prevent skipping payment) */}
            {step < 12 && (hasPaid || step !== 1) && (
              <div className="d-flex justify-content-between mt-5 pt-4 border-top" style={{ borderColor: 'var(--border-color)' }}>
                <button className="btn btn-link text-decoration-none" style={{ color: 'var(--text-muted)' }} onClick={prevStep} disabled={step === 1}>
                  <ChevronLeft size={18} /> Back
                </button>
                <button className="btn px-4 fw-bold" style={{ backgroundColor: 'var(--stone-blue)', color: 'white' }} onClick={nextStep}>
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeWizard;