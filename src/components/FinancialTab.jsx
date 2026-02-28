import React from 'react';
import { DollarSign, Clock, Banknote, Receipt } from 'lucide-react';

function FinancialTab({ project }) {
  if (!project || !project.subtasks) return null;

  // Real aggregation from subtasks
  const totalCosts = project.subtasks.reduce((sum, t) => sum + t.expense, 0);
  const budgetedCosts = project.subtasks.reduce((sum, t) => sum + t.budgetedExpense, 0);
  const revenues = project.totalBudget || budgetedCosts * 1.5; // use real if available
  const invoiced = revenues * 0.62; // placeholder
  const toInvoice = revenues - invoiced;
  const margin = revenues - totalCosts;
  const marginPct = revenues > 0 ? ((margin / revenues) * 100).toFixed(0) : 0;

  return (
    <div className="space-y-6">
      {/* Sage X3 Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg w-fit">
        <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-black">X3</span>
        </div>
        <span className="text-sm font-semibold text-indigo-700">Sage X3 — Financial Status Tab</span>
      </div>

      {/* Revenues & Costs */}
      <div className="bg-white rounded-lg border-2 border-indigo-100 overflow-hidden">
        <div className="bg-indigo-600 px-4 py-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Banknote className="w-4 h-4" />Revenues & Costs
          </h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1 font-semibold uppercase tracking-wide">Revenues</p>
              <p className="text-xl font-bold text-green-700">{project.currency || 'EUR'} {revenues.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1 font-semibold uppercase tracking-wide">Invoiced</p>
              <p className="text-xl font-bold text-blue-700">{project.currency || 'EUR'} {invoiced.toLocaleString()}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1 font-semibold uppercase tracking-wide">To Invoice</p>
              <p className="text-xl font-bold text-orange-700">{project.currency || 'EUR'} {toInvoice.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Time Spent
                </span>
                <span className="text-sm font-bold text-blue-700">
                  {project.timeSpent}h / {project.estimatedTime}h
                </span>
              </div>
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min((project.timeSpent / project.estimatedTime) * 100, 100)}%` }} />
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-green-900 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Budget
                </span>
                <span className="text-sm font-bold text-green-700">
                  {project.currency || 'EUR'} {totalCosts.toLocaleString()} / {project.currency || 'EUR'} {budgetedCosts.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min((totalCosts / budgetedCosts) * 100, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Margin Summary */}
      {/* <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Receipt className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Margin Summary</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">Gross Margin</p>
            <p className="text-3xl font-bold text-purple-700">{project.currency || 'EUR'} {margin.toLocaleString()}</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">Margin %</p>
            <p className="text-3xl font-bold text-indigo-700">{marginPct}%</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default FinancialTab;