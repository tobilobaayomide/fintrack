import { useEffect, useState } from "react"
import { formatCurrency } from "../../utils/formatCurrency"
import { FiTrendingUp, FiTrendingDown, FiActivity } from "react-icons/fi"

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start = 0
    const step = Math.abs(target) / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= Math.abs(target)) {
        setValue(Math.abs(target))
        clearInterval(timer)
      } else {
        setValue(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return value
}

function Card({ label, amount, icon, iconColor, iconBg, badgeText, amountColor }) {
  const animated = useCountUp(Math.abs(amount))

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-200">
      
      <div className="flex items-start justify-between">
        <div className="mt-1">
          <h3 className="text-sm font-semibold text-slate-600 tracking-tight">
            {label}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">This month</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}>
          {icon}
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200/80" />

      <div className="flex items-end justify-between">
        <p className={`text-[28px] leading-none font-bold tracking-tight tabular-nums ${amountColor}`}>
          {amount < 0 ? "-" : ""}{formatCurrency(animated)}
        </p>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${iconBg} ${iconColor}`}>
          {badgeText}
        </span>
      </div>
      
    </div>
  )
}

export default function SummaryCards({ totals }) {
  const isNetPositive = totals.net >= 0
  const netColor = isNetPositive ? "text-blue-600" : "text-rose-600"
  const netBg = isNetPositive ? "bg-blue-50" : "bg-rose-50"
  
  const netBadgeText = totals.net > 0 ? "Surplus" : totals.net < 0 ? "Deficit" : "Breakeven"

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Card
        label="Total Income"
        amount={totals.income}
        icon={<FiTrendingUp className="w-5 h-5" />}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-50"
        amountColor="text-slate-900"
        badgeText="+ Inflow"
      />
      <Card
        label="Total Expenses"
        amount={totals.expenses}
        icon={<FiTrendingDown className="w-5 h-5" />}
        iconColor="text-rose-600"
        iconBg="bg-rose-50"
        amountColor="text-slate-900"
        badgeText="- Outflow"
      />
      <Card
        label="Net Balance"
        amount={totals.net}
        icon={<FiActivity className="w-5 h-5" />}
        iconColor={netColor}
        iconBg={netBg}
        amountColor={isNetPositive ? "text-slate-900" : "text-rose-600"}
        badgeText={netBadgeText}
      />
    </div>
  )
}