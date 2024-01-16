// src/services/auth.js
import { supabase } from "../supabase/init.js";
import { useRouter } from "vue-router";

const router = useRouter();

export const register = async (email, password, confirmPassword) => {
    if (password === confirmPassword) {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            router.push({ name: "Login" });
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        throw new Error("Passwords do not match");
    }
};

export const login = async (email, password) => {
  try {
      const { error } = await supabase.auth.signIn({
          email,
          password,
      });
      if (error) throw error;
      router.push({ name: "dashboard" });
  } catch (error) {
      throw new Error(error.message);
  }
};

export const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        router.push({ name: "login" });
    } catch (error) {
        console.error("Error logging out", error);
        throw error;
    }
};
