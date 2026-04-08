import { useState, useEffect } from "react";
import type { Note, Tag, NoteRequest } from "../services/api";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ALL_TAGS: Tag[] = ["TAG1", "TAG2", "TAG3"];

interface NoteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    note: Note | null; // null = create mode
    onSave: (data: NoteRequest, id?: string) => void;
}

export default function NoteDialog({ open, onOpenChange, note, onSave }: NoteDialogProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setTags(note.tags);
        } else {
            setTitle("");
            setContent("");
            setTags([]);
        }
    }, [note, open]);

    function toggleTag(tag: Tag) {
        setTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave({ title, content, tags }, note?.id);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {note ? "Notiz bearbeiten" : "Neue Notiz"}
                        </DialogTitle>
                        <DialogDescription>
                            {note
                                ? "Bearbeite die Felder und speichere die Änderungen."
                                : "Fülle die Felder aus, um eine neue Notiz zu erstellen."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Titel</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Titel der Notiz"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">Inhalt</Label>
                            <textarea
                                id="content"
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Inhalt der Notiz"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Tags</Label>
                            <div className="flex gap-2 flex-wrap">
                                {ALL_TAGS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                                            tags.includes(tag)
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-muted text-muted-foreground border-transparent hover:border-border"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Abbrechen
                        </Button>
                        <Button type="submit">
                            {note ? "Speichern" : "Erstellen"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
