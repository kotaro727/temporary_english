import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import NavigationButtons from '../components/NavigationButtons';
import { loadQuestions } from '../utils/loadQuestions';

const QuestionScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const questions = loadQuestions();

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <QuestionCard question={questions[currentIndex].question} />
      <NavigationButtons
        onNext={handleNext}
        onPrevious={handlePrevious}
        showPrevious={currentIndex > 0}
        showNext={currentIndex < questions.length - 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default QuestionScreen;