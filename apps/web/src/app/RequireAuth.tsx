import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthVM } from '@/app/viewModel/useAuthVM';
import { LoadingState } from '@/shared/components/LoadingState';

export function RequireAuth() {
  const auth = useAuthVM();
  const location = useLocation();

  if (auth.isChecking) {
    return <LoadingState label="Checking session" />;
  }

  if (!auth.isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
}
