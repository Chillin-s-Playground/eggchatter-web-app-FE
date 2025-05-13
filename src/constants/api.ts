const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8080'

export const ApiUrl = {
  AUTH: {
    SIGNIN: `${BASE_URL}/auth/signin`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    CHECK_MAIL : `${BASE_URL}/auth/check-mail`,
  }
}