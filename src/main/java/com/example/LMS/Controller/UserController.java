package com.example.LMS.Controller;

import com.example.LMS.Dto.Request.IssueRequestDto;
import com.example.LMS.Models.Books;
import com.example.LMS.Dto.Response.IssueResponseDto;
import com.example.LMS.Service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 1️⃣ Search books (by name/category/author)
    @GetMapping("/search")
    public ResponseEntity<List<Books>> searchBooks(@RequestParam String keyword) {
        return ResponseEntity.ok(userService.searchBooks(keyword));
    }

    // 2️⃣ User requests to issue a book
    @PostMapping("/request-book")
    public ResponseEntity<IssueResponseDto> requestBook(@RequestBody IssueRequestDto dto) {
        return ResponseEntity.ok(userService.requestBook(dto));
    }

    // 3️⃣ Get books issued to this user
    @GetMapping("/issued/{userId}")
    public ResponseEntity<List<IssueResponseDto>> issuedBooks(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getIssuedBooks(userId));
    }
}
