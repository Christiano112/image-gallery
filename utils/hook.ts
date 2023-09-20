"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

export const useCheckAuth = () => {
    const user = useUser();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (user && user?.role === "authenticated" && user?.id) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [user]);

    return { user, authenticated };
};