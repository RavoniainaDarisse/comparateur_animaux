import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>🐾 Comparateur Mignon 🐾</Text>
      <Text style={styles.subtitle}>Chats vs Chiens</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFE4E1', // Rose pastel mignon
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D2691E', // Marron doux
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
