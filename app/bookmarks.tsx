import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { loadQuestions } from '../src/utils/loadQuestions';
import { Question } from '../src/utils/loadQuestions';

const BOOKMARKS_STORAGE_KEY = 'bookmarkedQuestionIds';

export default function BookmarksScreen() {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarkedQuestions();
  }, []);

  const loadBookmarkedQuestions = async () => {
    try {
      setLoading(true);
      const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      const bookmarkedIds = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      
      // 全ての問題を取得
      const allQuestions = loadQuestions();
      
      // ブックマークされた問題だけをフィルター
      const filteredQuestions = allQuestions.filter(q => 
        bookmarkedIds.includes(q.id)
      );
      
      setBookmarkedQuestions(filteredQuestions);
    } catch (error) {
      console.error('ブックマークの読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToQuestion = (questionId: number) => {
    // 質問画面に移動し、特定の質問IDを指定
    router.push({
      pathname: '/',
      params: { questionId: questionId.toString() }
    });
  };

  const renderItem = ({ item }: { item: Question }) => (
    <TouchableOpacity 
      style={styles.questionItem}
      onPress={() => navigateToQuestion(item.id)}
    >
      <View style={styles.questionContent}>
        <Text style={styles.questionText}>{item.jp}</Text>
        <Text style={styles.translationText}>{item.en}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#AAAAAA" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>ブックマーク</Text>
        <View style={styles.rightSpace} />
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <Text style={styles.loadingText}>読み込み中...</Text>
        </View>
      ) : bookmarkedQuestions.length === 0 ? (
        <View style={styles.centerContent}>
          <Ionicons name="star-outline" size={48} color="#AAAAAA" />
          <Text style={styles.emptyText}>ブックマークがありません</Text>
          <Text style={styles.emptySubText}>問題画面で⭐をタップして追加できます</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarkedQuestions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  rightSpace: {
    width: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#888888',
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  questionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  translationText: {
    fontSize: 14,
    color: '#666666',
  },
});