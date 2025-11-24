package com.example.LMS.Controller;

import com.example.LMS.Models.Books;
import com.example.LMS.Models.DashboardStats;
import com.example.LMS.Models.User;
import com.example.LMS.Repository.BooksRepository;
import com.example.LMS.Repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    // Add new user (ADMIN / LIBRARIAN / USER)
    @PostMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("User Added Successfully");
    }

    // Get all users
    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // View all books
    @GetMapping("/all-books")
    public ResponseEntity<List<Books>> getAllBooks() {
        return ResponseEntity.ok(booksRepository.findAll());
    }

    // ================= REPORTS =================

    // Get all issued books
    @GetMapping("/reports/issued")
    public ResponseEntity<List<Books>> getIssuedBooks() {
        return ResponseEntity.ok(booksRepository.findByIssued(true));
    }

    // Get overdue books
    @GetMapping("/reports/overdue")
    public ResponseEntity<List<Books>> getOverdueBooks() {
        return ResponseEntity.ok(booksRepository.findOverdueBooks());
    }

    // Get most popular books (by issue count)
    @GetMapping("/reports/popular")
    public ResponseEntity<List<Books>> getPopularBooks() {
        return ResponseEntity.ok(booksRepository.findPopularBooks());
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalBooks = booksRepository.count();
        long issuedBooks = booksRepository.countByIssuedTrue();
        long overdueBooks = booksRepository.countByDueDateBeforeAndIssuedTrue(LocalDate.now());

        DashboardStats stats = new DashboardStats(totalUsers, totalBooks, issuedBooks, overdueBooks);
        return ResponseEntity.ok(stats);
    }
}
