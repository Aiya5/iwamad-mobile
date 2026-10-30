export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: "React study night",
    date: "2026-10-22",
    place: "Room 302",
    seats: 20,
  },
  {
    id: 2,
    title: "TypeScript workshop",
    date: "2026-10-25",
    place: "Library Hall B",
    seats: 15,
  },
  {
    id: 3,
    title: "CSS layout clinic",
    date: "2026-10-28",
    place: "Room 105",
    seats: 2,
  },
  {
    id: 4,
    title: "Career talk: junior devs",
    date: "2026-11-02",
    place: "Auditorium A",
    seats: 50,
  },
];
