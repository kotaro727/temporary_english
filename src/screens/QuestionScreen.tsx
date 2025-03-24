import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QuestionCard } from '../components/QuestionCard';
import { NavigationButtons } from '../components/NavigationButtons';
import { Header } from '../components/Header';
import { ProgressHeader } from '../components/ProgressHeader';
import { loadQuestions } from '../utils/loadQuestions';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

export const QuestionScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJapanese, setIsJapanese] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const questions = loadQuestions();

  // メニューアニメーション用
  const slideAnim = useRef(new Animated.Value(-300)).current;

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

  const toggleMenu = () => {
    if (menuVisible) {
      // メニューを閉じるアニメーション
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setMenuVisible(false);
      });
    } else {
      setMenuVisible(true);
      // メニューを開くアニメーション
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* ヘッダー */}
        <Header title="瞬間英作文" onMenuPress={toggleMenu} />

        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={styles.content}>
            {/* 進捗表示 */}
            <ProgressHeader
              currentIndex={currentIndex}
              totalQuestions={questions.length}
              isJapanese={isJapanese}
            />

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

        {/* サイドメニュー */}
        {menuVisible && (
          <TouchableOpacity style={styles.menuOverlay} activeOpacity={1} onPress={toggleMenu}>
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  toggleMenu();
                  // ここにメニュー項目の処理を追加
                }}
              >
                <Text style={styles.menuItemText}>設定</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  toggleMenu();
                  // ここにメニュー項目の処理を追加
                }}
              >
                <Text style={styles.menuItemText}>カテゴリー</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  toggleMenu();
                  // ここにメニュー項目の処理を追加
                }}
              >
                <Text style={styles.menuItemText}>お気に入り</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  toggleMenu();
                  // ここにメニュー項目の処理を追加
                }}
              >
                <Text style={styles.menuItemText}>ヘルプ</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 1001,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuItemText: {
    fontSize: 18,
    color: '#333333',
  },
});
