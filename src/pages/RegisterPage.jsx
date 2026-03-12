import { Link } from "react-router-dom"
import { useRegisterForm } from "../hooks/useAuthForm"
import { FaNairaSign } from "react-icons/fa6"
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi"

function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col w-[65%] relative overflow-hidden bg-[#05101f]">

      {/* Radial glows — green tint to match register accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-emerald-600/10 blur-[90px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-emerald-900/20 blur-[80px]" />
      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3 px-12 pt-12">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
          <FaNairaSign className="w-4 h-4 text-white" />
        </div>
        <span className="text-[19px] font-black text-slate-100 tracking-tight">
          Fin<span className="text-blue-600">Track</span>
        </span>
      </div>

      {/* Illustration + tagline — centrepiece */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 gap-8">
        <img
          src="/assets/illustrator2.svg"
          alt="Finance illustration"
          className="w-full max-w-[420px]"
        />
        <div className="text-center">
          <p className="text-4xl font-black text-slate-100 tracking-tight leading-tight">
            Take control of
            <span className="text-emerald-400"> your money.</span>
          </p>
          <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-[650px] mx-auto">
            Join thousands already hitting their financial goals with FinTrack.
          </p>
        </div>
      </div>

    </div>
  )
}

export default function RegisterPage() {
  const { form, showPassword, setShowPassword, error, loading, handleChange, handleSubmit } = useRegisterForm()

  return (
    <div className="min-h-screen flex">

      <LeftPanel />

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <FaNairaSign className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              Fin<span className="text-blue-600">Track</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-[26px] font-black text-slate-900 tracking-tight">
              Create account
            </h2>
            <p className="text-sm text-slate-400 mt-1.5">
              Start tracking your finances for free
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange("name")}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3.5 rounded-xl font-bold text-sm text-white tracking-wide mt-1
                transition-all duration-200
                ${loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200 active:translate-y-0 cursor-pointer"
                }
              `}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}