import { TransactionList, TransactionFilters } from "../components/transactions"
import { Button } from "../components/ui"
import { FiPlus } from "react-icons/fi"

export default function TransactionsPage({
  filters,
  onFilterChange,
  filteredTransactions,
  onDeleteTransaction,
  onEditTransaction,
  onAddClick,
}) {
  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button onClick={onAddClick} variant="primary" size="md">
          <FiPlus className="w-4 h-4" />
          Add Transaction
        </Button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 space-y-6">
        <TransactionFilters
          filters={filters}
          onFilterChange={onFilterChange}
        />
        <TransactionList
          transactions={[...filteredTransactions].reverse()}
          onDelete={onDeleteTransaction}
          onEdit={onEditTransaction}
        />
      </div>

    </div>
  )
}