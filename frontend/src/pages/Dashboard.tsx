import { useState, useEffect, useCallback } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "../services/api";
import type { Note, NoteRequest } from "../services/api";
import NoteCard from "../components/NoteCard";
import NoteDialog from "../components/NoteDialog";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Plus } from "lucide-react";

type SortOption = "newest" | "oldest" | "title";

// Maps frontend sort options to backend ?sort= values
const SORT_API_VALUE: Record<SortOption, string | undefined> = {
  newest: undefined, // backend default: creationDate asc — we reverse client-side
  oldest: undefined, // backend default: creationDate asc
  title: "title",
};

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortOption>("newest");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchNotes(SORT_API_VALUE[sort]);
      // Backend returns creationDate ascending; reverse for "newest first"
      setNotes(sort === "newest" ? [...data].reverse() : data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  async function handleSave(data: NoteRequest, id?: string) {
    if (id) {
      await updateNote(id, data);
    } else {
      await createNote(data);
    }
    loadNotes();
  }

  async function handleDelete(id: string) {
    await deleteNote(id);
    loadNotes();
  }

  function openCreate() {
    setEditingNote(null);
    setDialogOpen(true);
  }

  function openEdit(note: Note) {
    setEditingNote(note);
    setDialogOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-gray-100 text-2xl font-bold">Meine Notizen</h1>
          <Button className="text-white hover:text-slate-900 bg-sky-500/50" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Neue Notiz
          </Button>
        </div>

        {/* Sort */}
        <div className="text-center gap-2 mb-6">
          {(["newest", "oldest", "title"] as SortOption[]).map((opt) => (
            <Button
              key={opt}
              variant={sort === opt ? "default" : "outline"}
              size="sm"
              onClick={() => setSort(opt)}
            >
              {opt === "newest" && "Neueste"}
              {opt === "oldest" && "Älteste"}
              {opt === "title" && "Titel A–Z"}
            </Button>
          ))}
        </div>

        {/* Notes grid */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <p className="text-muted-foreground text-center items-center py-12">
            Noch keine Notizen vorhanden. Erstelle deine erste!
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Create / Edit dialog */}
        <NoteDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          note={editingNote}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
