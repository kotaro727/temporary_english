import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QuestionCard } from '../components/QuestionCard';
import { NavigationButtons } from '../components/NavigationButtons';
import { loadQuestions } from '../utils/loadQuestions';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

export const QuestionScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJapanese, setIsJapanese] = useState(true);
  const questions = loadQuestions();

  const handleSwipeLeft = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleLanguage = () => {
    setIsJapanese(prev => !prev);
  };

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    if (translationX > 50) {
      handleSwipeRight();
    } else if (translationX < -50) {
      handleSwipeLeft();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
      >
        <View style={styles.container}>
          <QuestionCard
            question={questions[currentIndex]}
            isJapanese={isJapanese}
            onToggleLanguage={toggleLanguage}
          />
          <NavigationButtons
            onPrev={handleSwipeRight}
            onNext={handleSwipeLeft}
            isFirst={currentIndex === 0}
            isLast={currentIndex === questions.length - 1}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }
});