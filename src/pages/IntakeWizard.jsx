import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Info, Upload, Globe, Shield } from 'lucide-react';

const IntakeWizard = ({ tier, darkMode, setDarkMode, setTier }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme');
    const tierParam = params.get('tier');
    if (themeParam === 'dark') {
      setDarkMode(true);
    } else if (themeParam === 'light') {
      setDarkMode(false);
    }
    if (tierParam) {
      setTier(decodeURIComponent(tierParam));
    }
  }, [setDarkMode, setTier]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '', dba: '', industry: '', ownDomain: 'not-sure', 
    hasWebsite: 'no', pageCount: 1, videoInclude: 'no',
    contactName: '', contactEmail: '', contactPhone: '',
    primaryGoals: [], shortDescription: '',
    // domain fields
    domainName: '', registrar: '', dnsAccess: '', preferredDomains: [],
    // existing website fields
    currentWebsiteUrl: '', currentHost: '', authorizeReplace: false
  });
  
  const [errors, setErrors] = useState({});

  // Load any autosaved draft
  useEffect(() => {
    try {
      const draft = localStorage.getItem('intakeDraft');
      if (draft) setFormData(JSON.parse(draft));
    } catch (e) {
      // ignore
    }
  }, []);

  const handleFieldChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      try { localStorage.setItem('intakeDraft', JSON.stringify(next)); } catch (e) {}
      return next;
    });
    // clear field error
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
    // Validate required fields on step 1
    if (step === 1) {
      const required = ['businessName','industry','contactName','contactEmail','contactPhone'];
      const newErrors = {};
      required.forEach(f => {
        if (!formData[f] || String(formData[f]).trim() === '') newErrors[f] = 'Required';
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return; // prevent advancing
      }
    }
    setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      case 1: // Business Basics
        return (
          <div className="animate-fade-in">
            <h3 className="fw-bold mb-4">Step 1: Business Basics</h3>

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
      case 3: // Domain Handling
        return (
          <div>
            <h3 className="fw-bold mb-4">Step 3: Domain Handling</h3>
            <p className="small text-muted mb-4">Do you already own a domain name?</p>
            {['yes', 'no', 'not-sure'].map(opt => (
              <div key={opt} className={`p-3 mb-2 rounded border cursor-pointer ${formData.ownDomain === opt ? 'border-primary' : ''}`} 
                   onClick={() => handleFieldChange('ownDomain', opt)}
                   style={{ backgroundColor: 'var(--bg-card)', borderColor: formData.ownDomain === opt ? 'var(--copper)' : 'var(--border-color)' }}>
                <span className="text-capitalize">{opt.replace('-', ' ')}</span>
              </div>
            ))}

            {formData.ownDomain === 'yes' && (
              <div className="mt-3">
                <div className="mb-3">
                  <label className="form-label small fw-bold">Domain name</label>
                  <input type="text" className="form-control" value={formData.domainName} onChange={(e) => handleFieldChange('domainName', e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Registrar</label>
                  <input type="text" className="form-control" value={formData.registrar} onChange={(e) => handleFieldChange('registrar', e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">DNS access preference</label>
                  <select className="form-select" value={formData.dnsAccess} onChange={(e) => handleFieldChange('dnsAccess', e.target.value)}>
                    <option value="">Select…</option>
                    <option value="i-manage-dns">I manage DNS myself</option>
                    <option value="give-access-registrar">I can give access to my registrar</option>
                    <option value="need-help">I need help with DNS</option>
                  </select>
                </div>
              </div>
            )}

            {(formData.ownDomain === 'no' || formData.ownDomain === 'not-sure') && (
              <div className="mt-3">
                <div className="alert alert-info d-flex align-items-center">
                  <Info size={18} className="me-2" />
                  <small>We’ll help you choose and set this up. The domain will always belong to you.</small>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label small fw-bold">Preferred domain names (optional, up to 3)</label>
                  {(formData.preferredDomains || []).map((d, i) => (
                    <div className="input-group mb-2" key={i}>
                      <input type="text" className="form-control" placeholder={`example${i+1}.com`} value={d} onChange={(e) => handlePreferredDomainChange(i, e.target.value)} />
                      <button className="btn btn-outline-secondary" type="button" onClick={() => removePreferredDomain(i)}>Remove</button>
                    </div>
                  ))}
                  <div>
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={addPreferredDomain} disabled={(formData.preferredDomains || []).length >= 3}>Add preferred domain</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        );
      case 4: // Existing Website (Conditional)
        return (
          <div>
                <h3 className="fw-bold mb-4">Step 4: Existing Website (Conditional)</h3>

                <p className="small text-muted mb-3">Do you currently have a website?</p>
                {['no', 'yes'].map(opt => (
                    <div key={opt} className={`p-3 mb-2 rounded border cursor-pointer ${String(formData.hasWebsite) === opt ? 'border-primary' : ''}`} 
                        onClick={() => handleFieldChange('hasWebsite', opt)}
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: String(formData.hasWebsite) === opt ? 'var(--copper)' : 'var(--border-color)' }}>
                    <span className="text-capitalize">{opt === 'no' ? 'No (new site)' : 'Yes (redesign / migration)'}</span>
                    </div>
                ))}

                {formData.hasWebsite === 'yes' && (
                    <div className="mt-3">
                    <div className="mb-3">
                        <label className="form-label small fw-bold">Current URL</label>
                        <input type="url" className="form-control" value={formData.currentWebsiteUrl} onChange={(e) => handleFieldChange('currentWebsiteUrl', e.target.value)} placeholder="https://example.com" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-bold">Current host (optional)</label>
                        <input type="text" className="form-control" value={formData.currentHost} onChange={(e) => handleFieldChange('currentHost', e.target.value)} placeholder="e.g. WP Engine, Netlify, DigitalOcean" />
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="authorizeReplace" checked={!!formData.authorizeReplace} onChange={(e) => handleFieldChange('authorizeReplace', e.target.checked)} />
                        <label className="form-check-label" htmlFor="authorizeReplace">I authorize Elderstone to replace or migrate this site if needed</label>
                    </div>
                    </div>
                )}
                </div>
    );
      case 6: // Page Selection & Structure
        const pageLimit = tier === 'Starter' ? 5 : tier === 'Growth' ? 15 : 50;
        return (
          <div>
            <h3 className="fw-bold mb-4">Step 6: Page Structure</h3>
            <label className="form-label">Approximate total page count:</label>
            <input type="number" className="form-control mb-3" value={formData.pageCount} onChange={(e) => setFormData({...formData, pageCount: e.target.value})} />
            {formData.pageCount > pageLimit && (
              <div className="p-3 rounded mb-3" style={{ backgroundColor: 'rgba(192, 122, 44, 0.1)', border: '1px solid var(--copper)' }}>
                <small style={{ color: 'var(--copper)' }}>
                  <strong>Notice:</strong> Your {tier} plan includes up to {pageLimit} pages. Additional pages are available.
                </small>
              </div>
            )}
          </div>
        );
      case 12: // Review & Confirmation
        return (
          <div className="text-center">
            <CheckCircle size={64} className="mb-4" style={{ color: 'var(--copper)' }} />
            <h3 className="fw-bold">Ready to Build?</h3>
            <p className="text-muted mb-4">Review your details and submit to begin the provisioning process.</p>
            <div className="text-start p-4 rounded mb-4" style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-color)' }}>
              <div className="small mb-2"><strong>Plan:</strong> {tier}</div>
              <div className="small mb-2"><strong>Business:</strong> {formData.businessName || 'Not Set'}</div>
              <div className="small"><strong>Domain Status:</strong> {formData.ownDomain}</div>
            </div>
            <button className="btn btn-lg w-100 fw-bold" style={{ backgroundColor: 'var(--stone-blue)', color: 'white' }}>
              Submit & Begin Setup
            </button>
          </div>
        );
      default:
        return <div className="py-5 text-center text-muted">Step {step} details coming soon...</div>;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          {/* Progress Bar */}
          <div className="progress mb-4" style={{ height: '8px', backgroundColor: 'var(--border-color)' }}>
            <div className="progress-bar" style={{ width: `${(step / 12) * 100}%`, backgroundColor: 'var(--copper)' }}></div>
          </div>
          
          <div className="p-5 rounded shadow-lg" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
            {renderStep()}
            
            {step < 12 && (
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
