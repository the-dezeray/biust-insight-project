'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, Loader2, LogIn, UserPlus } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') ?? '/';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setIsLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError(
        'Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.',
      );
      setIsLoading(false);
      return;
    }

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setIsLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      router.replace(nextPath.startsWith('/') ? nextPath : '/');
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });
      setIsLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      if (data.session) {
        router.replace(nextPath.startsWith('/') ? nextPath : '/');
        router.refresh();
      } else {
        setNotice('Check your email for a confirmation link to finish signing up.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@biust.ac.bw"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {notice && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-sm text-teal-700">
          {notice}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 disabled:opacity-60 transition-colors duration-200 font-medium shadow-lg shadow-teal-600/25"
      >
        {isLoading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : mode === 'signin' ? (
          <LogIn size={18} />
        ) : (
          <UserPlus size={18} />
        )}
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === 'signin' ? 'signup' : 'signin');
          setError(null);
          setNotice(null);
        }}
        className="w-full text-sm text-gray-500 hover:text-teal-600 transition-colors pt-1"
      >
        {mode === 'signin'
          ? "Don't have an account? Create one"
          : 'Already have an account? Sign in'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-teal-50/40 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 tracking-wide">insight</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to access course resources</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl p-8">
          <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100/60 rounded-xl" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
