'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { runFullDiagnostics } from '@/lib/auth-debug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Loader2, ArrowLeft, Bug, Trash2 } from 'lucide-react';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, session, user, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  const redirectUrl = searchParams.get('redirect') || '/admin/site-commander';

  useEffect(() => {
    const checkAuth = async () => {
      if (hasCheckedAuth) return;
      if (authLoading) return;
      if (!user || !session) return;

      console.log('[AdminLogin] 🔍 Checking existing session...', { userId: user.id, email: user.email });

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      console.log('[AdminLogin] 🔍 Profile check result:', { profile, profileError });

      if (profile && (profile.role === 'admin' || profile.role === 'super_admin')) {
        console.log('[AdminLogin] ✅ Already authenticated, redirecting to:', redirectUrl);
        setHasCheckedAuth(true);
        window.location.href = redirectUrl;
      } else if (profileError) {
        console.error('[AdminLogin] ❌ Profile query error:', profileError);
        setHasCheckedAuth(true);
      } else {
        console.warn('[AdminLogin] ⚠️ User authenticated but does not have admin role:', profile);
        setHasCheckedAuth(true);
      }
    };

    checkAuth();
  }, [user, session, authLoading, hasCheckedAuth, redirectUrl]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    try {
      console.log('[AdminLogin] 🔵 Starting login process...');
      const session = await login(email, password);

      if (session) {
        console.log('[AdminLogin] ✅ Login successful, verifying admin role...');
        console.log('[AdminLogin] 🔍 User ID:', session.user.id);
        console.log('[AdminLogin] 🔍 User Email:', session.user.email);

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        console.log('[AdminLogin] 🔍 Profile query result:', { profile, profileError });

        if (profileError) {
          console.error('[AdminLogin] ❌ Profile query error:', profileError);
          throw new Error(`Database error: ${profileError.message}`);
        }

        if (!profile) {
          console.warn('[AdminLogin] ⚠️ Profile not found, attempting to create...');

          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: session.user.email,
              role: session.user.email === 'admin@modulus.com' || session.user.email === 'erp.songur@gmail.com' ? 'super_admin' : 'user',
              full_name: session.user.email === 'admin@modulus.com' ? 'System Administrator' : 'User'
            })
            .select()
            .single();

          if (createError) {
            console.error('[AdminLogin] ❌ Failed to create profile:', createError);
            throw new Error('Profile not found and could not be created. Please contact administrator.');
          }

          console.log('[AdminLogin] ✅ Profile created successfully:', newProfile);

          if (newProfile.role !== 'admin' && newProfile.role !== 'super_admin') {
            await supabase.auth.signOut();
            throw new Error('Access denied. Admin privileges required.');
          }

          console.log('[AdminLogin] ✅ Admin role verified, redirecting...');
          await new Promise(resolve => setTimeout(resolve, 100));
          window.location.href = redirectUrl;
          return;
        }

        console.log('[AdminLogin] 🔍 Profile role:', profile.role);

        if (profile.role !== 'admin' && profile.role !== 'super_admin') {
          console.error('[AdminLogin] ❌ Insufficient role:', profile.role);
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin privileges required.');
        }

        console.log('[AdminLogin] ✅ Admin role verified, redirecting...');
        await new Promise(resolve => setTimeout(resolve, 100));
        window.location.href = redirectUrl;
      }
    } catch (err: any) {
      console.error('[AdminLogin] ❌ Login failed:', err);

      if (err.message?.includes('Profile not found')) {
        console.log('[AdminLogin] 🧹 Clearing cached auth data...');
        await supabase.auth.signOut();
        localStorage.clear();
        setLocalError('Session cleared. Please try logging in again.');
      } else {
        setLocalError(err.message || 'Login failed. Please try again.');
      }
    }
  };

  const handleRunDiagnostics = () => {
    console.log('🔬 Running full diagnostics...');
    runFullDiagnostics(supabase);
  };

  const handleClearCache = async () => {
    console.log('🧹 Clearing all cached data...');
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    setLocalError('');
    setEmail('');
    setPassword('');
    console.log('✅ Cache cleared. Please try logging in again.');
    alert('All cached data cleared. You can now login again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="absolute top-4 left-4">
        <Link href="/landing">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>
            Sign in with your administrator credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {localError && (
              <Alert variant="destructive">
                <AlertDescription>{localError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={authLoading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={authLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Need help? Contact your system administrator
            </p>
            <p className="text-xs text-muted-foreground">
              Note: Your user account must have admin role in the profiles table
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRunDiagnostics}
                className="gap-2"
              >
                <Bug className="h-4 w-4" />
                Run Diagnostics
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClearCache}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear Cache
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="absolute top-4 left-4">
          <Link href="/landing">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <AdminLoginContent />
    </Suspense>
  );
}
