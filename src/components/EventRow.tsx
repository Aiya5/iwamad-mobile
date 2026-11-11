import { Pressable, StyleSheet, Text } from "react-native";
import type { CampusEvent } from "../data/events";

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  saved: boolean;
};

export default function EventRow({ event, onPress, onLongPress, saved }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    minHeight: 44,
  },
  cardPressed: {
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meta: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 4,
  },
  saved: {
    marginTop: 6,
    color: "#1d4ed8",
    fontWeight: "bold",
  },
});