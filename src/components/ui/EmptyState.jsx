export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="text-5xl mb-4">{icon || "💸"}</div>
      <h3 className="text-lg font-semibold text-slate-300 mb-1">{title || "No transactions yet"}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6">
        {description || "Add your first transaction to get started."}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}