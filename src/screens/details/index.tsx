import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { fetchCarById } from '@/network/carsApi';
import type { Car } from '@/types/car';

import { styles } from './index.styles';

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchCarById(id).then((data) => {
      setCar(data);
      setLoading(false);
    });
  }, [id]);

  const handleCheckout = useCallback(() => {
    Alert.alert('Checkout', 'Order placed successfully! (Simulated)', [
      { text: 'OK' },
    ]);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Details' }} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Details' }} />
        <Text style={styles.errorText}>Car not found</Text>
      </View>
    );
  }

  const images = car.images.length > 0 ? car.images : [car.image];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: car.name }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageRow}>
          <Image
            source={{ uri: images[0] }}
            style={styles.imageLarge}
            resizeMode="cover"
          />
        </View>
        {images.length > 1 && (
          <View style={[styles.imageRow, styles.smallImagesRow]}>
            {images.slice(1, 5).map((uri, index) => (
              <Image
                key={`${uri}-${index}`}
                source={{ uri }}
                style={styles.imageSmall}
                resizeMode="cover"
              />
            ))}
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.name}>{car.name}</Text>
          <Text style={styles.brand}>{car.brand}</Text>
          <Text style={styles.price}>${car.price.toLocaleString()}</Text>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Year</Text>
            <Text style={styles.detailValue}>{car.year}</Text>
          </View>
          {car.mileage && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mileage</Text>
              <Text style={styles.detailValue}>{car.mileage}</Text>
            </View>
          )}
          {car.fuelType && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fuel type</Text>
              <Text style={styles.detailValue}>{car.fuelType}</Text>
            </View>
          )}
          {car.transmission && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transmission</Text>
              <Text style={styles.detailValue}>{car.transmission}</Text>
            </View>
          )}
          <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
            Available colors
          </Text>
          <View style={styles.colorsRow}>
            {car.availableColors.map((color) => (
              <View key={color} style={styles.colorChip}>
                <Text style={styles.colorChipText}>{color}</Text>
              </View>
            ))}
          </View>
          <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
