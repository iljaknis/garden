package dev.knis.garden.service;

import dev.knis.garden.dto.NoteRequest;
import dev.knis.garden.dto.UpdateNoteRequest;
import dev.knis.garden.model.Note;
import dev.knis.garden.model.Tag;
import dev.knis.garden.repository.NoteRepository;
import dev.knis.garden.util.exception.NotFoundException;
import dev.knis.garden.util.exception.ValidationException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    private static final Logger logger = LogManager.getLogger(NoteService.class);

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(NoteRequest req) {

        if (req.getContent() == null || req.getContent().isEmpty()) {
            throw new ValidationException("Note content is empty");
        }

        if (req.getTitle() == null || req.getTitle().isEmpty()) {
            throw new ValidationException("Note title is empty");
        }

        Note note = new Note(req.getTitle(), req.getContent(), req.getTags());
        noteRepository.save(note);
        logger.info("Note created: {}", note);
        return note;
    }

    public Note updateNote(String id, UpdateNoteRequest req) {
        Note note = noteRepository.findById(id);

        if (note == null) {
            throw new NotFoundException("Note with id " + id + " not found");
        }

        if (req.getTitle() != null && req.getTitle().isBlank()) {
            throw new ValidationException("Note title is empty");
        }


        if (req.getTitle() != null) {
            note.setTitle(req.getTitle());
        }

        if (req.getContent() != null) {
            note.setContent(req.getContent());
        }

        if (req.getTags() != null) {
            note.getTags().clear();
            note.getTags().addAll(req.getTags());
        }
        note.setUpdateDate();
        noteRepository.save(note);
        logger.info("Note updated: {}", note);
        return note;
    }

    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    public Note findById(String id) {
        Note note = noteRepository.findById(id);
        if (note == null) {
            throw new NotFoundException("Note with id " + id + " not found");
        }
        return note;
    }

    public void deleteNote(String id) {
        if (!noteRepository.existsById(id)) {
            throw new NotFoundException("Note with id " + id + " not found");
        }
        noteRepository.delete(id);
        logger.info("Note deleted: {}", id);
    }

    public List<Note> findAllByTag(Tag tag) {
        return noteRepository.findAll().stream()
                .filter(n -> n.getTags().contains(tag))
                .toList();
    }

    public List<Note> findAllByTitle(String title) {
        return noteRepository.findAll().stream()
                .filter(n -> n.getTitle().equals(title))
                .toList();
    }

    public List<Note> findAllByTitleContains(String title){
        return noteRepository.findAll().stream()
                .filter(n -> n.getTitle().contains(title))
                .toList();
    }

    public List<Note> findAllByContentContains(String content) {
        return noteRepository.findAll().stream()
                .filter(n -> n.getContent().contains(content))
                .toList();
    }

}
