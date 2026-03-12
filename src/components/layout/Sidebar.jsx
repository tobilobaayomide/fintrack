import { useEffect } from "react"
import { getPrevMonth, getNextMonth, getMonthLabel } from "../../utils/dateHelpers";
import { FiGrid, FiList, FiPieChart, FiChevronLeft, FiChevronRight, FiPlus, FiX, FiLogOut } from "react-icons/fi";
import { FaNairaSign } from "react-icons/fa6";
import Button from "../ui/Button";

const NAV_ITEMS = [
  { path: "/",             label: "Dashboard",    icon: <FiGrid className="w-[18px] h-[18px]" /> },
  { path: "/transactions", label: "Transactions", icon: <FiList className="w-[18px] h-[18px]" /> },
  { path: "/budgets",      label: "Budgets",      icon: <FiPieChart className="w-[18px] h-[18px]" /> },
];

function UserCard({ user, onLogout }) {
  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <div className="mx-3 mb-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] p-3.5">
      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
          <span className="text-[13px] font-black text-white tracking-tight">{initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-100 truncate leading-tight">{user?.name}</p>
          <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.email}</p>
        </div>

        <button
          onClick={onLogout}
          title="Sign out"
          className="flex-shrink-0 p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
        >
          <FiLogOut className="w-[15px] h-[15px]" />
        </button>
      </div>
    </div>
  )
}

export default function Sidebar({
  activePath,
  onTabChange,
  currentMonth,
  onMonthChange,
  onAddClick,
  isOpen,
  onClose,
  user,
  onLogout,
}) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.touchAction = "none"
    } else {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:sticky inset-y-0 left-0 h-screen w-80 z-40
          flex flex-col
          bg-[#05101f] border-r border-white/[0.06]
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-600/10 blur-[70px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "220px 220px",
          }}
        />

        <div className="relative z-10 flex flex-col flex-1 overflow-y-auto px-3 pt-6 pb-4 gap-6">

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center ">
                <FaNairaSign className="w-4 h-4 text-white" />
              </div>
              <span className="text-[19px] font-black text-slate-100 tracking-tight">
                Fin<span className="text-blue-600">Track</span>
              </span>
            </div>

            <button
              onClick={onClose}
              className="md:hidden p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              aria-label="Close menu"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-2xl px-1.5 py-1.5">
            <button
              onClick={() => onMonthChange(getPrevMonth(currentMonth))}
              className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.12em]">
              {getMonthLabel(currentMonth)}
            </span>
            <button
              onClick={() => onMonthChange(getNextMonth(currentMonth))}
              className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.14em] px-3 mb-1">
              Menu
            </p>

            {NAV_ITEMS.map((item) => {
              const isActive = activePath === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => onTabChange(item.path)}
                  className={`
                    relative flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-semibold
                    text-left transition-all duration-200 group
                    ${isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-blue-600 rounded-r-full" />
                  )}
                  <span className={`transition-colors ${isActive ? "text-blue-600" : "text-slate-600 group-hover:text-slate-400"}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              )
            })}
          </div>

        </div>

        <div className="relative z-10 flex flex-col gap-3 pb-5 border-t border-white/[0.06] pt-4">

          <div className="px-3">
            <Button
              onClick={onAddClick}
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              New Transaction
            </Button>
          </div>

          <UserCard user={user} onLogout={onLogout} />
        </div>

      </aside>
    </>
  )
}