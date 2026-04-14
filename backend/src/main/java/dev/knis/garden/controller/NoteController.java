package dev.knis.garden.controller;

import dev.knis.garden.dto.NoteRequest;
import dev.knis.garden.dto.NoteResponse;
import dev.knis.garden.dto.UpdateNoteRequest;
import dev.knis.garden.model.Tag;
import dev.knis.garden.service.NoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteResponse>> getAllNotes(
            @RequestParam(name = "sort", required = false) String sort) {
        return ResponseEntity.ok(
                noteService.findAll(sort).stream().map(NoteResponse::from).toList()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<List<NoteResponse>> searchNotes(
            @RequestParam(name = "q" , required = false) String q,
            @RequestParam(name = "tag", required = false) Tag tag,
            @RequestParam(name = "sort", required = false) String sort) {
        return ResponseEntity.ok(
                noteService.search(q, tag, sort).stream().map(NoteResponse::from).toList()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getNoteById(@PathVariable String id) {
        return ResponseEntity.ok(NoteResponse.from(noteService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@RequestBody NoteRequest request) {
        return ResponseEntity.status(201).body(NoteResponse.from(noteService.createNote(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> updateNote(@PathVariable String id, @RequestBody UpdateNoteRequest request) {
        return ResponseEntity.ok(NoteResponse.from(noteService.updateNote(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable String id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
