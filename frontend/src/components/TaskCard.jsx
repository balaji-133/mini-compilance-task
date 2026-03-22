import { format, isPast, isToday, startOfDay } from 'date-fns';
import { AlertCircle, CalendarClock, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function TaskCard({ task, onStatusToggle }) {
  const dueDate = new Date(task.dueDate);
  // Compare without time to prevent today being marked as overdue if it's 5 PM
  const isOverdue = task.status === 'Pending' && dueDate < startOfDay(new Date());

  return (
    <div className={cn(
      "group relative p-5 rounded-2xl border transition-all duration-300",
      "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
      isOverdue 
        ? "bg-red-50/50 border-red-200 hover:border-red-300" 
        : "bg-white border-zinc-200 hover:border-indigo-200"
    )}>
      
      {/* Overdue Badge */}
      {isOverdue && (
        <div className="absolute -top-3 right-6 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
          <AlertCircle className="w-3.5 h-3.5" />
          Overdue
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={cn(
              "text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase",
              {
                'bg-blue-100 text-blue-700': task.category === 'Tax',
                'bg-violet-100 text-violet-700': task.category === 'Legal',
                'bg-emerald-100 text-emerald-700': task.category === 'Audit',
                'bg-amber-100 text-amber-700': task.category === 'Filing',
                'bg-zinc-100 text-zinc-700': task.category === 'Other',
              }
            )}>
              {task.category}
            </span>
            <span className={cn(
               "text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase",
               {
                 'bg-zinc-100 text-zinc-600': task.priority === 'Low',
                 'bg-orange-100 text-orange-700': task.priority === 'Medium',
                 'bg-red-100 text-red-700': task.priority === 'High',
               }
            )}>
               {task.priority} Priority
            </span>
          </div>
          
          <h3 className={cn(
            "text-lg font-bold text-zinc-900 mb-2 leading-tight",
            task.status === 'Completed' && "line-through text-zinc-400"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className={cn(
              "flex items-center gap-1.5",
              isOverdue ? "text-red-600 font-semibold" : "text-zinc-500"
            )}>
              <CalendarClock className="w-4 h-4" />
              Due {format(dueDate, 'MMM d, yyyy')}
            </div>
            
            <div className={cn(
              "flex items-center gap-1.5",
              task.status === 'Completed' ? "text-emerald-600" : "text-amber-600"
            )}>
              {task.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              {task.status}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
           <button 
             onClick={() => onStatusToggle(task)}
             className={cn(
               "h-10 px-4 rounded-xl text-sm font-semibold transition-all border shadow-sm",
               task.status === 'Completed'
                 ? "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                 : "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:shadow-md"
             )}
           >
             {task.status === 'Completed' ? 'Reopen Task' : 'Mark Complete'}
           </button>
        </div>
      </div>
    </div>
  );
}
