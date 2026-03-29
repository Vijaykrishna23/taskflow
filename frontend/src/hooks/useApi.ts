import { useCallback } from 'react';

export function useApi() {
  const callApi = useCallback(async (url: string, method: 'GET' | 'POST', data?: any) => {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (data) options.body = JSON.stringify(data);
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }, []);

  return { callApi };
}
