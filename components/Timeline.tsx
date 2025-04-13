'use client'

import { useState } from "react";
import { useTimelinePosition } from "../src/app/hooks/useTimelinePosition";
import timelineItems from "../src/app/timelineItems";
import Modal from './Modal';

export default function Timeline() {
  const [items, setItems] = useState(timelineItems);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<null | {
    name: string;
    start: string;
    end: string;
  }>(null);
  const { getOffset, getWidth, months } = useTimelinePosition(items);

  return (
    <>
      <div className="w-full bg-zinc-50 p-6">
        <div className="flex flex-col border rounded border-purple-400 w-full overflow-x-auto">
          <div className="min-w-[1300px]">

            {/* Cabeçalho de meses */}
            <div className="flex border-b border-zinc-300 bg-white text-sm text-zinc-700 w-full pt-1 pr-1">
              <div className="w-[300px] px-3 py-2 font-bold border-r border-zinc-200 shrink-0">
                Tasks
              </div>
              <div className="flex relative min-w-[1200px] bg-white">
                {months.map((month, i) => (
                  <div
                    key={i}
                    className="text-center border-l border-zinc-300 px-2 py-2 whitespace-nowrap text-xs"
                    style={{
                      width: `${(month.dayCount / months.reduce((acc, m) => acc + m.dayCount, 0)) * 100}%`,
                    }}
                  >
                    {month.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de tarefas com drag & drop + modal */}
            {items.map((item, i) => {
              const left = getOffset(item.start);
              const width = getWidth(item.start, item.end);
              const safeLeft = Math.min(left, 100);
              const safeWidth = Math.min(width, 100 - safeLeft);

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedId(item.id)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (item.id !== draggedId) {
                      setHoverId(item.id);
                    }
                  }}
                  onDragEnd={() => {
                    if (draggedId !== null && hoverId !== null && draggedId !== hoverId) {
                      const fromIndex = items.findIndex(i => i.id === draggedId);
                      const toIndex = items.findIndex(i => i.id === hoverId);

                      const newItems = [...items];
                      const [removed] = newItems.splice(fromIndex, 1);
                      newItems.splice(toIndex, 0, removed);
                      setItems(newItems);
                    }
                    setDraggedId(null);
                    setHoverId(null);
                  }}
                  onClick={() => {
                    setSelectedTask({ name: item.name, start: item.start, end: item.end });
                    setIsModalOpen(true);
                  }}
                  className={`flex items-center border-b border-zinc-100 cursor-grab transition-colors duration-200 ${
                    draggedId === item.id ? "bg-purple-100" : ""
                  }`}
                >
                  {/* Nome da tarefa */}
                  <div className="w-[300px] px-3 py-2 text-sm text-zinc-600 border-r border-zinc-200 shrink-0 whitespace-nowrap">
                    {item.name}
                  </div>

                  {/* Linha da timeline */}
                  <div className="relative w-full h-12 ml-1 mr-1">
                    <div
                      className="absolute h-8 rounded p-2 text-white text-xs px-3 flex items-center shadow"
                      style={{
                        left: `${safeLeft}%`,
                        width: `${safeWidth}%`,
                        backgroundColor: `hsl(${(i * 45) % 360}, 70%, 60%)`,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onSave={(data) => {
          console.log("Dados atualizados:", data);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
