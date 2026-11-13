import { Pressable, StyleSheet, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from "react-native-reanimated";
import type { CampusEvent } from "../data/events";

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  saved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  saved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>
              {saved ? "Unsave" : "Save"}
            </Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
  cardPressed: { backgroundColor: "#e5e7eb" },
  title: { fontSize: 18, fontWeight: "bold" },
  meta: { fontSize: 14, color: "#4b5563", marginTop: 4 },
  saved: { marginTop: 6, color: "#1d4ed8", fontWeight: "bold" },
  action: {
    width: 100,
    marginVertical: 8,
    marginRight: 16,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
  },
  actionText: { color: "#ffffff", fontWeight: "bold" },
});