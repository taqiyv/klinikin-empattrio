import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import API from "../../lib/api";
import { useAuth } from "../../context/authContext";
import { COLORS } from "../../constants/color";
import ReviewForm from "../../components/ReviewForm";

export default function ClinicPage() {
  const { id } = useLocalSearchParams();
  const [clinic, setClinic] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const [clinicRes, reviewsRes] = await Promise.all([
          API.get(`/klinik/${id}`, { withCredentials: true }),
          API.get(`/review-klinik/${id}`, { withCredentials: true }),
        ])
        setClinic(clinicRes.data.data);
        setReviews(reviewsRes.data.reviews);
      } catch (error) {
        console.error("Error fetching clinic:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, [id]);

  const handlePress = async () => {
    if (!isAuthenticated) {
      alert("Silakan login untuk membuat janji temu");
      return;
    } else {
      try {
        const selectedDate = new Date(
          `${appointmentDate}T08:00:00`
        ).toISOString();
        const response = await API.post(
          "/appointment",
          {
            clinicId: id,
            date: selectedDate,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          alert("Janji temu berhasil dibuat");
        } else {
          alert("Gagal membuat janji temu");
        }
      } catch (error) {
        console.error("Error creating appointment:", error);
        alert("Gagal membuat janji temu");
      } 
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!clinic) {
    return <Text>Klinik tidak ditemukan</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: `${clinic.images}.png` }} style={styles.image} />
      <Text style={styles.title}>{clinic.name}</Text>
      <Text style={styles.address}>{clinic.address}</Text>
      <Text style={styles.location}>Lokasi: {clinic.location}</Text>
      <Text style={styles.rating}>Rating: {clinic.rating ?? 0} ⭐</Text>
      <Text style={styles.bpjs}>
        {clinic.acceptsBPJS ? "Menerima BPJS" : "Tidak menerima BPJS"}
      </Text>
      <Text style={styles.sectionTitle}>Spesialisasi:</Text>
      {clinic.specialization && clinic.specialization.length > 0 ? (
        clinic.specialization.map((spec, idx) => (
          <Text key={idx} style={styles.specialization}>
            • {spec.name}
          </Text>
        ))
      ) : (
        <Text style={styles.specialization}>-</Text>
      )}
      <Text style={styles.sectionTitle}>Deskripsi:</Text>
      <Text style={styles.description}>{clinic.description || "-"}</Text>
      {clinic.whatsappLink && (
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={() => Linking.openURL(clinic.whatsappLink)}
        >
          <Text style={styles.whatsappText}>Hubungi via WhatsApp</Text>
        </TouchableOpacity>
      )}
      {/* input date */}
      <Text style={styles.sectionTitle}>Pilih Tanggal Janji Temu:</Text>
      <View style={{ marginBottom: 12 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            padding: 10,
            fontSize: 16,
            backgroundColor: "#fafafa",
          }}
          placeholder="YYYY-MM-DD"
          value={appointmentDate}
          onChangeText={setAppointmentDate}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Buat Janji</Text>
      </TouchableOpacity>
      <ReviewForm id={clinic.id} isAuthenticated={isAuthenticated} setReviews={setReviews} reviews={reviews} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: "#555",
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  bpjs: {
    fontSize: 16,
    color: "#007b00",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 2,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  whatsappText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  review: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  reviewText: {
    fontSize: 15,
    color: "#444",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
