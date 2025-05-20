import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  type: 'dog' | 'cat';
  selected: boolean;
  onPress: () => void;
}

export default function AnimalButton({ type, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: selected ? '#5B21B6' : '#8B5CF6' },
      ]}
    >
      <FontAwesome5 name={type} size={24} color="#fff" style={{ marginBottom: 4 }} />
      <Text style={styles.text}>{type === 'dog' ? 'Chiens' : 'Chats'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
