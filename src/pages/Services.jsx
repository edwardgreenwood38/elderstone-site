import React from 'react';
import { Shield, Zap, Server, Database, Wrench, TrendingUp } from 'lucide-react';

const Services = ({ darkMode, setDarkMode}) => {
  const serviceList = [
    { icon: <Shield />, 
      title: "Security & Uptime Protection", 
      desc: "Firewall hardening, malware detection, SSL automation & proactive uptime monitoring." },

    { icon: <Zap />, 
      title: "Performance Engineering", 
      desc: "Global CDN, speed tuning, core web vitals optimization, and performance audits." },

    { icon: <Server />, 
      title: "Managed Web Infrastructure", 
      desc: "Cloud hosting, environment provisioning, scaling support, and 99.9% uptime assurance." },

    { icon: <Database />, 
      title: "Database & Backend Management", 
      desc: "Secure PostgreSQL provisioning, maintenance, backups and API process orchestration." },

    { icon: <Wrench />, 
      title: "Continuous Deployment & Automation", 
      desc: "Automated builds, PM2 orchestration, Nginx reverse proxy configs, and zero-downtime updates." },

    { icon: <TrendingUp />, 
      title: "Growth & Digital Strategy", 
      desc: "Monthly strategy syncs, analytics reporting, growth planning, and conversion optimization." }
  ];

  return (
    <div className="container py-5">
      <h2 className="display-5 fw-bold text-center mb-5">Our Core Solutions</h2>
      <div className="row g-4">
        {serviceList.map((service, idx) => (
          <div className="col-md-6" key={idx}>
            <div className="d-flex p-4 rounded shadow-sm" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="me-4" style={{ color: 'var(--stone-blue)' }}>{service.icon}</div>
              <div>
                <h4 className="fw-bold">{service.title}</h4>
                <p className="mb-0" style={{ color: 'var(--text-main)', opacity: 0.7 }}>{service.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;