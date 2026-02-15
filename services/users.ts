import { supabaseConfig } from "@/config/supabase-config";
import { IUser } from "@/interfaces";

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : register user with supabase auth
    const response = await supabaseConfig.auth.signUp({
      email: payload.email!,
      password: payload.password!,
    });

    if (response.error) {
      throw response.error;
    }

    const dbPayload = {
      name: payload.name,
      profile_picture_url: "",
      email: payload.email,
      resume_url: "",
      role: payload.role,
    };

    // step 2 : insert user details in user_profiles table
    const { error } = await supabaseConfig
      .from("user_profiles")
      .insert(dbPayload);

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: null,
      message: "User registered successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (payload: {
  email: string;
  password: string;
  role: string;
}) => {
  try {
    // step 1 : sign in user with supabase auth
    const response = await supabaseConfig.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (response.error) {
      throw response.error;
    }

    const email = response.data.user?.email;
    const dbRecord = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (dbRecord.error) {
      throw dbRecord.error;
    }

    const user = dbRecord.data;

    if (user.role !== payload.role) {
      throw new Error("User role mismatch");
    }

    return {
      success: true,
      data: user,
      message: "User logged in successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const getLoggedInUser = async () => {
  try {
    // step 1 : get logged in user from supabase auth
    const response = await supabaseConfig.auth.getUser();

    if (response.error) {
      throw response.error;
    }
    const email = response.data.user?.email;

    if (!email) {
      throw new Error("User not logged in");
    }

    // step 2 : get user details from user_profiles table
    const dbRecord = await supabaseConfig
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (dbRecord.error) {
      throw dbRecord.error;
    }

    return {
      success: true,
      data: dbRecord.data,
      message: "User fetched successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabaseConfig.auth.signOut();
    if (error) {
      throw error;
    }
    return {
      success: true,
      message: "User logged out successfully",
    };
  } catch (error) {
    throw error;
  }
};
