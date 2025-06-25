import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function LoginCard({page}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/11455479.jpg")} 
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Masuk untuk melihat {page}</Text>
        <Text style={styles.subtitle}>
          Untuk melihat {page}, kamu harus masuk terlebih dahulu!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // vertikal center
    alignItems: "center",     // horizontal center
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#EB445A", // sesuai warna tombol kamu
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
