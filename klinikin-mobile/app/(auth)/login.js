import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import API from "../../lib/api";
import { useAuth } from "../../context/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("isi email dan password");
      return;
    }
    setIsLoading(true);

    try {
      const res = await API.post(
        "/login/patient",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        alert("Login Berhasil");
        setIsAuthenticated(true);
        router.replace("/(tabs)/home");
      } else {
        alert("Login Gagal", res.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login Klinikin</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {isLoading ? <ActivityIndicator color="white" /> : <Text>LOGIN</Text>}
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Belum punya akun?{" "}
            <Text
              style={styles.linkHighlight}
              onPress={() => router.replace("/register")}
            >
              Daftar di sini
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F94C66",
  },
  card: {
    width: "90%",
    maxWidth: 350,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#F94C66",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  linkContainer: {
    marginTop: 10,
  },
  linkText: {
    color: "gray",
  },
  linkHighlight: {
    color: "#b30000",
  },
});
