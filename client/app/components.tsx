'use client';
// This file has been sourced from: /Users/macbook/Desktop/Desktop-MacBook/Pinely/kutt/client/pages/index.tsx
import { useRouter } from "next/navigation";

import { DISALLOW_ANONYMOUS_LINKS } from "../consts";
import NeedToLogin from "../components/NeedToLogin";
import Extensions from "../components/Extensions";
import LinksTable from "../components/LinksTable";
import AppWrapper from "../components/AppWrapper";
import Shortener from "../components/Shortener";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useStoreState } from "../store";

const Homepage = () => {
  const isAuthenticated = useStoreState(s => s.auth.isAuthenticated);
  const router = useRouter();

  if (
    !isAuthenticated &&
    DISALLOW_ANONYMOUS_LINKS &&
    typeof window !== "undefined"
  ) {
    router.push("/login");
    return null;
  }

  return (
    <AppWrapper>
      <Shortener />
      {!isAuthenticated && <NeedToLogin />}
      {isAuthenticated && <LinksTable />}
      <Features />
      <Extensions />
      <Footer />
    </AppWrapper>
  );
};

export default Homepage;
