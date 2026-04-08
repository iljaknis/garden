import type { Note } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: string) => void;
}

function formatDate(iso: string | null) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <div className="flex gap-1 shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onEdit(note)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDelete(note.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                {note.tags.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mt-1">
                        {note.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardHeader>

            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                    {note.content}
                </p>
            </CardContent>

            <CardFooter className="text-xs text-muted-foreground">
                <span>Erstellt: {formatDate(note.creationDate)}</span>
                {note.updateDate && (
                    <span className="ml-auto">Bearbeitet: {formatDate(note.updateDate)}</span>
                )}
            </CardFooter>
        </Card>
    );
}
