import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants/color";
import API from "../../lib/api";
import { useEffect, useState } from "react";
import ListClinic from "../../components/ListClinic";

export default function Home() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await API.get("/all-klinik");
        setClinics(response.data.data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Loading..." style={styles.searchInput} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 40,
            backgroundColor: COLORS.background,
            paddingBottom: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: COLORS.primary,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Selamat Datang di Klinikin
          </Text>
          <View>
            <Image
              source={require("../../assets/24751.jpg")}
              style={{
                width: "90%",
                height: 180,
                alignSelf: "center",
                borderRadius: 12,
                marginBottom: 8,
              }}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={{ marginTop: 24, flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: COLORS.primary,
              marginLeft: 16,
              marginBottom: 8,
            }}
          >
            Daftar Klinik
          </Text>
          <ListClinic klinik={clinics} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
