package com.example.LMS.Controller;

import com.example.LMS.Models.Books;
import com.example.LMS.Models.User;
import com.example.LMS.Repository.BooksRepository;
import com.example.LMS.Repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final BooksRepository booksRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository,
                           BooksRepository booksRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.booksRepository = booksRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 1️⃣ Add new user (ADMIN / LIBRARIAN / USER)
    @PostMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        System.out.println("hello11............");
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        System.out.println("hello.22...........");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        System.out.println("hello33............");
        return ResponseEntity.ok("User Added Successfully");
    }

    // 2️⃣ Get all users
    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // 3️⃣ View all books (Admin cannot add, only read)
    @GetMapping("/all-books")
    public ResponseEntity<List<Books>> getAllBooks() {
        return ResponseEntity.ok(booksRepository.findAll());
    }
}
