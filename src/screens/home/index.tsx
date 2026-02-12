import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { CarListItem } from '@/components/CarListItem';
import { fetchCarsPage } from '@/network/carsApi';
import type { Car } from '@/types/car';

import { styles } from './index.styles';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const loadPage = useCallback((pageNum: number, append: boolean) => {
    return fetchCarsPage(pageNum).then(({ data, hasMore: nextHasMore }) => {
      setCars((prev) => (append ? [...prev, ...data] : data));
      setHasMore(nextHasMore);
      setPage(pageNum);
    });
  }, []);

  useEffect(() => {
    loadPage(0, false).finally(() => setLoading(false));
  }, [loadPage]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPage(0, false).finally(() => setRefreshing(false));
  }, [loadPage]);

  const handleEndReached = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    loadPage(page + 1, true).finally(() => setLoadingMore(false));
  }, [loadPage, loadingMore, hasMore, page]);

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

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#6366F1" />
      </View>
    );
  }, [loadingMore]);

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#6366F1"
          />
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
