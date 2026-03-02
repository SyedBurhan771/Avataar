import React from 'react';
import { DollarSign, Banknote } from 'lucide-react';

function FinancialTab({ project }) {
  if (!project || !project.subtasks) return null;

  const totalCosts = project.subtasks.reduce((sum, t) => sum + t.expense, 0);
  const budgetedCosts = project.subtasks.reduce((sum, t) => sum + t.budgetedExpense, 0);
  const revenues = project.totalBudget || budgetedCosts * 1.5;
  const invoiced = revenues * 0.62;
  const toInvoice = revenues - invoiced;

  return (
    <div className="space-y-6">
      {/* Sage X3 Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg w-fit">
        <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
          <span className="text-white text-xs font-black">X3</span>
        </div>
        <span className="text-sm font-semibold text-indigo-700">
          Sage X3 — Financial Status Tab
        </span>
      </div>

      {/* Revenues & Costs */}
      <div className="bg-white rounded-lg border-2 border-indigo-100 overflow-hidden">
        <div className="bg-indigo-600 px-4 py-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Banknote className="w-4 h-4" /> Revenues & Costs
          </h3>
        </div>

        <div className="p-4 space-y-4">
          {/* Top cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1 font-semibold uppercase">
                Revenues
              </p>
              <p className="text-xl font-bold text-green-700">
                {project.currency || 'EUR'} {revenues.toLocaleString()}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1 font-semibold uppercase">
                Invoiced
              </p>
              <p className="text-xl font-bold text-blue-700">
                {project.currency || 'EUR'} {invoiced.toLocaleString()}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1 font-semibold uppercase">
                To Invoice
              </p>
              <p className="text-xl font-bold text-orange-700">
                {project.currency || 'EUR'} {toInvoice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* ✅ Budget – FULL WIDTH */}
          <div className="grid grid-cols-3">
            <div className="col-span-3 p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-green-900 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> Budget
                </span>
                <span className="text-sm font-bold text-green-700">
                  {project.currency || 'EUR'} {totalCosts.toLocaleString()} /{' '}
                  {project.currency || 'EUR'} {budgetedCosts.toLocaleString()}
                </span>
              </div>

              <div className="h-2 w-full bg-green-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{
                    width: `${Math.min(
                      (totalCosts / budgetedCosts) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialTab;