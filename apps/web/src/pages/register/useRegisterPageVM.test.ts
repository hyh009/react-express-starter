import { describe, expect, it } from 'vitest';
import { validateRegisterForm } from './useRegisterPageVM';

describe('validateRegisterForm', () => {
  it('normalizes valid register values for submission', () => {
    expect(
      validateRegisterForm({
        confirmPassword: 'Password123',
        email: ' User@Example.COM ',
        password: 'Password123',
        username: ' starter-user ',
      }),
    ).toEqual({
      request: {
        email: 'user@example.com',
        password: 'Password123',
        username: 'starter-user',
      },
      success: true,
    });
  });

  it('keeps confirm password as page-only validation', () => {
    expect(
      validateRegisterForm({
        confirmPassword: 'Password456',
        email: 'user@example.com',
        password: 'Password123',
        username: 'starter-user',
      }),
    ).toEqual({
      fieldErrors: {
        confirmPassword: 'Passwords do not match.',
      },
      success: false,
    });
  });

  it('maps schema errors to app field messages', () => {
    expect(
      validateRegisterForm({
        confirmPassword: 'short',
        email: 'not-an-email',
        password: 'short',
        username: '',
      }),
    ).toEqual({
      fieldErrors: {
        email: 'Enter a valid email.',
        password:
          'Use at least 8 characters with uppercase, lowercase, and a number.',
        username: 'Username is required.',
      },
      success: false,
    });
  });
});
