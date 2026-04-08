package dev.knis.garden.dto;

import dev.knis.garden.model.Tag;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class UpdateNoteRequest {

    @Getter
    @Setter
    private String title;

    @Getter
    @Setter
    private String content;

    @Getter
    @Setter
    private List<Tag> tags;
}
