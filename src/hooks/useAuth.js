// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { auth } from '../assets/Connection/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Usuario autenticado:", currentUser);
        setUser(currentUser); // Actualiza el estado del usuario
      } else {
        console.log("No hay usuario autenticado.");
        setUser(null); // Si no hay usuario, establece user como null
      }
      setLoading(false); // Una vez que tenemos el usuario, cambiamos loading a false
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar
  }, []);

  console.log('Estado actual del usuario:', user); // Log del estado del usuario

  return { user, loading }; // Ahora también retornamos el estado de loading
};
