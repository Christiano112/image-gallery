"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { ToastContainer } from "react-toastify";

export interface CustomLayoutPropType {
  children: React.ReactNode;
  initialSession: Session;
}

const CustomLayout = ({ children, initialSession }: CustomLayoutPropType) => {
  const [supabaseClient] = React.useState(() => createPagesBrowserClient());

  return (
    <React.StrictMode>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={initialSession}
      >
        {children}
        <ToastContainer />
        <Analytics />
      </SessionContextProvider>
    </React.StrictMode>
  );
};

export default CustomLayout;
