package dev.knis.garden.model;

import dev.knis.garden.util.IdGenerator;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class Note {

    @Getter
    private final String id = IdGenerator.generateId();

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String content;

    @Getter
    private final LocalDateTime creationDate;

    @Getter
    @Setter
    private LocalDateTime updateDate;

    @Getter
    private List<Tag> tags;

    public Note(String title, String content, List<Tag> tags) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.creationDate = LocalDateTime.now();
    }

    public void setUpdateDate() {
        this.updateDate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Note{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", tags=" + tags +
                ", createdAt=" + creationDate +
                ", updatedAt=" + updateDate +
                '}';
    }


}
