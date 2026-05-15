import { describe, expect, it } from 'vitest';
import { validateLoginForm } from './useLoginPageVM';

describe('validateLoginForm', () => {
  it('rejects an empty login form before submit commands run', () => {
    expect(
      validateLoginForm({
        email: '',
        password: '',
      }),
    ).toEqual({
      fieldErrors: {
        email: 'Email is required.',
        password: 'Password is required.',
      },
      success: false,
    });
  });

  it('normalizes valid login values for submission', () => {
    expect(
      validateLoginForm({
        email: ' User@Example.COM ',
        password: 'Password123',
      }),
    ).toEqual({
      request: {
        email: 'user@example.com',
        password: 'Password123',
      },
      success: true,
    });
  });

  it('maps schema errors to app field messages', () => {
    expect(
      validateLoginForm({
        email: 'not-an-email',
        password: 'Password123',
      }),
    ).toEqual({
      fieldErrors: {
        email: 'Enter a valid email.',
      },
      success: false,
    });
  });
});
