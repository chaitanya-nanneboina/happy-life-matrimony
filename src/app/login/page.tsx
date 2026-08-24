import type { Metadata } from "next";
import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Admin Login | Happy Life Matrimony",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginPage />;
}
