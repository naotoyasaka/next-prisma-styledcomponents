"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <p>Welcome to the protected page!</p>;
};

export default ProtectedPage;
