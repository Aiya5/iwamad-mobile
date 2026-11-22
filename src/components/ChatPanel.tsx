import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

type Props = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: Props) {
  const [messages, status] = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(eventId, trimmed);
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Write a message"
        value={text}
        onChangeText={setText}
        maxLength={200}
      />
      
      <Pressable
        onPress={handleSend}
        disabled={!text.trim()}
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.status}>Connecting</Text>}
      {status === 'error' && <Text style={styles.statusError}>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text style={styles.status}>No messages yet</Text>}

      {messages.slice().reverse().map((m) => (
        <Text key={m.id} style={styles.message}>
          <Text style={styles.author}>{m.author}: </Text>
          {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingBottom: 24 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { padding: 10, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, fontSize: 16, marginBottom: 8 },
  button: { paddingVertical: 12, backgroundColor: '#1d4ed8', borderRadius: 8, alignItems: 'center', minHeight: 44, justifyContent: 'center', marginBottom: 16 },
  buttonDisabled: { backgroundColor: '#9ca3af' },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  status: { textAlign: 'center', color: '#4b5563', marginTop: 8 },
  statusError: { textAlign: 'center', color: '#b91c1c', marginTop: 8 },
  message: { fontSize: 15, color: '#1f2937', marginBottom: 8, lineHeight: 20 },
  author: { fontWeight: 'bold' },
});