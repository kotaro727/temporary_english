import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionCard } from '../components/QuestionCard';
import { NavigationButtons } from '../components/NavigationButtons';
import { loadQuestions } from '../utils/loadQuestions';

export const QuestionScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJapanese, setIsJapanese] = useState(true);
  const questions = loadQuestions();

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const toggleLanguage = () => {
    setIsJapanese(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <QuestionCard
        question={questions[currentIndex]}
        isJapanese={isJapanese}
        onToggleLanguage={toggleLanguage}
      />
      <NavigationButtons
        onPrev={handlePrev}
        onNext={handleNext}
        isFirst={currentIndex === 0}
        isLast={currentIndex === questions.length - 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }
});