package dev.knis.garden.test;

import dev.knis.garden.dto.NoteRequest;
import dev.knis.garden.dto.UpdateNoteRequest;
import dev.knis.garden.model.Note;
import dev.knis.garden.model.Tag;
import dev.knis.garden.repository.NoteRepository;
import dev.knis.garden.service.NoteService;

import java.util.List;

public class TestLogic {

    public static void main(String[] args) {

        NoteRepository noteRepository = new NoteRepository();
        NoteService noteService = new NoteService(noteRepository);

        // Create
        NoteRequest req = new NoteRequest();
        NoteRequest req2 = new NoteRequest();
        req.setTitle("Hello World");
        req.setContent("Mein erster Eintrag");
        req.setTags(List.of(Tag.TAG1, Tag.TAG2));
        req2.setTitle("Hello Earth");
        req2.setContent("Mein zweiter Eintrag");
        req2.setTags(List.of(Tag.TAG3));

        Note created = noteService.createNote(req);
        Note created2 = noteService.createNote(req2);
        System.out.println("Created: " + created);
        System.out.println("Created: " + created2);

        // Update
        UpdateNoteRequest updateRequest = new UpdateNoteRequest();
        updateRequest.setTitle("Hello World");

        Note updated =  noteService.updateNote(created.getId(), updateRequest);
        System.out.println("Updated: " + updated);
        System.out.println(noteService.findAllByTitleContains("Hello"));
        System.out.println(noteService.findAllByTitle("Hello World"));

    }
}
