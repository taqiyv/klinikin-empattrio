// app/_layout.tsx
import { Slot } from "expo-router";
import { AuthProvider } from "../context/authContext"; // pastikan path-nya bener

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
