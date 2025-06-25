import LoginCard from "../../components/LoginCard";
import { useAuth } from "../../context/authContext";
import API from "../../lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

export default function Profile() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const response = await API.get("/patient/me", {
            withCredentials: true,
          });
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const logout = async () => {
    try {
      await API.post("/logout", {}, { withCredentials: true });
      alert("Logout Berhasil");
      setIsAuthenticated(false);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleUpdate = () => {
    if (name.trim() === "") {
      alert("Name cannot be empty");
      return;
    }
    setTextInput(false);
    const updateUser = async () => {
      try {
        const response = await API.put(
          "/patient/update",
          { name },
          { withCredentials: true }
        );
        if (response.status === 200) {
          alert("Profile updated successfully");
          setUser({ ...user, name });
        } else {
          alert("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    };
    updateUser();
  };

  if (!isAuthenticated) {
    return <LoginCard page="Profile" />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Ensure TextInput is imported

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f6fa",
        alignItems: "center",
        paddingTop: 60,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          width: "90%",
          borderRadius: 16,
          padding: 24,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View
          style={{
            backgroundColor: "#F94C66",
            width: 80,
            height: 80,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 36, fontWeight: "bold" }}>
            {user?.name?.charAt(0) || "U"}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {textInput ? (
            <>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  width: 150,
                  textAlign: "center",
                  fontSize: 18,
                  paddingVertical: 4,
                  backgroundColor: "#f9f9f9",
                }}
                value={name}
                onChangeText={(text) => setName(text)}
                autoFocus
                placeholder="Enter name"
                returnKeyType="done"
                onSubmitEditing={handleUpdate}
              />
              <TouchableOpacity
                onPress={handleUpdate}
                style={{
                  backgroundColor: "#F94C66",
                  padding: 8,
                  borderRadius: 8,
                  marginLeft: 16,
                }}
              >
                <Text style={{ color: "#fff" }}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTextInput(false);
                  setName(user?.name || "");
                }}
                style={{
                  marginLeft: 8,
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: "#ccc",
                }}
              >
                <Text style={{ color: "#333" }}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text
                style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}
              >
                {user?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setTextInput(true);
                  setName(user?.name || "");
                }}
                style={{
                  backgroundColor: "#F94C66",
                  padding: 8,
                  borderRadius: 8,
                  marginLeft: 16,
                }}
              >
                <Image
                  source={require("../../assets/icons/pencil.png")}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <Text style={{ fontSize: 16, color: "#888", marginBottom: 24 }}>
          {user?.email}
        </Text>
        <TouchableOpacity
          onPress={logout}
          style={{
            backgroundColor: "#F94C66",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
