import { useEffect, useState } from "react";
import { loadSavedIds, saveIds } from "../lib/savedStorage";

export function useSavedIds() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSavedIds().then((ids) => {
      setSavedIds(ids);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveIds(savedIds);
  }, [savedIds, loaded]);

  return { savedIds, setSavedIds, loaded };
}