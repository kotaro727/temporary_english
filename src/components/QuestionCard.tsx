import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Question } from '../utils/loadQuestions';

interface QuestionCardProps {
  question: Question;
  isJapanese: boolean;
  onToggleLanguage: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isJapanese,
  onToggleLanguage
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onToggleLanguage}
    >
      <Text style={styles.text}>
        {isJapanese ? question.jp : question.en}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32
  }
});