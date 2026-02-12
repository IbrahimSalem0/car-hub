import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { CarListItem } from '@/components/CarListItem';
import { fetchCars } from '@/network/carsApi';
import type { Car } from '@/types/car';

import { styles } from './index.styles';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCars().then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  const handleCarPress = useCallback(
    (car: Car) => {
      router.push({ pathname: '/details', params: { id: car.id } });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Car; index: number }) => (
      <CarListItem
        car={{ ...item, image: item.images[index % item.images.length] }}
        onPress={() => handleCarPress(item)}
      />
    ),
    [handleCarPress]
  );

  const keyExtractor = useCallback((item: Car) => item.id, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Car Hub' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading cars...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Car Hub' }} />
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
