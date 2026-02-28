import React, { useState } from 'react';
import { 
  Brain, 
  History, 
  Link as LinkIcon, 
  ArrowRight, 
  User, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Circle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

// Historical data (unchanged)
const historicalTaskData = [
  { taskType: 'requirements gathering', avgDays: 4, projects: 5, lastDuration: [3,4,5,4,4] },
  { taskType: 'content strategy', avgDays: 5, projects: 8, lastDuration: [4,5,6,5,5,5,4,6] },
  { taskType: 'ui design', avgDays: 7, projects: 6, lastDuration: [6,8,7,7,6,8] },
  { taskType: 'api integration', avgDays: 6, projects: 4, lastDuration: [5,7,6,6] },
  { taskType: 'analytics setup', avgDays: 3, projects: 5, lastDuration: [3,4,3,3,2] },
  { taskType: 'testing', avgDays: 4, projects: 7, lastDuration: [3,5,4,4,4,3,5] },
  { taskType: 'deployment', avgDays: 2, projects: 9, lastDuration: [2,2,3,2,2,1,2,2,3] },
  { taskType: 'landing page', avgDays: 5, projects: 4, lastDuration: [4,5,6,5] },
  { taskType: 'wireframe', avgDays: 3, projects: 6, lastDuration: [2,3,4,3,3,3] },
];

function TasksTab({ project }) {
  if (!project || !project.subtasks) return <div className="p-8 text-center text-gray-500">No tasks found</div>;

  const [showAISubtask, setShowAISubtask] = useState(false);
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [aiEstimateResult, setAiEstimateResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedParents, setExpandedParents] = useState({});

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Group into parents and children
  const groupedTasks = React.useMemo(() => {
    const parents = [];
    const childrenMap = {};

    project.subtasks.forEach(task => {
      if (task.title.includes('-')) {
        const parentCode = task.title.split('-')[0];
        if (!childrenMap[parentCode]) childrenMap[parentCode] = [];
        childrenMap[parentCode].push(task);
      } else {
        parents.push(task);
      }
    });

    return parents.map(parent => ({
      ...parent,
      children: childrenMap[parent.title] || []
    }));
  }, [project.subtasks]);

  const toggleParent = (parentId) => {
    setExpandedParents(prev => ({
      ...prev,
      [parentId]: !prev[parentId]
    }));
  };

  const estimateFromHistory = (description) => {
    const lower = description.toLowerCase();
    const match = historicalTaskData.find(h => 
      lower.includes(h.taskType) || h.taskType.split(' ').some(w => lower.includes(w))
    );
    if (match) {
      return {
        taskType: match.taskType,
        estimatedDays: match.avgDays,
        estimatedHours: match.avgDays * 8,
        confidence: 'High',
        basedOn: match.projects,
        history: match.lastDuration,
        suggestedBudget: match.avgDays * 8 * 75,
      };
    }
    return { taskType: 'General Task', estimatedDays: 3, estimatedHours: 24, confidence: 'Medium', basedOn: 0, history: [], suggestedBudget: 1800 };
  };

  const handleGenerateTask = () => {
    if (!newTaskDesc.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setAiEstimateResult(estimateFromHistory(newTaskDesc));
      setIsGenerating(false);
    }, 1400);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Circle className="w-5 h-5 text-zinc-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Task Generator */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">AI Task Generator</h4>
              <p className="text-sm text-purple-600">Learns from history</p>
            </div>
          </div>
          <button 
            onClick={() => { setShowAISubtask(!showAISubtask); setAiEstimateResult(null); setNewTaskDesc(''); }}
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:brightness-105 transition"
          >
            {showAISubtask ? 'Hide' : '+ Create Task'}
          </button>
        </div>

        {showAISubtask && (
          <div className="mt-4 space-y-4">
            <textarea 
              value={newTaskDesc} 
              onChange={e => { setNewTaskDesc(e.target.value); setAiEstimateResult(null); }}
              placeholder="e.g., Create landing page wireframes..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500" 
              rows="3" 
            />
            <div className="flex gap-3">
              <button 
                onClick={handleGenerateTask} 
                disabled={isGenerating || !newTaskDesc.trim()} 
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? "Analyzing..." : "Estimate with AI"}
              </button>
              <button 
                onClick={() => { setShowAISubtask(false); setAiEstimateResult(null); setNewTaskDesc(''); }} 
                className="px-6 py-3 border border-gray-300 rounded-2xl text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Task Dependency Chain */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <LinkIcon className="w-5 h-5 text-amber-600" />
          <span className="font-semibold text-amber-800">Task Dependency Chain</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {project.subtasks.map((task, idx) => (
            <React.Fragment key={task.id}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-medium ${
                task.status === 'completed' ? 'bg-emerald-100 border-emerald-300 text-emerald-700' :
                task.status === 'in-progress' ? 'bg-blue-100 border-blue-300 text-blue-700' :
                'bg-white border-gray-300 text-gray-600'
              }`}>
                {getStatusIcon(task.status)}
                {task.title}
              </div>
              {idx < project.subtasks.length - 1 && <ArrowRight className="w-4 h-4 text-amber-400" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ==================== SCROLLABLE HIERARCHICAL TASK LIST ==================== */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            All Tasks 
            <span className="text-sm font-normal text-gray-500">({project.subtasks.length})</span>
          </h3>
          <div className="text-xs text-gray-500">Scroll for more ↓</div>
        </div>

        {/* SCROLLABLE CONTAINER */}
        <div className="max-h-[620px] overflow-y-auto pr-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
          {groupedTasks.map(parent => {
            const isExpanded = expandedParents[parent.id] !== false;
            const hasChildren = parent.children.length > 0;

            return (
              <div key={parent.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                {/* Parent Task - Full Detail */}
                <div 
                  onClick={() => hasChildren && toggleParent(parent.id)}
                  className="px-6 py-5 border-b hover:bg-gray-50 cursor-pointer transition-all flex items-start gap-4"
                >
                  <div className="mt-1">
                    {getStatusIcon(parent.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">{parent.title}</h4>
                      <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm">
                        {parent.avatar}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1"><User className="w-4 h-4" />{parent.personResponsible || 'Unassigned'}</span>
                      <span>•</span>
                      <span>Due {formatDate(parent.endDate)}</span>
                    </div>

                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${parent.progress}%` }} />
                    </div>

                    <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-2xl px-5 py-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="font-medium">Budget</span>
                      </div>
                      <div className="font-semibold text-emerald-700">
                        {project.currency || 'EUR'} {parent.expense.toLocaleString('en-US', {minimumFractionDigits: 2})}
                      </div>
                    </div>

                    {parent.budgets?.length > 0 && (
                      <div className="mt-3 text-xs text-gray-600">
                        Budget Lines: {parent.budgets.map(b => 
                          b.lines.map(l => `${l.description} (${l.amount})`).join(' • ')
                        )}
                      </div>
                    )}
                  </div>

                  {hasChildren && (
                    isExpanded ? <ChevronDown className="w-6 h-6 text-gray-400 mt-2" /> : <ChevronRight className="w-6 h-6 text-gray-400 mt-2" />
                  )}
                </div>

                {/* Subtasks */}
                {hasChildren && isExpanded && (
                  <div className="pl-12 pr-6 py-4 bg-gray-50 space-y-3">
                    {parent.children.map(sub => (
                      <div key={sub.id} className="bg-white border border-gray-100 rounded-3xl p-5">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            {getStatusIcon(sub.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-semibold text-gray-900">{sub.title}</h5>
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold">
                                {sub.avatar}
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{sub.personResponsible || 'Unassigned'}</span>
                              <span>•</span>
                              <span>Due {formatDate(sub.endDate)}</span>
                            </div>

                            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${sub.progress}%` }} />
                            </div>

                            <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-2.5 text-sm">
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-emerald-600" />
                                <span className="font-medium">Budget</span>
                              </div>
                              <div className="font-semibold text-emerald-700">
                                {project.currency || 'EUR'} {sub.expense.toLocaleString('en-US', {minimumFractionDigits: 2})}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TasksTab;