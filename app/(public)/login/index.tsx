import CustomButton from "@/components/ui/custom-button";
import CustomDropdown from "@/components/ui/custom-dropdown";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import FlexBox from "@/components/ui/flexbox";
import { PRIMARY_COLOR, USER_ROLES } from "@/constants";
import { loginUser } from "@/services/users";
import { IUsersStore, useUsersStore } from "@/store/users-store";
import { RelativePathString, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const { setUser }: IUsersStore = useUsersStore() as IUsersStore;
  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await loginUser(data);
      if (response.success) {
        const routes: any = {
          job_seeker: "/(private)/job-seeker/home",
          recruiter: "/(private)/recruiter/home",
        };
        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: response.message,
        });
        setTimeout(() => {
          setUser(response.data);
          router.push(routes[data.role] as RelativePathString);
        }, 1000);
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: response.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <FlexBox backgroundColor={PRIMARY_COLOR} flex={1}>
            <FlexBox gap={5} paddingHorizontal={30} paddingVertical={40}>
              <CustomText
                value="Welcome Back"
                fontSize={34}
                fontColor="#fff"
                fontWeight="bold"
              />
              <CustomText
                value="Please fill the form to contine"
                fontSize={14}
                fontColor="#c2c2c2"
              />
            </FlexBox>
            <FlexBox
              style={{
                borderTopRightRadius: 50,
              }}
              backgroundColor={"white"}
              flex={1}
              paddingHorizontal={30}
              paddingVertical={40}
              gap={20}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Email"
                    errorMessage={"Email is required"}
                    error={errors.email ? true : false}
                  />
                )}
                name="email"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomDropdown
                    options={USER_ROLES}
                    onValueChange={onChange}
                    value={value}
                    label="Role"
                    errorMessage={"Role is required"}
                    error={errors.role ? true : false}
                  />
                )}
                name="role"
              />

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Password"
                    errorMessage={"Password is required"}
                    error={errors.password ? true : false}
                    secureTextEntry
                  />
                )}
                name="password"
              />

              <CustomButton onPress={handleSubmit(onSubmit)} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </CustomButton>

              <FlexBox flexDirection="row" justifyContent="center" gap={5}>
                <CustomText
                  fontWeight="bold"
                  value="Don't have an account?"
                  fontSize={14}
                />
                <Pressable
                  onPress={() => {
                    router.push("/(public)/register");
                  }}
                >
                  <CustomText
                    fontWeight="bold"
                    value="Register"
                    fontSize={14}
                    fontColor={PRIMARY_COLOR}
                  />
                </Pressable>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
