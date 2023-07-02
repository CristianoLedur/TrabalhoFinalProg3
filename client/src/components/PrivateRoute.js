'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '../constants/app-routes';

const checkUserAuthenticated = () => {
  const dataString = sessionStorage.getItem('user');
  return !!dataString;
};

export default function PrivateRoute({ children }) {
  const { push } = useRouter();

  const isUserAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if(!isUserAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [isUserAuthenticated, push]);
  
  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  );
}

