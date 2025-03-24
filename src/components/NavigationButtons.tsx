import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  isFirst,
  isLast
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isFirst && styles.disabled]}
        onPress={onPrev}
        disabled={isFirst}
      >
        <Text style={styles.buttonText}>前へ</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, isLast && styles.disabled]}
        onPress={onNext}
        disabled={isLast}
      >
        <Text style={styles.buttonText}>次へ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center'
  },
  disabled: {
    backgroundColor: '#CCCCCC'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16
  }
});