import { supabaseConfig } from "@/config/supabase-config";
import { IApplication } from "@/interfaces";

export const saveApplication = async (application: Partial<IApplication>) => {
  try {
    const { data, error } = await supabaseConfig
      .from("applications")
      .insert(application);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error saving application:", error);
    throw error;
  }
};

export const getApplicationOfJobSeeker = async (jobSeekerId: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("applications")
      .select("* , job:jobs(*)")
      .eq("job_seeker_id", jobSeekerId);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

export const getApplicationOfRecruiter = async (employerId: string) => {
  try {
    const { data, error } = await supabaseConfig
      .from("applications")
      .select("* , job:jobs(*) , job_seeker:user_profiles(*)")
      .eq("recruiter_id", employerId);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

export const updateApplicationStatus = async (
  applicationId: number,
  status: "applied" | "shortlisted" | "rejected" | "accepted",
) => {
  try {
    const { data, error } = await supabaseConfig
      .from("applications")
      .update({ status })
      .eq("id", applicationId);

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};
