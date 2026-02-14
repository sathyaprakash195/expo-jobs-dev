import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const chechAuthSession = async () => {
    try {
      // for now navigate to welcome screen, later we will check for auth session and navigate accordingly
      // simulate 2 seconds delay to show the loading screen
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/(public)/welcome");
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
