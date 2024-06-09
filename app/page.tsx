'use client';
import PrivateRoute from './components/PrivateRoute';
import MainPage from './components/MainPage';

export default function Page() {
  return (
    <PrivateRoute>
      <MainPage />
    </PrivateRoute>
  );
}
