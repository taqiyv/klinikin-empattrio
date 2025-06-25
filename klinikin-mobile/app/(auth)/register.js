import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import API from "../../lib/api";
import { useRouter } from "expo-router";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await API.post("/register/patient", formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        alert("Registration successful");
        router.replace("/(auth)/login");
      } else {
        alert("Registration failed", response.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F94C66" }}>
      <View
        style={{
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
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>
        <TextInput
          style={{
            width: "80%",
            padding: 10,
            borderWidth: 1,
            marginBottom: 10,
          }}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={{
            width: "80%",
            padding: 10,
            borderWidth: 1,
            marginBottom: 10,
          }}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={{
            width: "80%",
            padding: 10,
            borderWidth: 1,
            marginBottom: 20,
          }}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            padding: 10,
            backgroundColor: "#F94C66",
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
