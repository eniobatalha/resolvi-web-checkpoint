"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import axios from 'axios';

function CallbackComponent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('client_id', 'nextjs-google');
      params.append('client_secret', 'u0i2PiRVDIFWqyUC8ciTuLgWbYKktjW4');
      params.append('redirect_uri', 'http://localhost:3000/callback');

      axios.post('https://keycloak.lemonwater-7753b8e7.brazilsouth.azurecontainerapps.io/realms/resolviapp/protocol/openid-connect/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
          .then(response => {
            console.log('Token recebido:', response.data);
            localStorage.setItem('access_token', response.data.access_token);
            window.location.href = '/home';
          })
          .catch(error => {
            console.error('Erro ao obter o token:', error.response?.data);
          });
    }
  }, [searchParams]);

  return <div>Processando login...</div>;
}

export default function Callback() {
  return (
      <Suspense fallback={<div>Carregando...</div>}>
        <CallbackComponent />
      </Suspense>
  );
}
