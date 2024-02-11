import { supabase } from "../supabase/init.js";
import { useRouter } from "vue-router";

const router = useRouter();

export const register = async (email, password, confirmPassword, firstName, lastName, age, ) => {
  console.log("Registering user in auth.js");
    if (password === confirmPassword) {
        try {

            const userMetadata = {
                first_name: firstName,
                last_name: lastName,
                age: age,
                first_time_signup: true,
                theme: "light-theme"
            };

            console.log("Registering user in auth.js with metadata: ", userMetadata);

            const { user, error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: userMetadata }
            });
            console.log("Supabase response", user, error);
            if (error) throw error;
        } catch (error) {
            console.error("Error registering user", error);
            throw new Error(error.message);
        }
    } else {
        console.error("Passwords do not match");
        throw new Error("Passwords do not match");
    }
};

export const login = async (email, password) => {
  try {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
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

export const updateMetadata = async (metadata) => {
    try {
        const { error } = await supabase.auth.update({ data: metadata, options: { refresh: true } });
        if (error) throw error;
    } catch (error) {
        console.error("Error updating metadata", error);
        throw error;
    }
}
