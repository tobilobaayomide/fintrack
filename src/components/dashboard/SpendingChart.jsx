import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { groupByCategory } from "../../utils/groupByCategory"
import { formatCurrency } from "../../utils/formatCurrency"
import { CATEGORIES } from "../../constants/categories"
import EmptyState from "../ui/EmptyState"
import { FiPieChart } from "react-icons/fi"

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const total = payload[0].payload.total
    const grandTotal = payload[0].payload.grandTotal
    const pct = grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) : 0
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-200/80 flex flex-col gap-1.5 min-w-[140px]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: data.color }} />
          <p className="text-xs font-semibold text-slate-600 tracking-tight">{data.name}</p>
        </div>
        <div className="flex items-end justify-between mt-1">
          <p className="text-base font-bold text-slate-900 tabular-nums leading-none">{formatCurrency(total)}</p>
          <p className="text-[11px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{pct}%</p>
        </div>
      </div>
    )
  }
  return null
}

export default function SpendingChart({ transactions }) {
  const rawData = groupByCategory(transactions)
  const totalSpent = rawData.reduce((sum, item) => sum + item.total, 0)
  const data = rawData.map(item => ({ ...item, grandTotal: totalSpent }))
  const sortedData = [...data].sort((a, b) => b.total - a.total)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-slate-800 tracking-tight">Spending Breakdown</h3>
        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Where your money went this month</p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col justify-center flex-1 py-6">
          <EmptyState
            icon={<FiPieChart className="w-7 h-7 text-slate-300" />}
            title="No spending yet"
            description="Add expenses to see your breakdown."
          />
        </div>
      ) : (
        <div className="flex flex-col flex-1 pb-1">
          {/* Donut Chart */}
          <div className="relative flex items-center justify-center mb-4 mt-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={64}
                  outerRadius={86}
                  paddingAngle={3}
                  dataKey="total"
                  animationBegin={0}
                  animationDuration={800}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total</span>
              <span className="text-[22px] leading-none font-bold text-slate-900 tracking-tight tabular-nums">
                {formatCurrency(totalSpent)}
              </span>
            </div>
          </div>

          <div className="flex flex-col -gap-5 mt-auto">
            {sortedData.map((item) => {
              const cat = CATEGORIES.find(c => c.id === item.id)
              const Icon = cat?.icon
              const pct = totalSpent > 0 ? ((item.total / totalSpent) * 100).toFixed(1) : 0
              
              return (
                <div key={item.id} className="group flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors duration-200">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-700 truncate group-hover:text-slate-900 transition-colors">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        <span className="text-[11px] text-slate-400 font-medium w-8 text-right">{Math.round(pct)}%</span>
                        <span className="text-xs font-bold text-slate-800 tabular-nums w-16 text-right">
                          {formatCurrency(item.total)}
                        </span>
                      </div>
                    </div>

                    <div className="h-1 bg-slate-100/80 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${pct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}