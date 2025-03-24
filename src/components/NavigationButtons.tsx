import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  showNext: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  showPrevious,
  showNext,
}) => {
  return (
    <View style={styles.container}>
      {showPrevious && (
        <TouchableOpacity style={styles.button} onPress={onPrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
      )}
      {showNext && (
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NavigationButtons;