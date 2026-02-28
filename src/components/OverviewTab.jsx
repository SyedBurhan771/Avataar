import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

export default function OverviewTab({ project, onViewTasks }) {
  // Ongoing tasks (same logic as your original design)
  const ongoingTasks = project.subtasks?.filter(t => t.status === 'in-progress') || [];
  const displayedTasks = ongoingTasks.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Status / Progress / Health Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Status</p>
          <p className="text-lg font-bold text-blue-700">{project.status}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-gray-600 mb-1">Progress</p>
          <p className="text-lg font-bold text-purple-700">{project.progress}%</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600 mb-1">Health</p>
          <p className="text-lg font-bold text-green-700 capitalize">{project.health}</p>
        </div>
      </div>

      {/* Team Members */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Team Members</h3>
        <div className="flex gap-2 flex-wrap">
          {project.team?.map((member, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {member.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-sm text-gray-900">{member.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Ongoing Tasks ({ongoingTasks.length})
          </h3>

          {ongoingTasks.length > 3 && onViewTasks && (
            <button
              onClick={onViewTasks}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View More
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {displayedTasks.length > 0 ? (
          <div className="space-y-2">
            {displayedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {task.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <span>{task.assignee}</span>
                      <span>•</span>
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${(task.timeSpent / task.estimatedTime) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-blue-700">
                        {Math.round((task.timeSpent / task.estimatedTime) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-sm text-gray-600">No ongoing tasks at the moment</p>
          </div>
        )}
      </div>

      {/* Budget Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Budget</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Spent</span>
              <span className="text-sm font-bold text-gray-900">
                ${project.budget?.spent.toLocaleString()} / ${project.budget?.total.toLocaleString()}
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{
                  width: `${(project.budget?.spent / project.budget?.total) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}