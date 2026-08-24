import type { UseFormRegister } from "react-hook-form"

import {
  Field,
  FieldLabel,
  FieldError as FieldErrorMessage,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { SignupFormInput } from "./schema"

interface TextFieldProps
  extends Omit<React.ComponentProps<typeof Input>, "id" | "name"> {
  name: keyof SignupFormInput
  label: string
  register: UseFormRegister<SignupFormInput>
  error?: { message?: string }
}

export function TextField({
  name,
  label,
  register,
  error,
  ...inputProps
}: TextFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        aria-invalid={!!error}
        {...register(name)}
        {...inputProps}
      />
      {error && <FieldErrorMessage errors={[error]} />}
    </Field>
  )
}
