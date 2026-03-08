import { GiHamburgerMenu } from "react-icons/gi";

export default function MobileNavBar({ currentMonth, onOpenMenu }) {
  const label = new Date(`${currentMonth}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 md:px-8 py-3
        bg-white/95 backdrop-blur border-b border-slate-200 flex items-center justify-between"
      >
        <button
          onClick={onOpenMenu}
          className="p-2 text-slate-700"
          aria-label="Open menu"
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </button>
        <span className="text-md font-semibold text-slate-700 mt-2 ">{label}</span>
      </div>
      <div className="md:hidden h-14" aria-hidden="true" />
    </>
  );
}
