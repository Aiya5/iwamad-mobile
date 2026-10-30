import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { events } from "../../src/data/events";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Event not found" }} />
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{event.date}</Text>
      <Text style={styles.meta}>{event.place}</Text>
      <Text style={styles.meta}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#ffffff",
  paddingHorizontal: 16,
  paddingTop: 100, 
  paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  meta: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 4,
  },
});