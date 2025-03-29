import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {/* 右側のスペース（バランス用） */}
      <View style={styles.rightSpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  menuButton: {
    padding: 8,
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  rightSpace: {
    width: 40,
  },
});
