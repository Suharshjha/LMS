package com.example.LMS.Service;

import com.example.LMS.Dto.Request.IssueRequestDto;
import com.example.LMS.Dto.Response.IssueResponseDto;
import com.example.LMS.Models.Books;
import com.example.LMS.Repository.BooksRepository;
import com.example.LMS.Repository.IssuedBookRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final BooksRepository booksRepository;
    private final IssuedBookRepository issuedBookRepository;
    private final LibrarianService librarianService;

    public UserService(BooksRepository booksRepository,
                       IssuedBookRepository issuedBookRepository,
                       LibrarianService librarianService) {

        this.booksRepository = booksRepository;
        this.issuedBookRepository = issuedBookRepository;
        this.librarianService = librarianService;
    }

    // 1️⃣ Search books
    public List<Books> searchBooks(String keyword) {
        return booksRepository.searchBooks(keyword);
    }

    // 2️⃣ User requests a book → use the librarian service logic
    public IssueResponseDto requestBook(IssueRequestDto dto) {
        return librarianService.createIssueRequest(dto);
    }

    // 3️⃣ Books issued to this user
    public List<IssueResponseDto> getIssuedBooks(Long userId) {
        return librarianService.getUserIssued(userId);
    }
}
