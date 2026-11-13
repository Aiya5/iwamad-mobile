import { router } from "expo-router";
import { useSavedIds } from "../../src/hooks/useSavedIds";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEvents } from "../../src/hooks/useEvents";
import EventRow from "../../src/components/EventRow";

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const { savedIds, setSavedIds, loaded } = useSavedIds();
  const [search, setSearch] = useState("");

  const filtered = (data ?? []).filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  function toggleSaved(id: number) {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <Text style={styles.info}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
       </Text>
        <TextInput
          style={styles.search}
          placeholder="Search events"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {isPending && <ActivityIndicator style={styles.center} />}
      {isPending && <Text style={styles.centerText}>Loading events</Text>}

      {isError && (
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Could not load events</Text>
          <Text style={styles.errorMsg}>{error.message}</Text>
          <Pressable onPress={() => refetch()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      )}

      {!isPending && !isError && (
        <FlatList
          data={filtered}
          keyExtractor={(e) => String(e.id)}
          renderItem={({ item }) => (
            <EventRow
              event={item}
              onPress={() => router.push(`/events/${item.id}`)}
              onToggleSaved={() => toggleSaved(item.id)}
              saved={savedIds.includes(item.id)}
            />
          )}
          ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
          refreshing={isRefetching}
          onRefresh={() => refetch()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: { paddingHorizontal: 16, paddingTop: 100, paddingBottom: 16 },
  info: { marginBottom: 8, color: "#4b5563" },
  search: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    fontSize: 16,
  },
  center: { alignItems: "center", marginTop: 24, paddingHorizontal: 16 },
  centerText: { textAlign: "center", marginTop: 8, color: "#4b5563" },
  errorTitle: { fontSize: 18, fontWeight: "bold", color: "#b91c1c" },
  errorMsg: { color: "#b91c1c", marginTop: 4, marginBottom: 12 },
  retryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    minHeight: 44,
    justifyContent: "center",
  },
  retryText: { color: "#ffffff", fontWeight: "bold" },
  empty: { textAlign: "center", color: "#4b5563", marginTop: 24 },
});