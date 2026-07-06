/**
 * Passwordless OTP auth — mirrors the web BFF routes, which call these exact
 * backend mutations (app/api/auth/request-otp + verify-otp on web).
 */
import { graphqlRequest } from '../client';
import { mapRawUser } from '../mappers/user.mapper';
import { USE_MOCK_DATA } from '../../config/env';
import { mockUser } from '../../mock/users.mock';
import type { RequestOtpResult, VerifyOtpResult } from '../../types/auth';

const REQUEST_OTP = /* GraphQL */ `
  mutation RequestOtp($input: RequestOtpInput!) {
    requestOtp(input: $input) {
      success
      message
      userCreated
    }
  }
`;

const VERIFY_OTP = /* GraphQL */ `
  mutation VerifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input) {
      access_token
      isFirstLogin
      user {
        id
        email
        firstName
        lastName
        role
      }
    }
  }
`;

export async function requestOtp(email: string): Promise<RequestOtpResult> {
  if (USE_MOCK_DATA) {
    return { success: true, message: 'Code sent (mock)', userCreated: false };
  }
  const data = await graphqlRequest<{ requestOtp: RequestOtpResult }>(REQUEST_OTP, {
    input: { email },
  });
  return data.requestOtp;
}

export async function verifyOtp(email: string, code: string): Promise<VerifyOtpResult> {
  if (USE_MOCK_DATA) {
    return { accessToken: 'mock-token', isFirstLogin: false, user: mockUser };
  }
  const data = await graphqlRequest<{
    verifyOtp: {
      access_token: string;
      isFirstLogin: boolean;
      user: Parameters<typeof mapRawUser>[0];
    };
  }>(VERIFY_OTP, { input: { email, code } });
  return {
    accessToken: data.verifyOtp.access_token,
    isFirstLogin: data.verifyOtp.isFirstLogin,
    user: mapRawUser(data.verifyOtp.user),
  };
}
