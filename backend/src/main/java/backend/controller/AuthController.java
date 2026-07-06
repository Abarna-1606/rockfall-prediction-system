package backend.controller;

import backend.entity.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("name", user.get().getName());
            response.put("role", user.get().getRole());
            response.put("email", user.get().getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401)
                .body(Map.of("message", "Invalid email or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String name = body.get("name");
        String password = body.get("password");
        String role = body.getOrDefault("role", "OPERATOR");

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(400)
                .body(Map.of("message", "Email already exists"));
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);

        userRepository.save(user);
        return ResponseEntity.ok(
            Map.of("message", "Registration successful"));
    }
}