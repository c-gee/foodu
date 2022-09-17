import { api as userApi } from "../modules/user.generated";

export const api = userApi.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    me: {
      providesTags: ["User"]
    },
    signUp: {},
    signInByPhone: {},
    verifyPhoneOtp: {},
    signInByProvider: {}
  }
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useSignUpMutation,
  useSignInByPhoneMutation,
  useVerifyPhoneOtpMutation,
  useSignInByProviderMutation
} = api;
