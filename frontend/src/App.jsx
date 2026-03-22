import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import { LayoutDashboard } from 'lucide-react';

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      const res = await fetch(`${API_URL}/api/clients`);
      const data = await res.json();
      setClients(data);
      if (data.length > 0) {
        setSelectedClient(data[0]);
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden font-sans text-zinc-900 border-x border-zinc-200">
      <Sidebar 
        clients={clients} 
        selectedClient={selectedClient} 
        onSelectClient={setSelectedClient} 
        loading={loading}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.02)] z-10">
        <header className="h-16 border-b border-zinc-200 bg-white flex items-center px-8 shrink-0 justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-indigo-600" />
            <h1 className="font-semibold text-lg text-zinc-800">Compliance Tasks</h1>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto relative">
          {selectedClient ? (
            <TaskList client={selectedClient} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-500">
              <p>Please select a client from the sidebar</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
