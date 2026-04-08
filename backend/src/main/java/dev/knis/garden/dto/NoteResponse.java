package dev.knis.garden.dto;

import dev.knis.garden.model.Note;
import dev.knis.garden.model.Tag;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class NoteResponse {

    private final String id;
    private final String title;
    private final String content;
    private final List<Tag> tags;
    private final LocalDateTime creationDate;
    private final LocalDateTime updateDate;

    private NoteResponse(String id, String title, String content, List<Tag> tags,
                         LocalDateTime creationDate, LocalDateTime updateDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
    }

    public static NoteResponse from(Note note) {
        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getTags(),
                note.getCreationDate(),
                note.getUpdateDate()
        );
    }
}
