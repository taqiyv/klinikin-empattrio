import { Tabs } from "expo-router";
import { Image } from "react-native";
import { COLORS } from "../../constants/color";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar
        translucent={true}
      />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;

            if (route.name === "home") {
              icon = focused
                ? require("../../assets/icons/home.png")
                : require("../../assets/icons/home.png");
            } else if (route.name === "search") {
              icon = focused
                ? require("../../assets/icons/search.png")
                : require("../../assets/icons/search.png");
            } else if (route.name === "appointments") {
              icon = focused
                ? require("../../assets/icons/appointment.png")
                : require("../../assets/icons/appointment.png");
            } else if (route.name === "profile") {
              icon = focused
                ? require("../../assets/icons/profile.png")
                : require("../../assets/icons/profile.png");
            }

            return (
              <Image
                source={icon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? COLORS.primary : "gray",
                }}
              />
            );
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#B0B0B0",
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Beranda",
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Cari Klinik",
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: "Janji Temu",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
          }}
        />
      </Tabs>
    </>
  );
}
