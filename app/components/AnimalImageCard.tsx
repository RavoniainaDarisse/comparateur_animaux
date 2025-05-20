import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

interface Props {
  loading: boolean;
  url?: string;
}

export default function AnimalImageCard({ loading, url }: Props) {
  return (
    <View style={styles.card}>
      {loading ? (
        <ActivityIndicator size="large" color="#6366F1" />
      ) : url ? (
        <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={styles.text}>Sélectionnez un animal pour voir une image</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
    elevation: 4,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  text: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
});
