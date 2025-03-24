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
  isLast,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.prevButton, isFirst && styles.disabled]}
        onPress={onPrev}
        disabled={isFirst}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>前へ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.nextButton, isLast && styles.disabled]}
        onPress={onNext}
        disabled={isLast}
        activeOpacity={0.7}
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
    paddingBottom: 40,
  },
  button: {
    padding: 16,
    borderRadius: 30,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00A3FF',
  },
  nextButton: {
    backgroundColor: '#00A3FF',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00A3FF',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
});
