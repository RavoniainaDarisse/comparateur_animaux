import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

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

function HomeScreen() {
  const [animal, setAnimal] = useState<AnimalType | null>(null);
  const [imageData, setImageData] = useState<AnimalImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAnimalImage = async (type: AnimalType): Promise<void> => {
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
      console.error('Erreur lors du chargement de l’image :', err);
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Comparateur Animaux</Text>
          {/* <Text style={styles.headerDate}>{currentDate}</Text> */}
        </View>

        <Text style={styles.subtitle}>
          Découvrez des images aléatoires de chiens et de chats
        </Text>

        <Text style={styles.chooseText}>
          Choisissez votre animal préféré ci-dessous
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => fetchAnimalImage('dog')}
            style={[
              styles.animalButton,
              { backgroundColor: animal === 'dog' ? '#5B21B6' : '#8B5CF6' },
            ]}
          >
            <FontAwesome5
              name="dog"
              size={24}
              color="#fff"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.animalButtonText}>Chiens</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => fetchAnimalImage('cat')}
            style={[
              styles.animalButton,
              { backgroundColor: animal === 'cat' ? '#5B21B6' : '#8B5CF6' },
            ]}
          >
            <FontAwesome5
              name="cat"
              size={24}
              color="#fff"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.animalButtonText}>Chats</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#6366F1" />
          ) : imageData ? (
            <Image
              source={{ uri: imageData.url }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.cardText}>
              Sélectionnez un animal pour voir une image
            </Text>
          )}
        </View>

        <View style={styles.card}>
          {imageData?.breeds?.[0] ? (
            <>
              <Text style={styles.cardText}>
                Race : {imageData.breeds[0].name}
              </Text>
              <Text style={styles.cardText}>
                Origine : {imageData.breeds[0].origin}
              </Text>
            </>
          ) : (
            <Text style={styles.cardText}>
              Les informations sur la race s'afficheront ici
            </Text>
          )}
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => fetchAnimalImage('dog')}
        >
          <FontAwesome5
            name="dog"
            size={24}
            color={animal === 'dog' ? '#fff' : '#9CA3AF'}
          />
          <Text
            style={[
              styles.tabText,
              { color: animal === 'dog' ? '#fff' : '#9CA3AF' },
            ]}
          >
            Chiens
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => fetchAnimalImage('cat')}
        >
          <FontAwesome5
            name="cat"
            size={24}
            color={animal === 'cat' ? '#fff' : '#9CA3AF'}
          />
          <Text
            style={[
              styles.tabText,
              { color: animal === 'cat' ? '#fff' : '#9CA3AF' },
            ]}
          >
            Chats
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

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
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    backgroundColor: '#8B5CF6', 
    paddingVertical: 10,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerDate: {
    fontSize: 12,
    position: 'absolute',
    right: 0,
    top: 0,
    color: '#6B7280',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 8,
    color: '#374151',
  },
  chooseText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#6B7280',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  animalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  animalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#6D28D9',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabButton: {
    alignItems: 'center',
  },
  
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
