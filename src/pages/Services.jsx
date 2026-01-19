import React from 'react';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const Services = ({ darkMode, setDarkMode}) => {
  const serviceList = [
    { icon: <Shield />, title: "Security Hardening", desc: "Firewall management, malware scanning, and SSL certificate maintenance." },
    { icon: <Zap />, title: "Speed Optimization", desc: "Global CDN integration and core web vitals performance tuning." },
    { icon: <Globe />, title: "Managed Hosting", desc: "Cloud-based infrastructure with 99.9% uptime guarantees." },
    { icon: <Cpu />, title: "Digital Strategy", desc: "Monthly strategy check-ins to align technology with your business goals." }
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