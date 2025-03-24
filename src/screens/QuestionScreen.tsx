import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
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
      setCurrentIndex((prev) => prev + 1);
      setIsJapanese(true);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsJapanese(true);
    }
  };

  const toggleLanguage = () => {
    setIsJapanese((prev) => !prev);
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
      <PanGestureHandler onGestureEvent={handleGesture}>
        <SafeAreaView style={styles.container}>
          {/* 進捗表示 */}
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              <Text style={styles.modeIndicator}>{isJapanese ? 'JP' : 'EN'}</Text>
            </View>
            <Text style={styles.progressText}>
              {currentIndex + 1} / {questions.length}
            </Text>
          </View>

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
        </SafeAreaView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  progressContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00A3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeIndicator: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A3FF',
  },
});
