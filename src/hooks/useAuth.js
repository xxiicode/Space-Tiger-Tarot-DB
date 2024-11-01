// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { auth } from '../assets/Connection/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  return { user };
};
