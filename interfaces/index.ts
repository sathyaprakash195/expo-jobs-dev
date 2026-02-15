export interface IUser {
  id: string;
  email: string;
  name: string;
  profile_picture_url: string;
  resume_url: string;
  created_at: string;
  password: string;
  role: "job_seeker" | "recruiter";
}

export interface IJob {
  id: number;
  created_at: string; // ISO timestamp
  recruiter_id: number | null;

  title: string | null;
  small_description: string | null;
  full_description: string | null;
  location: string | null;

  min_salary: number | null;
  max_salary: number | null;

  min_experience: number | null;
  max_experinece: number | null;

  last_date_to_apply: string | null; // YYYY-MM-DD
  skills_required: string[] | null;

  status: string | null;
  company: string | null;
}
