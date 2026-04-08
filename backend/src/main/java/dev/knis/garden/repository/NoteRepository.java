package dev.knis.garden.repository;

import dev.knis.garden.model.Note;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class NoteRepository {

    private final Map<String, Note> notes = new HashMap<>();

    public void save(Note note) {
        notes.put(note.getId(), note);
    }

    public Note findById(String id) {
        return notes.get(id);
    }

    public List<Note> findAll() {
        return new ArrayList<>(notes.values());
    }

    public void delete(String id) {
        notes.remove(id);
    }

    public boolean existsById(String id) {
        return notes.containsKey(id);
    }
}
