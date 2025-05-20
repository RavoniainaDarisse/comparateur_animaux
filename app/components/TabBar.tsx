import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  selected: 'dog' | 'cat' | null;
  onSelect: (type: 'dog' | 'cat') => void;
}

export default function TabBar({ selected, onSelect }: Props) {
  return (
    <View style={styles.tabBar}>
      {(['dog', 'cat'] as const).map((type) => {
        const isSelected = selected === type;
        const backgroundColor = isSelected
          ? type === 'dog'
            ? '#FFD700' // Jaune chien
            : '#FFB6C1' // Rose chat
          : 'transparent';
        const textColor = isSelected ? '#fff' : '#6B7280';

        return (
          <TouchableOpacity
            key={type}
            onPress={() => onSelect(type)}
            style={[styles.button, { backgroundColor }]}
          >
            <FontAwesome5
              name={type}
              size={24}
              color={isSelected ? '#fff' : '#6B7280'}
            />
            <Text style={[styles.text, { color: textColor }]}>
              {type === 'dog' ? 'Chiens 🐶' : 'Chats 🐱'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
  },
});
