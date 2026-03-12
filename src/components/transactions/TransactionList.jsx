import TransactionItem from "./TransactionItem"
import EmptyState from "../ui/EmptyState"
import { FiFileText } from "react-icons/fi"

export default function TransactionList({ transactions, onEdit, onDelete, compact }) {
  
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })

  const displayTransactions = compact ? sortedTransactions.slice(0, 5) : sortedTransactions

  if (transactions.length === 0) {
    return (
      <div className="py-8">
        <EmptyState
          icon={<FiFileText className="w-8 h-8 text-slate-300" />}
          title="No transactions yet"
          description="Your latest transactions will appear here."
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {displayTransactions.map(tx => (
        <TransactionItem 
          key={tx._id} 
          transaction={tx} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  )
}