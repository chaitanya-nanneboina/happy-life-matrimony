export interface Profile {
  id: number;
  name: string;
  gender: "Male" | "Female" | "Other";
  looking_for: "Male" | "Female" | "Either";
  phone: string;
  otp_verified: 0 | 1;
  submitted_at: string;
}

export interface OtpSession {
  phone: string;
  otp: string;
  expires_at: number;
  attempts: number;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

export type ProfileFormData = {
  name: string;
  gender: "Male" | "Female" | "Other";
  looking_for: "Male" | "Female" | "Either";
  phone: string;
};

export type ApiResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T;
};
