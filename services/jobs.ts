import { supabaseConfig } from "@/config/supabase-config";

import { IJob } from "@/interfaces";

export const addNewJob = async (payload: Partial<IJob>) => {
  try {
    const { data, error } = await supabaseConfig
      .from("jobs")
      .insert(payload)
      .select("*");
    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

export const getAllJobsOfRecruiter = async (recruiterId: number) => {
  try {
    const { data, error } = await supabaseConfig
      .from("jobs")
      .select("*")
      .eq("recruiter_id", recruiterId)
      .order("created_at", { ascending: true });
    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

export const getJobById = async (jobId: number) => {
  try {
    const { data, error } = await supabaseConfig
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();
    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

export const updateJobById = async (jobId: number, payload: Partial<IJob>) => {
  try {
    const { data, error } = await supabaseConfig
      .from("jobs")
      .update(payload)
      .eq("id", jobId);

    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

export const deleteJobById = async (jobId: number) => {
  try {
    const { data, error } = await supabaseConfig
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) {
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    throw error;
  }
};
