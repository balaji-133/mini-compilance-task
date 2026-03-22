import { Building2, Globe2 } from 'lucide-react';

export default function Sidebar({ clients, selectedClient, onSelectClient, loading }) {
  if (loading) {
    return (
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col pt-6 px-4 shrink-0">
        <div className="h-6 w-3/4 bg-zinc-200 animate-pulse rounded mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-zinc-100 animate-pulse rounded-xl" />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col shrink-0 z-20 shadow-sm relative pt-4">
      <div className="px-6 mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900">Clients</h2>
        <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
          {clients.length} Total
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
        {clients.map(client => {
          const isSelected = selectedClient?._id === client._id;
          
          return (
            <button
              key={client._id}
              onClick={() => onSelectClient(client)}
              className={`w-full text-left p-4 rounded-xl transition-all border ${
                isSelected 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : 'bg-white border-transparent hover:border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 p-2 rounded-lg ${isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-100 text-zinc-500'}`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${isSelected ? 'text-indigo-900' : 'text-zinc-800'}`}>
                    {client.companyName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Globe2 className="w-3 h-3" />
                      {client.country}
                    </span>
                    <span>•</span>
                    <span>{client.entityType}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
