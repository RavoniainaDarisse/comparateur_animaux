import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  name?: string;
  origin?: string;
}

export default function AnimalInfoCard({ name, origin }: Props) {
  return (
    <View style={styles.card}>
      {name ? (
        <>
          <Text style={styles.text}>Race : {name}</Text>
          <Text style={styles.text}>Origine : {origin}</Text>
        </>
      ) : (
        <Text style={styles.text}>
          Les informations sur la race s'afficheront ici
        </Text>
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
  text: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
});
