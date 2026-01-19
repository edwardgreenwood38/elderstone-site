import { Lock } from 'lucide-react';

export default function BlankStatic() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Basic Tier Billing</h2>
      <div className="card p-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <table className="table" style={{ color: 'var(--text-main)' }}>
          <thead>
            <tr><th>Invoice</th><th>Date</th><th>Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>#001</td><td>Jan 2026</td><td>$149.00</td></tr>
            <tr style={{ opacity: 0.4 }}>
              <td><Lock size={14} /> Growth Data</td>
              <td>---</td>
              <td>Upgrade to View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}