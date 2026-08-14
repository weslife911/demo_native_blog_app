import { Stack, useRouter } from "expo-router";
import SplashScreen from "./(splash)";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetUserDataQuery } from "@/services/queries/useAuthQueries";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function RootLayoutNav() {
  const router = useRouter();
  const { data: userData, isLoading, isError } = useGetUserDataQuery();

  useEffect(() => {
    if (!isLoading) {
      if (userData && !isError) {
        router.replace("/(blog)");
      } else {
        router.replace("/(auth)");
      }
    }
  }, [isLoading, userData, isError, router]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/index" />
      <Stack.Screen name="(auth)/signup" />
      <Stack.Screen name="(blog)/index" />
      <Stack.Screen name="(blog)/blog_detail" />
      <Stack.Screen name="(blog)/blog_summary" />
      <Stack.Screen name="(blog)/create_blog" />
      <Stack.Screen name="(onboarding)/index" />
      <Stack.Screen name="(profile)/index" />
      <Stack.Screen name="(splash)/index" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}