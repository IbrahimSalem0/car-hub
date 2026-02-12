import { Image, Pressable, Text, View } from 'react-native';

import type { Car } from '@/types/car';

import { styles } from './styles';

type CarListItemProps = {
  car: Car;
  onPress: () => void;
};

export function CarListItem({ car, onPress }: CarListItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: car.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name}>{car.name}</Text>
        <Text style={styles.brand}>{car.brand}</Text>
        <Text style={styles.price}>${car.price.toLocaleString()}</Text>
      </View>
    </Pressable>
  );
}
