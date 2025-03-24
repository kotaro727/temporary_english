import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ProgressHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  isJapanese: boolean;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  currentIndex,
  totalQuestions,
  isJapanese,
}) => {
  // 進捗率の計算を修正（1/10の時は0%にする）
  const progress = currentIndex === 0 ? 0 : currentIndex / (totalQuestions - 1);

  // パーセント文字列に変換
  const progressPercentage = `${Math.round(progress * 100)}%`;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.modeContainer}>
          <Text style={styles.modeIndicator}>{isJapanese ? 'JP' : 'EN'}</Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentIndex + 1} / {totalQuestions}
          </Text>

          {/* プログレスバー - 進捗表示の下に配置 */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: progressPercentage }]} />
            </View>
          </View>
        </View>
      </View>

      {/* <Text style={styles.hintText}>タップで{isJapanese ? '英語' : '日本語'}を表示</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  modeContainer: {
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
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A3FF',
    marginBottom: 8,
  },
  progressBarContainer: {
    alignItems: 'flex-end',
  },
  progressBar: {
    height: 8,
    width: 100, // 固定幅で進捗表示より少し大きめのサイズ
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00A3FF',
    borderRadius: 4,
  },
  hintText: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
});
