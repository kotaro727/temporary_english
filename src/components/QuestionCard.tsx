import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Animated, Dimensions } from 'react-native';
import { Question } from '../utils/loadQuestions';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

interface QuestionCardProps {
  question: Question;
  isJapanese: boolean;
  onToggleLanguage: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  questionId: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isJapanese,
  onToggleLanguage,
  isBookmarked,
  onToggleBookmark,
  questionId,
}) => {
  // アニメーション用の値
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // スピーチの再生中かどうかの状態
  const [speaking, setSpeaking] = React.useState(false);

  // 問題が変わるたびにアニメーションを実行
  useEffect(() => {
    // 初期値に戻す
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // アニメーションを順番に実行
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // クリーンアップ - 音声を停止
    return () => {
      Speech.stop();
      setSpeaking(false);
    };
  }, [questionId, fadeAnim, slideAnim]);

  // 言語切り替え時に音声を停止
  useEffect(() => {
    Speech.stop();
    setSpeaking(false);
  }, [isJapanese]);

  // 表示するテキスト
  const displayText = isJapanese ? question.jp : question.en;

  // 音声再生関数
  const speak = () => {
    // 英語テキストのみ再生
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
      return;
    }

    setSpeaking(true);
    Speech.speak(question.en, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.9, // ゆっくり目
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          width: '100%',
        }}
      >
        <TouchableOpacity style={styles.card} onPress={onToggleLanguage} activeOpacity={0.8}>
          {/* ブックマークボタン */}
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={onToggleBookmark}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isBookmarked ? 'star' : 'star-outline'}
              size={24}
              color={isBookmarked ? '#FFD700' : '#AAAAAA'}
            />
          </TouchableOpacity>

          {/* 音声再生ボタン - 英語表示時のみ表示 */}
          {!isJapanese && (
            <TouchableOpacity
              style={styles.speakerButton}
              onPress={speak}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={speaking ? 'volume-high' : 'volume-medium'}
                size={24}
                color={speaking ? '#00A3FF' : '#AAAAAA'}
              />
            </TouchableOpacity>
          )}

          {/* テキストコンテナ */}
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.text,
                // 文字数に応じてフォントサイズを動的に調整
                displayText.length > 30 ? styles.smallerText : null,
                displayText.length > 50 ? styles.smallestText : null,
              ]}
              adjustsFontSizeToFit
              numberOfLines={5}
            >
              {displayText}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// 画面の幅を取得
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    aspectRatio: 1.5, // 幅と高さの比率を固定
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    // フレックスを使用して内部要素を配置
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 2,
  },
  speakerButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
    zIndex: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', // 上下中央
    alignItems: 'center', // 左右中央
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20, // ブックマークボタンのスペース確保
  },
  text: {
    fontSize: width < 350 ? 22 : 26,
    textAlign: 'center',
    lineHeight: width < 350 ? 34 : 38,
    fontWeight: '500',
  },
  smallerText: {
    fontSize: width < 350 ? 20 : 22,
    lineHeight: width < 350 ? 30 : 34,
  },
  smallestText: {
    fontSize: width < 350 ? 18 : 20,
    lineHeight: width < 350 ? 26 : 30,
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
