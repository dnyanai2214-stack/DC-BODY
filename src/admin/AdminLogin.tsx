import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth, WHITELISTED_ADMINS } from '../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, loginAsDemoAdmin, error: authError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErr(null);
    try {
      await signInWithGoogle();
      navigate('/admin');
    } catch (e: any) {
      setErr(e?.message || 'Google sign-in error');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErr(null);
    try {
      await signInWithEmail(email, password);
      navigate('/admin');
    } catch (e: any) {
      setErr(e?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemoAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0E1013] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1A1D21] border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white">
            DC-Body व्यवस्थापक प्रवेश
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            केवळ अधिकृत अ‍ॅडमिन खात्यांसाठी (Whitelisted Admins Only)
          </p>
        </div>

        {/* Whitelist Info Banner */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
          <span className="font-bold block">अधिकृत अ‍ॅडमिन ईमेल (Whitelisted):</span>
          <span className="font-mono text-[10px] block text-stone-600 dark:text-stone-300">
            {WHITELISTED_ADMINS.join(', ')}
          </span>
        </div>

        {err && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{err}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-black dark:hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
          </svg>
          <span>Sign In with Google</span>
        </button>

        <div className="flex items-center gap-2 my-2 text-stone-400 text-xs">
          <span className="flex-1 border-t border-stone-200 dark:border-stone-800" />
          <span>किंवा ईमेलने लॉगिन करा</span>
          <span className="flex-1 border-t border-stone-200 dark:border-stone-800" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              ईमेल (Email)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dnyanai2214@gmail.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              पासवर्ड (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:border-teal-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white transition-colors shadow-xs disabled:opacity-50"
          >
            {loading ? 'लॉगिन होत आहे...' : 'लॉगिन करा (Sign In)'}
          </button>
        </form>

        {/* Demo Admin Quick Access */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full py-2 px-3 rounded-xl border border-dashed border-teal-500/50 text-teal-700 dark:text-teal-300 hover:bg-teal-500/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>झटपट चाचणी / Quick Demo Admin Access</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-stone-500 hover:underline">
            ← सार्वजनिक संकेतस्थळावर परत जा
          </Link>
        </div>
      </div>
    </div>
  );
};
