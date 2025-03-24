import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuestionCardProps {
  question: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default QuestionCard;