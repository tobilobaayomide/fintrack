import { FiHome, FiShoppingBag, FiTruck, FiZap, FiGrid } from "react-icons/fi"
import { FaNairaSign } from "react-icons/fa6";

export const CATEGORIES = [
  { id: "housing",        label: "Housing",        color: "#6366f1", icon: FiHome,        bg: "bg-indigo-100",  text: "text-indigo-700"  },
  { id: "food",           label: "Food",           color: "#f59e0b", icon: FiShoppingBag, bg: "bg-amber-100",   text: "text-amber-700"   },
  { id: "transportation", label: "Transportation", color: "#10b981", icon: FiTruck,       bg: "bg-emerald-100", text: "text-emerald-700" },
  { id: "utilities",      label: "Utilities",      color: "#ef4444", icon: FiZap,         bg: "bg-red-100",     text: "text-red-700"     },
  { id: "savings",        label: "Savings",        color: "#ec4899", icon: FaNairaSign,  bg: "bg-pink-100",    text: "text-pink-700"    },
  { id: "miscellaneous",  label: "Miscellaneous",  color: "#3b82f6", icon: FiGrid,        bg: "bg-blue-100",    text: "text-blue-700"    },
]