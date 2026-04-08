package dev.knis.garden.controller;

import dev.knis.garden.dto.LoginRequest;
import dev.knis.garden.dto.LoginResponse;
import dev.knis.garden.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body(new LoginResponse(false, "Username und Password sind erforderlich"));
        }

        boolean valid = authService.validateLogin(request.getUsername(), request.getPassword());

        if (valid) {
            return ResponseEntity.ok(new LoginResponse(true, "Login erfolgreich"));
        } else {
            return ResponseEntity.status(401)
                    .body(new LoginResponse(false, "Ungültige Zugangsdaten"));
        }
    }
}
