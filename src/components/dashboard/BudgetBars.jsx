import { CATEGORIES } from "../../constants/categories";
import { formatCurrency } from "../../utils/formatCurrency";
import BudgetModal from "./BudgetModal";
import Button from "../ui/Button";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

function getStatusStyles(status) {
  if (!status) return { color: "bg-slate-200", bg: "bg-slate-100" };
  if (status.isOver) return { color: "bg-rose-500", bg: "bg-rose-100/60" };
  if (status.isWarning) return { color: "bg-amber-400", bg: "bg-amber-100/60" };
  return { color: "bg-emerald-500", bg: "bg-emerald-100/60" };
}

function BudgetBar({
  cat,
  spent,
  getBudget,
  setBudget,
  getBudgetStatus,
  currentMonth,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const budget = getBudget(cat.id, currentMonth);
  const status = getBudgetStatus(cat.id, currentMonth, spent);

  const percentage = status ? Math.min(status.percentage, 100) : 0;
  const { color: barColor, bg: barBg } = getStatusStyles(status);
  const Icon = cat.icon;

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full group text-left p-2.5 -mx-2 rounded-xl hover:bg-slate-50 transition-colors duration-200"
      >
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
            >
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-semibold text-slate-700 truncate group-hover:text-slate-900 transition-colors">
                {cat.label}
              </span>
              {status?.isOver && (
                <span className="flex-shrink-0 text-[9px] uppercase tracking-widest bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-bold">
                  Over
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end flex-shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-slate-800 tabular-nums">
                {formatCurrency(spent)}
              </span>
              {budget && (
                <span className="text-[11px] text-slate-400 font-medium tabular-nums">
                  / {formatCurrency(budget.limit)}
                </span>
              )}
            </div>
          </div>
        </div>

        {budget ? (
          <div>
            <div className={`h-1.5 ${barBg} rounded-full overflow-hidden`}>
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mt-1.5 px-0.5">
              <span>{Math.round(percentage)}% used</span>
              <span>
                {formatCurrency(Math.max(budget.limit - spent, 0))} remaining
              </span>
            </div>
          </div>
        ) : (
          <div className="h-4 border border-dashed border-slate-200 rounded-full flex items-center justify-center bg-slate-50/50 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-500 flex items-center gap-1">
              <FiPlus className="w-2.5 h-2.5" /> Set Budget
            </span>
          </div>
        )}
      </button>

      <BudgetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cat={cat}
        spent={spent}
        budget={budget}
        onSave={(val) => {
          setBudget(cat.id, currentMonth, val);
          setModalOpen(false);
        }}
      />
    </>
  );
}

export default function BudgetBars({
  transactions,
  currentMonth,
  getBudget,
  setBudget,
  getBudgetStatus,
  fullView,
  compact,
  onViewAll,
}) {
  const expensesByCategory = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = transactions
      .filter((tx) => tx.category === cat.id && tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
    return acc;
  }, {});

  const displayCategories = compact
    ? [...CATEGORIES]
        .sort(
          (a, b) =>
            (expensesByCategory[b.id] || 0) - (expensesByCategory[a.id] || 0),
        )
        .slice(0, 4)
    : CATEGORIES;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col h-full">
      
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
          {fullView ? "Monthly Budget Limits" : "Category Budgets"}
        </h3>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
          {compact ? "Your top spending areas" : "Track your spending limits per category"}
        </p>
      </div>

      <div className="flex flex-col flex-1 justify-between min-h-[160px]">
        {displayCategories.map(cat => (
          <BudgetBar
            key={cat.id}
            cat={cat}
            spent={expensesByCategory[cat.id] || 0}
            getBudget={getBudget}
            setBudget={setBudget}
            getBudgetStatus={getBudgetStatus}
            currentMonth={currentMonth}
          />
        ))}
      </div>

      {compact && onViewAll && (
        <Button
          onClick={onViewAll}
          variant="outline"
        >
          View all budgets
        </Button>
      )}
    </div>
  )
}
