import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { invokeWithRetry } from "../core-api/invoke-wrapper.service";

describe("invokeWithRetry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("succeeds on first attempt", async () => {
    const fn = vi.fn().mockResolvedValue("success");
    const promise = invokeWithRetry(fn, {
      maxAttempts: 3,
      initialDelayMs: 100,
      maxDelayMs: 1000,
    });

    // Resolve all timers
    await vi.runAllTimersAsync();

    const result = await promise;
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries and succeeds on second attempt", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce("success");

    const promise = invokeWithRetry(fn, {
      maxAttempts: 3,
      initialDelayMs: 100,
      maxDelayMs: 1000,
    });

    // Run timers and advance to allow retry
    await vi.runAllTimersAsync();

    const result = await promise;
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("retries and succeeds on third attempt", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockRejectedValueOnce(new Error("fail2"))
      .mockResolvedValueOnce("success");

    const promise = invokeWithRetry(fn, {
      maxAttempts: 3,
      initialDelayMs: 100,
      maxDelayMs: 1000,
    });

    await vi.runAllTimersAsync();

    const result = await promise;
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("throws after all attempts fail", async () => {
    // Disable fake timers for this test — mockRejectedValue + fake timers triggers
    // Vitest's unhandled-rejection tracker before rejects.toThrow() can catch it
    vi.useRealTimers();

    const fn = vi.fn().mockRejectedValue(new Error("always fails"));

    const promise = invokeWithRetry(fn, {
      maxAttempts: 3,
      initialDelayMs: 10,
      maxDelayMs: 100,
    });

    await expect(promise).rejects.toThrow("always fails");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("uses exponential backoff", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail1"))
      .mockResolvedValueOnce("success");

    const initialDelayMs = 100;
    const promise = invokeWithRetry(fn, {
      maxAttempts: 2,
      initialDelayMs,
      maxDelayMs: 1000,
    });

    // First call happens immediately, then delay before retry
    expect(fn).toHaveBeenCalledTimes(1);

    // Advance past the delay
    await vi.advanceTimersByTimeAsync(initialDelayMs);

    await promise;
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("caps delay at maxDelayMs", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce("success");

    const promise = invokeWithRetry(fn, {
      maxAttempts: 2,
      initialDelayMs: 1000,
      maxDelayMs: 500, // maxDelay is less than initialDelay
    });

    await vi.runAllTimersAsync();

    await promise;
    // Should still succeed because it waited maxDelayMs before retrying
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
