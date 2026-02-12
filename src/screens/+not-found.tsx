import { Link, Stack } from 'expo-router';

import { Text, View } from 'react-native';

import { Container } from '@/components/Container';

import { styles } from './not-found.styles';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text style={styles.title}>{"This screen doesn't exist."}</Text>
        <Link href="/home" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </Container>
    </View>
  );
}
