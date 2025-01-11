// store/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiConstant } from "./ApiConstant";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${ApiConstant?.BASE_URL}` }), // Replace with your actual API base URL
  endpoints: (builder) => ({
    getAllGoal: builder.query<any, any>({
      query: () => ({
        url: `${ApiConstant.GET_ALL_GOAL}`,
      }),
    }),
    studentLogin: builder.mutation({
      query: ({ body }) => ({
        url: `${ApiConstant.STUDENT_LOGIN_END_POINT}`,
        method: "POST",
        body: body,
      }),
    }),
    generateOtp: builder.mutation({
      query: ({ body }) => ({
        url: `${ApiConstant.REGISTRATION_GENERATE_OTP}`,
        method: "POST",
        body: body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ body }) => ({
        url: `${ApiConstant.REGISTRATION_VERIFY_OTP}`,
        method: "POST",
        body: body,
      }),
    }),
    registerUser: builder.mutation({
      query: ({ body }) => ({
        url: `${ApiConstant.USER_REGISTRATION_END_POINT}`,
        method: "POST",
        body: body,
      }),
    }),
    sendResetPasswordLink: builder.mutation({
      query: ({ body }) => ({
        url: `${ApiConstant.SEND_RESET_PASSWORD_LINK}`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ body }) => ({
        url: `${ApiConstant.RESET_PASSWORD}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllGoalQuery,
  useGenerateOtpMutation,
  useRegisterUserMutation,
  useStudentLoginMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useSendResetPasswordLinkMutation,
} = apiSlice;
