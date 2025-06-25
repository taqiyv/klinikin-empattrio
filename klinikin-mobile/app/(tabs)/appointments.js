import { View, Text, TouchableOpacity } from "react-native";
import LoginCard from "../../components/LoginCard";
import { useAuth } from "../../context/authContext";
import API from "../../lib/api";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export default function Appointments() {
  const { isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchAppointments = async () => {
        try {
          const response = await API.get("/appointment", {
            withCredentials: true,
          });
          setAppointments(response.data.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      };

      if (isAuthenticated) {
        fetchAppointments();
      }
    }, [isAuthenticated])
  );

  const handleDelete = async (appointmentId) => {
    try {
      const response = await API.delete(`/appointment/${appointmentId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== appointmentId)
        );
      } else {
        alert("Gagal menghapus janji temu");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Terjadi kesalahan saat menghapus janji temu");
    }
  };

  if (!isAuthenticated) {
    return <LoginCard page="Janji temu" />;
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View
      style={{ flex: 1, padding: 16, marginTop: 25, backgroundColor: "#fff" }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        Daftar Janji Temu
      </Text>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: "#ccc",
          paddingBottom: 8,
        }}
      >
        <Text style={{ flex: 2, fontWeight: "bold" }}>Pasien</Text>
        <Text style={{ flex: 2, fontWeight: "bold" }}>Klinik</Text>
        <Text style={{ flex: 2, fontWeight: "bold" }}>Tanggal</Text>
        <Text style={{ flex: 1, fontWeight: "bold" }}></Text>
      </View>
      {appointments.length === 0 ? (
        <Text style={{ marginTop: 24, textAlign: "center", color: "#888" }}>
          Tidak ada janji temu.
        </Text>
      ) : (
        appointments.map((appointment, index) => (
          <View
            key={appointment.id}
            style={{
              flexDirection: "row",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: "#f0f0f0",
              backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 2 }}>{appointment.patient.name}</Text>
            <Text style={{ flex: 2 }}>{appointment.clinic.name}</Text>
            <Text style={{ flex: 2 }}>
              {new Date(appointment.date).toLocaleDateString()}
            </Text>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#ff4d4f",
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 4,
                alignItems: "center",
              }}
              onPress={() => handleDelete(appointment.id)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Hapus</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}
