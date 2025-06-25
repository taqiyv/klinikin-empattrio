import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function KlinikCard({
  id,
  image,
  name,
  rating,
  address,
  category,
}) {

  

  return (
      <Link style={styles.card} href={`/clinic/${id}`}>
        <Image source={{ uri: image }} style={styles.img} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" color="#FFD700" size={16} />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <Text style={styles.address}>{address}</Text>
          <View>
            {category.map((cat, index) => (
              <Text key={index} style={styles.category}>
                {cat.name}
              </Text>
            ))}
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buat Janji</Text>
          </TouchableOpacity>
        </View>
      </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  img: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.text,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  rating: {
    marginLeft: 4,
    fontWeight: "bold",
    color: COLORS.text,
  },
  review: {
    marginLeft: 4,
    color: COLORS.secondaryText,
    fontSize: 12,
  },
  address: {
    color: COLORS.secondaryText,
    fontSize: 12,
  },
  category: {
    marginTop: 4,
    backgroundColor: "#F2F2F2",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    color: COLORS.text,
  },
  button: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
