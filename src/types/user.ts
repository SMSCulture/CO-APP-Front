/** Shape returned by verifyOtp / auth me on the web frontend. */
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  avatarUrl: string | null;
  /** How the account is connected (OTP email or OAuth provider). */
  authProvider: 'email' | 'google' | 'facebook';
}
