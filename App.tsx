import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import QuestionScreen from './src/screens/QuestionScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <QuestionScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;