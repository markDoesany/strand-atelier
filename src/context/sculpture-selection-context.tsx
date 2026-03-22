"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SculptureSelectionContextValue = {
  selectedId: string | null;
  hoveredId: string | null;
  setSelectedId: (id: string | null) => void;
  setHoveredId: (id: string | null | ((prev: string | null) => string | null)) => void;
  clearSelection: () => void;
};

const SculptureSelectionContext = createContext<SculptureSelectionContextValue | null>(null);

export function SculptureSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredIdState] = useState<string | null>(null);
  const setHoveredId = useCallback((value: string | null | ((prev: string | null) => string | null)) => {
    setHoveredIdState((prev) => (typeof value === "function" ? value(prev) : value));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedId(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearSelection();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearSelection]);

  /** Click outside canvas + dock clears selection (facets set selection on canvas). */
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (selectedId === null) return;
      const t = e.target as Node | null;
      if (!t) return;
      const inDock = (t as HTMLElement).closest?.("[data-insight-dock]");
      const inCanvas = (t as HTMLElement).closest?.("[data-sculpture-canvas]");
      if (!inDock && !inCanvas) clearSelection();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [selectedId, clearSelection]);

  const value = useMemo(
    () => ({
      selectedId,
      hoveredId,
      setSelectedId,
      setHoveredId,
      clearSelection,
    }),
    [selectedId, hoveredId, clearSelection],
  );

  return (
    <SculptureSelectionContext.Provider value={value}>{children}</SculptureSelectionContext.Provider>
  );
}

export function useSculptureSelection() {
  const ctx = useContext(SculptureSelectionContext);
  if (!ctx) {
    throw new Error("useSculptureSelection must be used within SculptureSelectionProvider");
  }
  return ctx;
}
