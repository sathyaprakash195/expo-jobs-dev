import { PRIMARY_COLOR } from "@/constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const customTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: PRIMARY_COLOR,
    },
  };
  return (
    <PaperProvider theme={customTheme}>
      <StatusBar style="inverted" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PaperProvider>
  );
}
