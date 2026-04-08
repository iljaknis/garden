package dev.knis.garden.util;

import java.util.UUID;

public class IdGenerator {

    private IdGenerator() {
        // Base constructor
    }

    public static String generateId() {
        return UUID.randomUUID().toString();
    }
}
