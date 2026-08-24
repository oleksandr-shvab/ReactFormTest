import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  signupSchema,
  type SignupFormInput,
  type SignupFormOutput,
} from "./schema"
import { useSignupMutation } from "./useSignupMutation"
import { TextField } from "./TextField"
import { PasswordField } from "./PasswordField"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const roles = [
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "manager", label: "Manager" },
  { value: "other", label: "Other" },
] as const

export function SignupForm() {
  const form = useForm<SignupFormInput, unknown, SignupFormOutput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      acceptTerms: false,
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const mutation = useSignupMutation()

  const onSubmit = (values: SignupFormOutput) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        console.log(data)
      },
    })
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full justify-center"
    >
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <TextField
            name="fullName"
            label="Full name"
            register={register}
            error={errors.fullName}
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            register={register}
            error={errors.email}
          />

          <TextField
            name="age"
            label="Age"
            type="number"
            register={register}
            error={errors.age}
          />

          <PasswordField
            name="password"
            label="Password"
            register={register}
            error={errors.password}
          />

          <PasswordField
            name="confirmPassword"
            label="Confirm password"
            register={register}
            error={errors.confirmPassword}
          />

          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="acceptTerms"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  <Field orientation="horizontal">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    I accept the terms and conditions
                  </Field>
                </FieldLabel>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {mutation.isError && (
            <Alert variant="destructive">
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>{mutation.error.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating account..." : "Create account"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
