import { View, TextInput, Button, Text, ActivityIndicator } from "react-native";
import { useState } from "react";
import API from "../lib/api";
import { COLORS } from "../constants/color";
import { AirbnbRating, Rating } from "react-native-ratings";

export default function ReviewForm({
  id,
  isAuthenticated,
  setReviews,
  reviews,
}) {
  const [reviewRating, setReviewRating] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      alert("Silakan login untuk mengirim ulasan");
      return;
    }
    if (!reviewRating || !reviewComment) {
      alert("Mohon isi rating dan komentar");
      return;
    }
    setSubmittingReview(true);
    try {
      const response = await API.post(
        "/review-klinik",
        {
          clinicId: id,
          rating: Number(reviewRating),
          comment: reviewComment,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("Ulasan berhasil dikirim");
        setReviewRating("");
        setReviewComment("");
        const refreshed = await API.get(`/review-klinik/${id}`);
        setReviews(refreshed.data.reviews);
      } else {
        alert("Gagal mengirim ulasan");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Gagal mengirim ulasan");
    } finally {
      setSubmittingReview(false);
    }
  };

return (
    <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
            Beri Rating (1-5)
        </Text>
        <Rating
            count={5}
            defaultRating={3}
            onFinishRating={(rating) => setReviewRating(String(rating))}
            style={{ marginBottom: 16 }}
            ratingColor="#FFD700"
            ratingBackgroundColor="#e0e0e0"
            imageSize={25}
        />

        <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
            Komentar
        </Text>
        <TextInput
            placeholder="Tulis komentarmu..."
            value={reviewComment}
            onChangeText={setReviewComment}
            multiline
            numberOfLines={4}
            style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                padding: 10,
                marginBottom: 14,
                borderRadius: 8,
                backgroundColor: "#fafafa",
                textAlignVertical: "top",
                fontSize: 16,
            }}
        />

        {submittingReview ? (
            <ActivityIndicator size="small" color="#1976d2" />
        ) : (
            <Button
                title="Kirim Ulasan"
                onPress={handleSubmitReview}
                color={COLORS.primary}
            />
        )}

        {reviews && reviews.length > 0 && (
            <View style={{ marginTop: 24 }}>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>
                    Ulasan
                </Text>
                {reviews.map((review, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                            marginBottom: 18,
                            backgroundColor: "#f5f5f5",
                            borderRadius: 10,
                            padding: 12,
                            shadowColor: "#000",
                            shadowOpacity: 0.05,
                            shadowRadius: 2,
                            elevation: 1,
                        }}
                    >
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: "#1976d2",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 12,
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                                {review.patient.name ? review.patient.name.charAt(0).toUpperCase() : "U"}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginRight: 8 }}>
                                    {review.patient.name}
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Text
                                            key={i}
                                            style={{
                                                color: i < review.rating ? "#FFD700" : "#ccc",
                                                fontSize: 16,
                                            }}
                                        >
                                            ★
                                        </Text>
                                    ))}
                                </View>
                            </View>
                            <Text style={{ color: "#333", fontSize: 15 }}>{review.comment}</Text>
                        </View>
                    </View>
                ))}
            </View>
        )}
    </View>
);
}
