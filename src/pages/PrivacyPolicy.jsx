import React from 'react';
import useSEO from '../hooks/useSEO';

const PrivacyPolicy = ({ tier }) => {
  useSEO({
    title: 'Privacy Policy',
    description: 'Privacy Policy for Elderstone Digital Solutions, LLC. Learn how we collect, use, and protect your data.',
    tier: tier
  });

  const effectiveDate = "January 12, 2026"; 

  return (
    <div className="container py-5">
      {/* Restored default row alignment (left) */}
      <div className="row">
        <div className="col-lg-10 col-xl-8">
          <div 
            className="p-5 rounded shadow-sm" 
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              textAlign: 'left' // Explicitly set to left/default
            }}
          >
            <h1 className="display-5 fw-bold mb-2" style={{ color: 'var(--stone-blue)' }}>
              Privacy Policy
            </h1>
            <p className="text-muted mb-5">
              <strong>Elderstone Digital Solutions, LLC</strong> <br />
              Effective Date: {effectiveDate}
            </p>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>1. Introduction</h3>
              <p>
                Elderstone Digital Solutions, LLC (“Company,” “we,” “us,” or “our”) respects your privacy and is committed to protecting it through this Privacy Policy. 
                This policy describes how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>2. Information We Collect</h3>
              <div className="ms-3"> {/* Restored margin-start (ms) for left-side indentation */}
                <h5 className="fw-bold">a. Personal Information</h5>
                <p>Information you voluntarily provide, including but not limited to: Name, Email address, Phone number, Business name, and Billing/payment information (processed through third-party providers).</p>
                
                <h5 className="fw-bold">b. Automatically Collected Information</h5>
                <p>When you access our website, we may automatically collect: IP address, Browser type, Device information, Pages visited, and Referring URLs. This data is used for analytics, security, and performance optimization.</p>
              </div>
            </section>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>3. How We Use Your Information</h3>
              <ul className="mb-0">
                <li>Provide and manage our services</li>
                <li>Respond to inquiries and support requests</li>
                <li>Process payments and subscriptions</li>
                <li>Improve website functionality and performance</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>4. Cookies and Tracking</h3>
              <p>
                We use cookies and similar technologies to analyze traffic and improve user experience. You may disable cookies through your browser settings, though some site features may not function properly.
              </p>
            </section>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>5. Third-Party Services</h3>
              <p>
                We share information with trusted providers (e.g., Stripe, Google Analytics, hosting providers) only as necessary to operate our business and provide services to you.
              </p>
            </section>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>6. Data Security</h3>
              <p>
                We implement technical and physical security measures designed to protect your information. However, no method of electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-4">
              <h3 className="h4 fw-bold" style={{ color: 'var(--copper)' }}>11. Contact Information</h3>
              <p>
                If you have questions about this Privacy Policy, please contact:<br />
                <strong>Elderstone Digital Solutions, LLC</strong><br />
                Email: <a href="mailto:info@elderstonedigital.com" style={{ color: 'var(--copper)' }}>info@elderstonedigital.com</a><br />
                Website: <a href="https://elderstonedigital.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--copper)' }}>elderstonedigital.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;