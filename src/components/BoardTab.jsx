import React from 'react';
import { Circle, Clock, CheckCircle2, Calendar, User } from 'lucide-react';

export default function BoardTab({ project }) {
  const todoTasks = project.subtasks.filter(t => t.status === 'todo');
  const inProgressTasks = project.subtasks.filter(t => t.status === 'in-progress');
  const doneTasks = project.subtasks.filter(t => t.status === 'completed');

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Board View</h3>
        <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-sm font-medium hover:brightness-105 transition-all">
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ==================== TO DO ==================== */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Circle className="w-5 h-5 text-gray-400" />
              <h4 className="font-semibold text-gray-900">To Do</h4>
            </div>
            <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
              {todoTasks.length}
            </span>
          </div>

          <div className="max-h-[620px] overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
            {todoTasks.map(task => (
              <div key={task.id} className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all rounded-3xl p-5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900">{task.title}</h5>
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold">
                    {task.avatar}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mt-3">
                  <User className="w-3.5 h-3.5" />
                  <span>{task.personResponsible || 'Unassigned'}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                  <Calendar className="w-3.5 h-3.5" />
                  Due {formatDate(task.endDate)}
                </div>
              </div>
            ))}

            {todoTasks.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No tasks in To Do
              </div>
            )}
          </div>
        </div>

        {/* ==================== IN PROGRESS ==================== */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-blue-50 px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">In Progress</h4>
            </div>
            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="max-h-[620px] overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
            {inProgressTasks.map(task => (
              <div key={task.id} className="bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all rounded-3xl p-5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900">{task.title}</h5>
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold">
                    {task.avatar}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mt-3">
                  <User className="w-3.5 h-3.5" />
                  <span>{task.personResponsible || 'Unassigned'}</span>
                </div>

                <div className="mt-4">
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${task.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-xs mt-1 text-gray-500">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                  <Calendar className="w-3.5 h-3.5" />
                  Due {formatDate(task.endDate)}
                </div>
              </div>
            ))}

            {inProgressTasks.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No tasks in progress
              </div>
            )}
          </div>
        </div>

        {/* ==================== DONE ==================== */}
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-green-50 px-6 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Done</h4>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
              {doneTasks.length}
            </span>
          </div>

          <div className="max-h-[620px] overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300">
            {doneTasks.map(task => (
              <div key={task.id} className="bg-white border border-green-100 hover:border-green-300 hover:shadow-md transition-all rounded-3xl p-5">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900 line-through opacity-75">{task.title}</h5>
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold">
                    {task.avatar}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-green-600 mt-4">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                </div>
              </div>
            ))}

            {doneTasks.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No completed tasks yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}