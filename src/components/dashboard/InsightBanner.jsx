import { useState, useEffect } from "react"
import { CATEGORIES } from "../../constants/categories"
import { FiTrendingDown, FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi"
import { IoIosAlert } from "react-icons/io";


export default function InsightBanner({ transactions, currentMonth, getBudgetStatus }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const insights = []
  if (transactions.length > 0) {
    CATEGORIES.forEach(cat => {
      const spent = transactions
        .filter(tx => tx.category === cat.id && tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0)

      const status = getBudgetStatus(cat.id, currentMonth, spent)

      if (status?.isOver) {
        insights.push({ 
          type: "danger", 
          title: "Budget Exceeded",
          message: `You've exceeded your ${cat.label} budget! Consider reducing spending here.` 
        })
      } else if (status?.isWarning) {
        insights.push({ 
          type: "warning", 
          title: "Approaching Limit",
          message: `You've used ${Math.round(status.percentage)}% of your ${cat.label} budget.` 
        })
      }
    })

    const totalExpenses = transactions.filter(tx => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0)
    const totalIncome = transactions.filter(tx => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0)

    if (totalIncome > 0 && totalExpenses / totalIncome > 0.9) {
      insights.push({ 
        type: "danger", 
        title: "High Burn Rate",
        message: `You've spent ${Math.round((totalExpenses / totalIncome) * 100)}% of your total income this month.` 
      })
    }
  }

  if (insights.length === 0) {
    insights.push({
      type: "success",
      title: "Financially Healthy",
      message: "You're perfectly on track this month. Keep up the great habits!"
    })
  }

  useEffect(() => {
    if (insights.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [insights.length, isPaused])

  const THEMES = {
    danger: {
      wrap:  "bg-rose-600 shadow-rose-500/20",
      icon:  <IoIosAlert className="w-5 h-5 text-rose-100" />,
      dotActive: "bg-white",
      dotBg: "bg-rose-400"
    },
    warning: {
      wrap:  "bg-[#0a0f1c] shadow-slate-900/20",
      icon:  <FiTrendingDown className="w-5 h-5 text-amber-400" />,
      dotActive: "bg-amber-400",
      dotBg: "bg-slate-700"
    },
    success: {
      wrap:  "bg-emerald-600 shadow-emerald-500/20",
      icon:  <FiStar className="w-5 h-5 text-emerald-100 fill-emerald-100" />,
      dotActive: "bg-white",
      dotBg: "bg-emerald-400"
    }
  }

  const safeIndex = Math.min(currentIndex, Math.max(insights.length - 1, 0))
  const active = insights[safeIndex] || insights[0]
  const theme = THEMES[active.type]

  useEffect(() => {
    if (currentIndex >= insights.length) {
      setTimeout(() => setCurrentIndex(0), 0)
    }
  }, [insights.length, currentIndex])

  return (
    <div 
      className={`relative w-full rounded-2xl shadow-lg p-5 sm:p-6 transition-all duration-500 overflow-hidden ${theme.wrap}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div 
          key={currentIndex} 
          className="flex items-center gap-4 flex-1 animate-[fadeIn_0.4s_ease-out]"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
            {theme.icon}
          </div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide">
              {active.title}
            </h4>
            <p className="text-white/80 text-sm mt-0.5 font-medium">
              {active.message}
            </p>
          </div>
        </div>

        {insights.length > 1 && (
          <div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto justify-between sm:justify-end border-t border-white/10 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
            <div className="flex items-center gap-1.5">
              {insights.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? `w-5 ${theme.dotActive}` : `w-1.5 hover:bg-white/50 ${theme.dotBg}`
                  }`}
                  aria-label={`Go to insight ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCurrentIndex((prev) => (prev + 1) % insights.length)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
