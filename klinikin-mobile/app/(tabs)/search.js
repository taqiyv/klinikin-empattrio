import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import API from "../../lib/api";
import FilterClinicCard from "../../components/FilterClinicCard";
import { COLORS } from "../../constants/color";

export default function FilterKlinikScreen() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [acceptsBPJS, setAcceptsBPJS] = useState(false);
  const [minRating, setMinRating] = useState("");
  const [specialization, setSpecialization] = useState(""); // string tunggal dulu

  const [results, setResults] = useState([]);

  const handleFilter = async () => {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (location) params.append("location", location);
    if (acceptsBPJS !== undefined)
      params.append("acceptsBPJS", acceptsBPJS.toString());
    if (minRating) params.append("minRating", minRating);
    if (specialization) params.append("specialization", specialization);

    try {
      const res = await API.get(`/filter-klinik?${params.toString()}`, {
        withCredentials: true,
      });
      setResults(res.data.data);
    } catch (err) {
      console.error("Gagal fetch:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nama Klinik</Text>
      <TextInput
        style={styles.input}
        placeholder="Klinik Sehat"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Lokasi</Text>
      <TextInput
        style={styles.input}
        placeholder="Jakarta"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Rating Minimal</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 4"
        keyboardType="numeric"
        value={minRating}
        onChangeText={setMinRating}
      />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Switch
          value={acceptsBPJS}
          onValueChange={(value) => setAcceptsBPJS(value)}
        />
        <Text style={{ marginLeft: 8 }}>Menerima BPJS</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFilter}>
        <Text style={styles.buttonText}>Buat Janji</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.label}>Hasil:</Text>
        <FilterClinicCard clinics={results} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  resultBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
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
