import type { UseFormRegister } from "react-hook-form"

import {
  Field,
  FieldLabel,
  FieldError as FieldErrorMessage,
} from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import type { SignupFormInput } from "./schema"

interface PasswordFieldProps
  extends Omit<React.ComponentProps<typeof PasswordInput>, "id" | "name"> {
  name: keyof SignupFormInput
  label: string
  register: UseFormRegister<SignupFormInput>
  error?: { message?: string }
}

export function PasswordField({
  name,
  label,
  register,
  error,
  ...inputProps
}: PasswordFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <PasswordInput
        id={name}
        aria-invalid={!!error}
        {...register(name)}
        {...inputProps}
      />
      {error && <FieldErrorMessage errors={[error]} />}
    </Field>
  )
}
