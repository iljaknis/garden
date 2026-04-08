package dev.knis.garden.util.exception;

public class GardenException extends RuntimeException{

    public GardenException(String message) {
        super(message);
    }

    public GardenException(String message, Throwable cause) {
        super(message, cause);
    }

}
