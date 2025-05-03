import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ChatMessage = {
  role: 'user' | 'assistant';
  message: string;
};

const ChatbotScreen = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const LLM_API_URL = 'http://192.168.143.226:5000/api/llm';

  const handleUserInput = async () => {
    if (!userInput.trim()) return;
  
    const jsonInput = { input_text: userInput }; // Kirim input dengan key 'input_text'
  
    setChatHistory((prev) => [...prev, { role: 'user', message: userInput }]);
    setUserInput('');
    setIsLoading(true);
  
    try {
      const resp = await fetch(LLM_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonInput), // Kirimkan data dengan key 'input_text'
      });
  
      if (resp.ok) {
        const data = await resp.json();
  
        // Pastikan data yang diterima memiliki key 'answer'
        const botReply = data.answer ?? 'Tidak ada jawaban dari server.';
        setChatHistory((prev) => [
          ...prev,
          { role: 'assistant', message: botReply },
        ]);
      } else {
        // Menangani error dari server jika status tidak 2xx
        const errorMessage = await resp.text();
        setChatHistory((prev) => [
          ...prev,
          { role: 'assistant', message: `Error: ${resp.status} - ${errorMessage}` },
        ]);
      }
    } catch (e) {
      // Menangani error jaringan atau kesalahan lainnya
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', message: `Gagal menghubungi server. Error: ` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>

      <FlatList
        data={chatHistory}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View
            style={[
              styles.chatBubble,
              item.role === 'assistant'
                ? styles.assistantBubble
                : styles.userBubble,
            ]}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tanyakan sesuatu ke BombaBot..."
          value={userInput}
          onChangeText={setUserInput}
          onSubmitEditing={handleUserInput}
        />
        <Button
          title={isLoading ? 'Loading...' : 'Kirim'}
          onPress={handleUserInput}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chatBubble: {
    maxWidth: '80%',
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },
  assistantBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#60B5FF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatbotScreen;
