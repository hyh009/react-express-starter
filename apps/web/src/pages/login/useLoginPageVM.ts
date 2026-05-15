import { loginSchema } from '@repo/shared';
import { loginPageCommands } from './loginPage.commands';
import { useLoginForm } from './useLoginForm';
import type { LoginFieldErrors } from './useLoginForm';
import type { LoginRequest } from '@/models/auth.types';
import { tDefault } from '@/app/i18n';

type LoginFormValidationResult =
  | {
      success: true;
      request: LoginRequest;
    }
  | {
      success: false;
      fieldErrors: LoginFieldErrors;
    };

function getLoginFieldError(fieldName: keyof LoginRequest) {
  if (fieldName === 'email') {
    return tDefault('auth.validation.emailInvalid', 'Enter a valid email.');
  }

  return tDefault('auth.validation.passwordRequired', 'Password is required.');
}

export function validateLoginForm(
  form: LoginRequest,
): LoginFormValidationResult {
  const errors: LoginFieldErrors = {};
  const result = loginSchema.safeParse(form);

  if (!form.email.trim()) {
    errors.email = tDefault(
      'auth.validation.emailRequired',
      'Email is required.',
    );
  }

  if (!form.password) {
    errors.password = tDefault(
      'auth.validation.passwordRequired',
      'Password is required.',
    );
  }

  if (!result.success) {
    for (const issue of result.error.issues) {
      const fieldName = issue.path[0];

      if (
        (fieldName === 'email' || fieldName === 'password') &&
        !errors[fieldName]
      ) {
        errors[fieldName] = getLoginFieldError(fieldName);
      }
    }
  }

  if (!result.success || Object.keys(errors).length > 0) {
    return {
      fieldErrors: errors,
      success: false,
    };
  }

  return {
    request: result.data,
    success: true,
  };
}

export function useLoginPageVM(onAuthenticated: () => void) {
  const form = useLoginForm();

  async function submit() {
    form.setIsSubmitting(true);
    form.setSubmitError(null);

    const validation = validateLoginForm(form.values);

    if (!validation.success) {
      form.setIsSubmitting(false);
      form.setFieldErrors(validation.fieldErrors);
      form.setSubmitError(
        tDefault(
          'auth.validation.submitInvalid',
          'Check the highlighted fields and try again.',
        ),
      );
      return;
    }

    const result = await loginPageCommands.submit(validation.request);

    form.setIsSubmitting(false);

    if (result.status === 'authenticated') {
      form.reset();
      onAuthenticated();
      return;
    }

    form.setFieldErrors(result.fieldErrors ?? {});
    form.setSubmitError(result.message);
  }

  return {
    form,
    setField: form.setField,
    submit,
  };
}
