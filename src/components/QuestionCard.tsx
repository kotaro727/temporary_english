import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Question } from '../utils/loadQuestions';
import { Ionicons } from '@expo/vector-icons';

interface QuestionCardProps {
  question: Question;
  isJapanese: boolean;
  onToggleLanguage: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isJapanese,
  onToggleLanguage,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={onToggleLanguage} activeOpacity={0.8}>
        <View style={styles.cardHeader}>
          <View style={{ flex: 1 }} />
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
        </View>
        <Text style={styles.text}>{isJapanese ? question.jp : question.en}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  bookmarkButton: {
    padding: 5,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 42,
    fontWeight: '500',
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
