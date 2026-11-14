import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { READINESS_TIMEOUT_MS, ReadinessPage } from './ReadinessPage';

afterEach(() => {
  vi.unstubAllGlobals();
});

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
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ status: 'ready' }),
      }),
    );

    render(<ReadinessPage />);

    expect(screen.getByRole('heading', { name: 'Leave Manager' })).toBeVisible();
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Backend ve veritabanı hazır.',
    );
  });
});
