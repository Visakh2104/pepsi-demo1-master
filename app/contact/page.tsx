"use client";

import { useRouter } from "next/navigation";
import ContactUsPanel from "@/app/components/ContactUsPanel/ContactUsPanel";

export default function ContactPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: "100vh", background: "#000" }}>
      <ContactUsPanel openOnMount onClose={() => router.back()} />
    </main>
  );
}