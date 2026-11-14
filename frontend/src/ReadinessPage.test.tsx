import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { READINESS_TIMEOUT_MS, ReadinessPage } from './ReadinessPage';

describe('ReadinessPage', () => {
  it('rendersReadyState', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ status: 'ready' }),
      }),
    );

    render(<ReadinessPage />);

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Backend ve veritabanı hazır.',
    );
  });

  it('rendersLoadingAndUnavailableStates', async () => {
    let rejectRequest: (error: Error) => void = () => {};
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((_, reject) => {
            rejectRequest = reject;
          }),
      ),
    );

    render(<ReadinessPage />);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Servis durumları kontrol ediliyor…',
    );
    rejectRequest(new Error('network unavailable'));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Backend veya veritabanı kullanılamıyor.',
    );
  });

  it('rendersUnavailableWhenReadinessTimesOut', async () => {
    vi.useFakeTimers();
    try {
      vi.stubGlobal(
        'fetch',
        vi.fn(
          (_url: string, init?: RequestInit) =>
            new Promise((_, reject) => {
              init?.signal?.addEventListener('abort', () => {
                reject(new DOMException('Aborted', 'AbortError'));
              });
            }),
        ),
      );

      render(<ReadinessPage />);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Servis durumları kontrol ediliyor…',
      );
      await act(async () => {
        await vi.advanceTimersByTimeAsync(READINESS_TIMEOUT_MS);
      });
      expect(screen.getByRole('status')).toHaveTextContent(
        'Backend veya veritabanı kullanılamıyor.',
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it('exposesEachStateAccessibly', async () => {
    const expectAnnouncedStatus = (text: string) => {
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent(text);
      expect(status).toHaveAttribute('aria-live', 'polite');
    };

    let resolveRequest: (response: unknown) => void = () => {};
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveRequest = resolve;
          }),
      ),
    );
    const readyPage = render(<ReadinessPage />);

    expect(screen.getByRole('heading', { name: 'Leave Manager' })).toBeVisible();
    expectAnnouncedStatus('Servis durumları kontrol ediliyor…');

    resolveRequest({ ok: true, json: async () => ({ status: 'ready' }) });
    await screen.findByText('Backend ve veritabanı hazır.');
    expectAnnouncedStatus('Backend ve veritabanı hazır.');
    readyPage.unmount();

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    render(<ReadinessPage />);

    await screen.findByText('Backend veya veritabanı kullanılamıyor.');
    expectAnnouncedStatus('Backend veya veritabanı kullanılamıyor.');
  });
});
