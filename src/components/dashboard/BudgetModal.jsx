import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import Modal from "../ui/Modal";
import { Button } from "../ui";

export default function BudgetModal({ isOpen, onClose, cat, spent, budget, onSave }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!isOpen) return
    setTimeout(() => setInputValue(budget?.limit || ""), 0)
  }, [isOpen, budget])

  function handleSave() {
    const val = Number(inputValue);
    if (!isNaN(val) && val > 0) {
      onSave(val);
      setInputValue("");
    }
  }

  if (!cat) return null;

  const Icon = cat.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={budget ? `Edit ${cat.label} Budget` : `Set ${cat.label} Budget`}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${cat.color}18` }}
          >
            <Icon className="w-4 h-4" style={{ color: cat.color }} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{cat.label}</p>
            <p className="text-xs text-slate-400 font-medium">
              Currently spent:{" "}
              <span className="font-bold text-slate-600">
                {formatCurrency(spent)}
              </span>
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Monthly Limit
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="text-slate-400 text-lg">₦</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xl font-bold focus:outline-none placeholder:text-slate-300 placeholder:font-normal"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className=" py-5 border-t flex gap-3 ">
        <Button
          onClick={onClose}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="primary"
          size="lg"
          className="flex-1"
        >
          {budget ? "Update Limit" : "Set Limit"}
        </Button>
      </div>
    </Modal>
  );
}
