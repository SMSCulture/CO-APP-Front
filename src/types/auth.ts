import type { User } from './user';

/** Mirrors backend requestOtp mutation response. */
export interface RequestOtpResult {
  success: boolean;
  message: string;
  userCreated: boolean;
}

/** Mirrors backend verifyOtp mutation response (access_token → accessToken). */
export interface VerifyOtpResult {
  accessToken: string;
  isFirstLogin: boolean;
  user: User;
}
