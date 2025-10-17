import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form, setForm] = useState({ type:'Send Money', amount:'', recipient:'' });
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    async function fetchData(){
      const a = await fetch('/api/accounts').then(r=>r.json());
      const t = await fetch('/api/transactions').then(r=>r.json());
      const n = await fetch('/api/notifications').then(r=>r.json());
      setAccounts(a);
      setTransactions(t);
      setNotifications(n);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/payments', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(form)
    }).then(r=>r.json());
    setFormMessage(res.message);
  };

  if(loading){
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold">MyBOII</div>
        <div className="relative">
          <button onClick={()=>setDropdownOpen(!dropdownOpen)} className="px-3 py-1 bg-blue-600 text-white rounded">Menu</button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={()=>setModalOpen(true)}>Open Modal</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </header>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-lg font-semibold">{form.type}</h3>
            <form className="mt-4 space-y-3" onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Recipient" className="w-full border px-3 py-2 rounded" value={form.recipient} onChange={e=>setForm({...form, recipient:e.target.value})} required />
              <input type="number" placeholder="Amount" className="w-full border px-3 py-2 rounded" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={()=>setModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
              </div>
            </form>
            {formMessage && <p className="mt-2 text-green-600 text-sm">{formMessage}</p>}
          </div>
        </div>
      )}

      <main className="p-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold">Account Overview</h2>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">Current: €{accounts.current.toFixed(2)}</div>
              <div className="p-4 bg-gray-50 rounded">Savings: €{accounts.savings.toFixed(2)}</div>
              <div className="p-4 bg-gray-50 rounded">Credit: €{accounts.credit.toFixed(2)}</div>
            </div>
            <div className="mt-2 font-bold">Total: €{accounts.total.toFixed(2)} (+€{accounts.change.toFixed(2)})</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <table className="w-full text-sm mt-2">
              <thead className="text-gray-500 text-xs">
                <tr><th>Date</th><th>Description</th><th className="text-right">Amount</th></tr>
              </thead>
              <tbody>
                {transactions.map((tx,i)=>(
                  <tr key={i} className="border-t">
                    <td>{tx.date}</td>
                    <td>{tx.description}</td>
                    <td className="text-right">€{tx.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h4 className="text-xs text-gray-500">Notifications</h4>
            <ul className="mt-2 text-sm space-y-1">
              {notifications.map((n,i)=>(<li key={i}>{n.message}</li>))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h4 className="text-xs text-gray-500">Quick Actions</h4>
            <div className="mt-2 space-y-2">
              <button onClick={()=>{setForm({...form, type:'Send Money'}); setModalOpen(true)}} className="w-full py-2 border rounded">Send Money</button>
              <button onClick={()=>{setForm({...form, type:'Request Payment'}); setModalOpen(true)}} className="w-full py-2 border rounded">Request Payment</button>
              <button onClick={()=>{setForm({...form, type:'Open Fixed Deposit'}); setModalOpen(true)}} className="w-full py-2 border rounded">Open Fixed Deposit</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
