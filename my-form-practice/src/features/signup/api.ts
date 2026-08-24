import type { SignupFormOutput } from "./schema"

export interface SignupResponse {
  id: string
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

const MOCK_LATENCY_MS = 800

export function signupRequest(
  values: SignupFormOutput
): Promise<SignupResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email.includes("fail")) {
        reject(
          new ApiError(500, "Something went wrong on our end. Please try again.")
        )
        return
      }

      resolve({ id: crypto.randomUUID() })
    }, MOCK_LATENCY_MS)
  })
}
