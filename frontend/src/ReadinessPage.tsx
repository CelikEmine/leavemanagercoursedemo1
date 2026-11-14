import { useEffect, useState } from 'react';

type ReadinessState = 'loading' | 'ready' | 'unavailable';

type ReadinessPayload = {
  status: 'ready' | 'unavailable';
};

function isReadinessPayload(value: unknown): value is ReadinessPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    (value.status === 'ready' || value.status === 'unavailable')
  );
}

export function ReadinessPage() {
  const [state, setState] = useState<ReadinessState>('loading');

  useEffect(() => {
    const request = new AbortController();

    void fetch('/api/readiness', { signal: request.signal })
      .then(async (response) => {
        if (!response.ok) {
          setState('unavailable');
          return;
        }

        const payload: unknown = await response.json();
        setState(
          isReadinessPayload(payload) && payload.status === 'ready'
            ? 'ready'
            : 'unavailable',
        );
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setState('unavailable');
        }
      });

    return () => request.abort();
  }, []);

  const message = {
    loading: 'Servis durumları kontrol ediliyor…',
    ready: 'Backend ve veritabanı hazır.',
    unavailable: 'Backend veya veritabanı kullanılamıyor.',
  }[state];

  return (
    <main className="page-shell">
      <section className="status-card" aria-labelledby="page-title">
        <p className="eyebrow">İzin yönetimi</p>
        <h1 id="page-title">Leave Manager</h1>
        <p className="intro">Çalışma alanının servis durumu</p>
        <p className={`service-status service-status--${state}`} role="status" aria-live="polite">
          {message}
        </p>
      </section>
    </main>
  );
}
