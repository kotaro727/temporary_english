import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Question } from '../utils/loadQuestions';

interface QuestionCardProps {
  question: Question;
  isJapanese: boolean;
  onToggleLanguage: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isJapanese,
  onToggleLanguage,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onToggleLanguage} activeOpacity={0.8}>
        <Text style={styles.text}>{isJapanese ? question.jp : question.en}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 42,
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    width: '80%',
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00A3FF',
    borderRadius: 3,
  },
  hintText: {
    color: '#888888',
    fontSize: 14,
  },
});
