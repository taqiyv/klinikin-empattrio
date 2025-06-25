import { useEffect } from "react";
import { router } from "expo-router";
import { InteractionManager } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    const load = async () => {
      // simulasi loading data, misalnya auth
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };
    const task = InteractionManager.runAfterInteractions(() => {
      router.replace("/(tabs)/home");
    });
    load();
    return () => task.cancel();
  }, []);

  return null;
}
