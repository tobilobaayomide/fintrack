import { useEffect } from "react"
import { getPrevMonth, getNextMonth, getMonthLabel } from "../../utils/dateHelpers";
import { FiGrid, FiList, FiPieChart, FiChevronLeft, FiChevronRight, FiPlus, FiX } from "react-icons/fi";
import { FaNairaSign } from "react-icons/fa6";
import Button from "../ui/Button";

const NAV_ITEMS = [
  {
    path: "/",
    label: "Dashboard",
    icon: <FiGrid className="w-5 h-5" />,
  },
  {
    path: "/transactions",
    label: "Transactions",
    icon: <FiList className="w-5 h-5" />,
  },
  {
    path: "/budgets",
    label: "Budgets",
    icon: <FiPieChart className="w-5 h-5" />,
  },
];
     
export default function Sidebar({
  activePath,
  onTabChange,
  currentMonth,
  onMonthChange,
  onAddClick,
  isOpen,
  onClose,
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky inset-y-0 left-0 w-64 bg-[#0a0f1c] border-r border-white/5 flex flex-col h-screen
          overflow-y-auto z-40 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <FaNairaSign className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Fin<span className="text-blue-500">Track</span>
              </h1>
            </div>

            <button
              onClick={onClose}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-between bg-white/[0.03] rounded-xl px-2 py-1.5 border border-white/5 mb-8">
            <button
              onClick={() => onMonthChange(getPrevMonth(currentMonth))}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
              {getMonthLabel(currentMonth)}
            </span>
            <button
              onClick={() => onMonthChange(getNextMonth(currentMonth))}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-3">
            Menu
          </div>

          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activePath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onTabChange(item.path)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-200 text-left relative group
                  ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-blue-500 rounded-r-full" />
                  )}
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-slate-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-5 border-t border-white/5 bg-white/[0.01]">
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
      </aside>
    </>
  );
}