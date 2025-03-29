import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Animated,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QuestionCard } from '../components/QuestionCard';
import { NavigationButtons } from '../components/NavigationButtons';
import { Header } from '../components/Header';
import { ProgressHeader } from '../components/ProgressHeader';
import { SideMenu } from '../components/SideMenu';
import { loadQuestions } from '../utils/loadQuestions';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const BOOKMARKS_STORAGE_KEY = 'bookmarkedQuestionIds';

export const QuestionScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const questions = loadQuestions();

  // URLパラメータからquestionIdを取得して初期インデックスを設定
  const initialQuestionId = params.questionId ? parseInt(params.questionId as string, 10) : null;
  const initialIndex = initialQuestionId
    ? Math.max(
        0,
        questions.findIndex((q) => q.id === initialQuestionId),
      )
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isJapanese, setIsJapanese] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  // メニューアニメーション用
  const slideAnim = useRef(new Animated.Value(-300)).current;

  // ブックマークデータの読み込み
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
        if (storedBookmarks) {
          setBookmarkedIds(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('ブックマークの読み込みエラー:', error);
      }
    };

    loadBookmarks();
  }, []);

  // ブックマークデータの保存
  const saveBookmarks = async (ids: number[]) => {
    try {
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.error('ブックマークの保存エラー:', error);
    }
  };

  // 現在の問題がブックマークされているかどうか
  const isCurrentQuestionBookmarked = () => {
    return bookmarkedIds.includes(questions[currentIndex].id);
  };

  // ブックマークのトグル
  const toggleBookmark = () => {
    const currentQuestionId = questions[currentIndex].id;
    let newBookmarkedIds: number[];

    if (isCurrentQuestionBookmarked()) {
      // ブックマークを解除
      newBookmarkedIds = bookmarkedIds.filter((id) => id !== currentQuestionId);
      showToast('ブックマークを解除しました');
    } else {
      // ブックマークを追加
      newBookmarkedIds = [...bookmarkedIds, currentQuestionId];
      showToast('ブックマークに追加しました');
    }

    setBookmarkedIds(newBookmarkedIds);
    saveBookmarks(newBookmarkedIds);
  };

  // トースト表示（プラットフォームに応じて）
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      // iOS用の通知（Alertを使用）
      Alert.alert('', message, [{ text: 'OK' }], { cancelable: true });
    }
  };

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

  // ブックマーク一覧ページに移動
  const navigateToBookmarks = () => {
    toggleMenu();
    router.push('/bookmarks');
  };

  // メニュー項目の定義
  const menuItems = [
    {
      id: 'bookmarks',
      icon: 'star',
      label: 'ブックマーク一覧',
      iconColor: '#00A3FF',
      onPress: navigateToBookmarks,
    },
    {
      id: 'settings',
      icon: 'settings-outline',
      label: '設定',
      onPress: () => {
        toggleMenu();
        // 設定画面への遷移（未実装）
      },
    },
  ];

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
              isBookmarked={isCurrentQuestionBookmarked()}
              onToggleBookmark={toggleBookmark}
              questionId={questions[currentIndex].id}
            />

            <NavigationButtons
              onPrev={handleSwipeRight}
              onNext={handleSwipeLeft}
              isFirst={currentIndex === 0}
              isLast={currentIndex === questions.length - 1}
            />
          </View>
        </PanGestureHandler>

        {/* サイドメニューをコンポーネントとして使用 */}
        <SideMenu
          visible={menuVisible}
          onClose={toggleMenu}
          slideAnim={slideAnim}
          menuItems={menuItems}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#FFFFFF',
    zIndex: 20,
    paddingTop: 20,
  },
  menuHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 12,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#444444',
  },
});
