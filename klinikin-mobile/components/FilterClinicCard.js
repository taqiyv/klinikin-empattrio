import { View, ScrollView } from 'react-native';
import KlinikCard from './ClinikCard';

export default function FilterClinicCard({ clinics }) {
    return (
        <View style={{ marginTop: 20 }}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
        >
            {clinics.map((item) => (
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