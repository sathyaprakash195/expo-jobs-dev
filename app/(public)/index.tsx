import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { getLoggedInUser } from "@/services/users";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const { setUser } = useUsersStore() as IUsersStore;
  const router = useRouter();
  const chechAuthSession = async () => {
    try {
      const response = await getLoggedInUser();
      setUser(response.data);
      const routes: any = {
        job_seeker: "/(private)/job-seeker/home",
        recruiter: "/(private)/recruiter/home",
      };
      router.push(routes[response.data.role]);
    } catch (error) {
      router.push("/(public)/welcome");
    }
  };

  useEffect(() => {
    chechAuthSession();
  }, []);

  return (
    <FlexBox flex={1} alignItems="center" justifyContent="center">
      <CustomText value="Loading..." />
    </FlexBox>
  );
}
