import { useMutation } from "@tanstack/react-query"

import { signupRequest } from "./api"

export function useSignupMutation() {
  return useMutation({
    mutationFn: signupRequest,
  })
}
