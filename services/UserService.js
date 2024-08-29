import { supabase } from "../lib/supabase";

export const getUserData = async (userId) => {
  try {
    const { data, err } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();
    if (err) {
      return { success: false, msg: err?.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log("getUserDataError: >>", error);
    return { success: false, msg: error.message };
  }
};
