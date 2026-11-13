import { StyleSheet, Text } from "react-native";
import { useHolidays } from "../hooks/useHolidays";

type HolidayNoteProps = {
  date: string;
};

export default function HolidayNote({ date }: HolidayNoteProps) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.note}>Checking holidays</Text>;
  }

  if (isError) {
    return <Text style={styles.note}>Holidays unavailable</Text>;
  }

  const holiday = data?.find((h) => h.date === date);

  if (holiday) {
    return (
      <Text style={styles.note}>Public holiday: {holiday.name}</Text>
    );
  }

  return <Text style={styles.note}>Not a public holiday</Text>;
}

const styles = StyleSheet.create({
  note: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 8,
  },
});