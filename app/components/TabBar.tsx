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
      {(['dog', 'cat'] as const).map((type) => (
        <TouchableOpacity key={type} onPress={() => onSelect(type)} style={styles.button}>
          <FontAwesome5
            name={type}
            size={24}
            color={selected === type ? '#fff' : '#9CA3AF'}
          />
          <Text style={[styles.text, { color: selected === type ? '#fff' : '#9CA3AF' }]}>
            {type === 'dog' ? 'Chiens' : 'Chats'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#6D28D9',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});
