import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    name: string;
    start: string;
    end: string;
  } | null;
  onSave: (data: { name: string; start: string; end: string }) => void;
}

export default function Modal({ isOpen, onClose, task, onSave }: ModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 bg flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar tarefa</h2>

        <label className="block mb-2 text-sm font-medium text-zinc-700">Name:</label>
        <input
          ref={nameRef}
          defaultValue={task.name}
          className="w-full p-2 border border-zinc-300 rounded mb-4 outline-purple-500"
        />

        <label className="block mb-2 text-sm font-medium text-zinc-700">Start:</label>
        <input
          ref={startRef}
          type="date"
          defaultValue={task.start}
          className="w-full p-2 border border-zinc-300 rounded mb-4 outline-purple-500"
        />

        <label className="block mb-2 text-sm font-medium text-zinc-700">End:</label>
        <input
          ref={endRef}
          type="date"
          defaultValue={task.end}
          className="w-full p-2 border border-zinc-300 rounded mb-6 outline-purple-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-zinc-300 rounded hover:bg-zinc-400"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                name: nameRef.current?.value || '',
                start: startRef.current?.value || '',
                end: endRef.current?.value || '',
              })
            }
            className="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
