import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { createPortal } from "react-dom";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ---------------- Styles ---------------- */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  padding: 20,
};

const modalStyle = {
  background: "#fff",
  borderRadius: 16,
  maxWidth: 650,
  width: "100%",
  maxHeight: "85vh",
  overflowY: "auto",
  padding: "20px 24px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
};

/* ---------------- Sortable Wrapper ---------------- */
function SortableDayWrapper({ id, children }) {
  const { setNodeRef, transform, transition, attributes, listeners } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {children({ attributes, listeners })}
    </div>
  );
}

/* ---------------- Component ---------------- */
export default function ItineraryModal({
  open,
  onClose,
  state,
  places = [],
  itinerary = [],
  user,
  onDeleteDay,
  onReorderDays,
}) {
  if (!open) return null;

  /* ✅ LOCAL WORKING COPY (FIX) */
  const [localItinerary, setLocalItinerary] = useState([]);

  /* sync ONLY when modal opens */
  useEffect(() => {
    if (open) {
      setLocalItinerary(itinerary);
    }
  }, [open, itinerary]);

  /* ---------- Drag reorder ---------- */
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = localItinerary.findIndex((d) => d.day === active.id);
    const newIndex = localItinerary.findIndex((d) => d.day === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(localItinerary, oldIndex, newIndex);
    setLocalItinerary(reordered);
    onReorderDays?.(reordered);
  };

  /* ---------- Image resolver ---------- */
  const getDayImage = (day) => {
    const first = day?.activities?.[0]?.toLowerCase() || "";
    const match = places.find((p) =>
      first.includes(p.name.toLowerCase())
    );
    return match?.img || "";
  };

  /* ---------- Delete day (FIXED) ---------- */
  const handleDelete = (dayId) => {
    if (!user) {
      alert("Please sign in with Google to modify itinerary");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this day?")) return;

    const updated = localItinerary.filter((d) => d.day !== dayId);
    setLocalItinerary(updated);      // 🔥 instant UI update
    onDeleteDay(dayId);              // 🔥 parent/backend sync
  };
const resolveHotel = (day) => {
  if (day.hotel) return day.hotel;

  // fallback: find original hotel using day label
  const original = itinerary.find((d) => d.day === day.day);
  return original?.hotel || null;
};

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      <Motion.div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 style={{ marginTop: 0 }}>{state} — Itinerary</h2>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={localItinerary.map((d) => d.day)}
            strategy={verticalListSortingStrategy}
          >
            {localItinerary.map((day, index) => (
              <SortableDayWrapper key={day.day} id={day.day}>
                {({ attributes, listeners }) => (
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      background: "#F8FAFC",
                      borderRadius: 14,
                      padding: 12,
                      marginBottom: 12,
                      border: "1px solid rgba(15,23,35,0.08)",
                      position: "relative",
                    }}
                  >
                    {/* Drag */}
                    <span
                      {...attributes}
                      {...listeners}
                      style={{
                        cursor: "grab",
                        fontSize: 18,
                        color: "#475569",
                        userSelect: "none",
                        marginTop: 4,
                      }}
                    >
                      ☰
                    </span>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(day.day)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 16,
                        color: "#DC2626",
                      }}
                    >
                      🗑️
                    </button>

                    {getDayImage(day) && (
                      <img
                        src={getDayImage(day)}
                        alt={day.day}
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 12,
                          objectFit: "cover",
                        }}
                      />
                    )}

                    <div style={{ flex: 1 }}>
  {(() => {
    const hotel = resolveHotel(day);

    return (
      <>
        <h3 style={{ margin: "0 0 4px" }}>
          Day {index + 1}
        </h3>

        <ul style={{ margin: "0 0 6px", paddingLeft: 16 }}>
          {(day.activities || []).map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>

        {day.hotel && (
  <p style={{ margin: 0 }}>
    <strong>Hotel:</strong>{" "}
    <a href={day.hotel.link} target="_blank" rel="noreferrer">
      {day.hotel.name}
    </a>
  </p>
)}

      </>
    );
  })()}
</div>

                  </div>
                )}
              </SortableDayWrapper>
            ))}
          </SortableContext>
        </DndContext>

        <button
          onClick={onClose}
          style={{
            marginTop: 8,
            padding: "6px 14px",
            borderRadius: 8,
            border: "none",
            background: "#1E6FB2",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Motion.div>
    </div>,
    document.body
  );
}
