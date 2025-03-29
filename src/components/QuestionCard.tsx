import React, { useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import * as Speech from 'expo-speech';
import { Question } from '../utils/loadQuestions';
import { Ionicons } from '@expo/vector-icons';

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
  }, [questionId, fadeAnim, slideAnim]);

  // 表示するテキスト
  const displayText = isJapanese ? question.jp : question.en;

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Animated.View
        className="w-full"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <TouchableOpacity 
          className="bg-white rounded-2xl p-5 w-full min-h-[200px] shadow-md shadow-black/10 relative flex justify-center items-center"
          onPress={onToggleLanguage} 
          activeOpacity={0.8}
        >
          {/* ボタン群 */}
          <View className="absolute top-2 right-2 flex-row gap-2 z-10">
            {/* スピーカーボタン (英語表示時のみ) */}
            {!isJapanese && (
              <TouchableOpacity
                onPress={() => Speech.speak(question.en, { language: 'en' })}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color="#555555"
                />
              </TouchableOpacity>
            )}
            {/* ブックマークボタン */}
            <TouchableOpacity
              onPress={onToggleBookmark}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={isBookmarked ? 'star' : 'star-outline'}
                size={24}
                color={isBookmarked ? '#FFD700' : '#AAAAAA'}
              />
            </TouchableOpacity>
          </View>

          {/* テキストコンテナ */}
          <View className="flex-1 justify-center items-center w-full px-2.5 pt-5">
            <Text
              className={`text-center font-medium 
                ${displayText.length > 30 ? 'text-lg' : 'text-xl'} 
                ${displayText.length > 50 ? 'text-base' : ''}
                md:text-2xl md:leading-10
                leading-8`}
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
