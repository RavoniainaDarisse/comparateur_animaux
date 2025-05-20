import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import AnimalButton from '../components/AnimalButton';
import AnimalImageCard from '../components/AnimalImageCard';
import AnimalInfoCard from '../components/AnimalInfoCard';
import TabBar from '../components/TabBar';
import Header from '../components/Header';

type AnimalType = 'dog' | 'cat';

interface Breed {
  name: string;
  origin?: string;
}

interface AnimalImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: Breed[];
}

export default function HomeScreen() {
  const [animal, setAnimal] = useState<AnimalType | null>(null);
  const [imageData, setImageData] = useState<AnimalImage | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAnimalImage = async (type: AnimalType) => {
    setLoading(true);
    setAnimal(type);
    setImageData(null);

    const url =
      type === 'dog'
        ? 'https://api.thedogapi.com/v1/images/search'
        : 'https://api.thecatapi.com/v1/images/search';

    try {
      const res = await fetch(url);
      const data: AnimalImage[] = await res.json();
      setImageData(data[0]);
    } catch (err) {
      console.error('Erreur lors du chargement :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.subtitle}>Découvrez des images aléatoires de chiens et de chats</Text>
        <Text style={styles.choose}>Choisissez votre animal préféré ci-dessous</Text>

        <View style={styles.buttonRow}>
          <AnimalButton type="dog" selected={animal === 'dog'} onPress={() => fetchAnimalImage('dog')} />
          <AnimalButton type="cat" selected={animal === 'cat'} onPress={() => fetchAnimalImage('cat')} />
        </View>

        <AnimalImageCard loading={loading} url={imageData?.url} />
        <AnimalInfoCard name={imageData?.breeds?.[0]?.name} origin={imageData?.breeds?.[0]?.origin} />
      </View>

      <TabBar selected={animal} onSelect={(type) => fetchAnimalImage(type)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    marginVertical: 8,
    textAlign: 'center',
  },
  choose: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
});
