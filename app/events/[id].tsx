import { Stack, useLocalSearchParams } from "expo-router";
import HolidayNote from "../../src/components/HolidayNote";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEvents } from "../../src/hooks/useEvents";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();
  const event = (data ?? []).find((e) => e.id === Number(id));

  if (isPending) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Loading events" }} />
        <ActivityIndicator />
        <Text style={styles.center}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Error" }} />
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.errorMsg}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.retryBtn}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

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
      <HolidayNote date={event.date} />
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  meta: { fontSize: 16, color: "#4b5563", marginBottom: 4 },
  center: { textAlign: "center", marginTop: 16, color: "#4b5563" },
  errorTitle: { fontSize: 18, fontWeight: "bold", color: "#b91c1c" },
  errorMsg: { color: "#b91c1c", marginTop: 4, marginBottom: 12 },
  retryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  retryText: { color: "#ffffff", fontWeight: "bold" },
});