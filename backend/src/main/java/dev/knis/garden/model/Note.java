package dev.knis.garden.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import dev.knis.garden.util.IdGenerator;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Note {

    @Getter
    private String id;

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String content;

    @Getter
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime creationDate;

    @Getter
    @Setter
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updateDate;

    @Getter
    @Setter
    private List<Tag> tags;

    // Default Contructor
    public Note(){}

    public Note(String title, String content, List<Tag> tags) {
        this.id = IdGenerator.generateId();
        this.title = title;
        this.content = content;
        this.tags = tags != null ? tags : new ArrayList<>();
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
