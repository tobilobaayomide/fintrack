import { useState } from "react"

export function useTransactionForm(addTransaction, editTransaction) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const openForNew = () => {
    setEditingTransaction(null)
    setIsOpen(true)
  }

  const openForEdit = (transaction) => {
    setEditingTransaction(transaction)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setEditingTransaction(null)
  }

  const submit = (data) => {
    if (editingTransaction) {
      editTransaction(editingTransaction._id, data)
    } else {
      addTransaction(data)
    }
    close()
  }

  return {
    isOpen,
    editingTransaction,
    openForNew,
    openForEdit,
    close,
    submit
  }
}