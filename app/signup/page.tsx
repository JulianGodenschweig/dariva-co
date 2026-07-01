import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = { title: "Sign up" };

type LecturerRow = { id: string; full_name: string | null };

export default async function SignupPage() {
  const supabase = await createClient();
  const { data: lecturers } = await supabase.rpc("list_lecturers");
  return <SignupForm lecturers={(lecturers ?? []) as LecturerRow[]} />;
}
