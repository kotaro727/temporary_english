import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        <View style={styles.buttonContent}>
          <Ionicons name="chevron-back" size={20} color={isFirst ? '#CCCCCC' : '#FFFFFF'} />
          <Text style={styles.buttonText}>前へ</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.nextButton, isLast && styles.disabled]}
        onPress={onNext}
        disabled={isLast}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.nextButtonText}>次へ</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    minWidth: 120,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 6, // アイコンとテキストの間隔
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  prevButton: {
    backgroundColor: '#AAAAAA',
  },
  nextButton: {
    backgroundColor: '#00A3FF',
  },
  disabled: {
    opacity: 0.5,
  },
});
