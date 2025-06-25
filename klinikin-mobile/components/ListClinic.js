import { ScrollView, View } from "react-native";
import KlinikCard from "./ClinikCard";

export default function ListClinic({ klinik }) {

  const shuffled = [...klinik].sort(() => Math.random() - 0.5);
  const randomKlinik = shuffled.slice(0, 4);
  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {randomKlinik.map((item) => (
          <KlinikCard
            key={item.id}
            id={item.id}
            image={`${item.images}.png`}
            name={item.name}
            rating={item.rating}
            address={item.address}
            category={item.specialization}
          />
        ))}
      </ScrollView>
    </View>
  );
}
