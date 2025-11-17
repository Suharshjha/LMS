package com.example.LMS.Service;

import com.example.LMS.Dto.Request.IssueRequestDto;
import com.example.LMS.Dto.Response.IssueResponseDto;
import com.example.LMS.Exceptions.BadRequestException;
import com.example.LMS.Exceptions.ResourceNotFoundException;
import com.example.LMS.Models.Books;
import com.example.LMS.Models.IssuedBook;
import com.example.LMS.Models.User;
import com.example.LMS.Repository.BooksRepository;
import com.example.LMS.Repository.IssuedBookRepository;
import com.example.LMS.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibrarianService {

    private final IssuedBookRepository issuedBookRepository;
    private final UserRepository userRepository;
    private final BooksRepository booksRepository;

    // fine per day (adjust as needed)
    private static final BigDecimal FINE_PER_DAY = BigDecimal.valueOf(10); // currency units per day

    public LibrarianService(IssuedBookRepository issuedBookRepository,
                            UserRepository userRepository,
                            BooksRepository booksRepository) {
        this.issuedBookRepository = issuedBookRepository;
        this.userRepository = userRepository;
        this.booksRepository = booksRepository;
    }

    // CREATE REQUEST (can be called by a user via a public endpoint or by UI)
    public IssueResponseDto createIssueRequest(IssueRequestDto dto) {
        System.out.println("hello11...");
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        System.out.println("hello22...");
        Books book = booksRepository.findById(dto.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
        System.out.println("hello33...");
        IssuedBook request = new IssuedBook();
        request.setUser(user);
        request.setBook(book);
        LocalDate today = LocalDate.now();
        request.setIssueDate(today);

        // If due date provided use it, otherwise default 14 days
        LocalDate due = dto.getDueDate() != null ? dto.getDueDate() : today.plusDays(14);
        request.setDueDate(due);
        request.setStatus(IssuedBook.Status.PENDING);
        request.setFine(BigDecimal.ZERO);

        IssuedBook saved = issuedBookRepository.save(request);
        System.out.println("hello44...");
        return toDto(saved);

    }

    public List<IssueResponseDto> getPendingRequests() {
        return issuedBookRepository.findByStatus(IssuedBook.Status.PENDING)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<IssueResponseDto> getAllIssued() {
        return issuedBookRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<IssueResponseDto> getUserIssued(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return issuedBookRepository.findByUser(user).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public IssueResponseDto approveRequest(Long issueId) {
        IssuedBook ib = issuedBookRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue request not found"));

        if (ib.getStatus() != IssuedBook.Status.PENDING) {
            throw new BadRequestException("Only pending requests can be approved");
        }

        Books book = ib.getBook();
        if (book.getNumberOfCopies() <= 0) {
            throw new BadRequestException("No copies available for approval");
        }

        // decrement available copies
        book.setNumberOfCopies(book.getNumberOfCopies() - 1);
        booksRepository.save(book);

        ib.setStatus(IssuedBook.Status.APPROVED);
        // keep issueDate/dueDate as set earlier
        IssuedBook saved = issuedBookRepository.save(ib);
        return toDto(saved);
    }

    @Transactional
    public IssueResponseDto rejectRequest(Long issueId) {
        IssuedBook ib = issuedBookRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue request not found"));

        if (ib.getStatus() != IssuedBook.Status.PENDING) {
            throw new BadRequestException("Only pending requests can be rejected");
        }

        ib.setStatus(IssuedBook.Status.REJECTED);
        IssuedBook saved = issuedBookRepository.save(ib);
        return toDto(saved);
    }

    @Transactional
    public IssueResponseDto processReturn(Long issueId, LocalDate returnDate) {
        IssuedBook ib = issuedBookRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issued record not found"));

        if (ib.getStatus() != IssuedBook.Status.APPROVED) {
            throw new BadRequestException("Only approved/borrowed books can be returned");
        }

        // set return date
        ib.setReturnDate(returnDate == null ? LocalDate.now() : returnDate);

        // calculate fine (if overdue)
        BigDecimal fine = calculateFine(ib.getDueDate(), ib.getReturnDate());
        ib.setFine(fine);

        ib.setStatus(IssuedBook.Status.RETURNED);
        IssuedBook saved = issuedBookRepository.save(ib);

        // increment book count back
        Books book = ib.getBook();
        book.setNumberOfCopies(book.getNumberOfCopies() + 1);
        booksRepository.save(book);

        return toDto(saved);
    }

    private BigDecimal calculateFine(LocalDate due, LocalDate returned) {
        if (returned == null || returned.isBefore(due) || returned.isEqual(due)) {
            return BigDecimal.ZERO;
        }
        long daysOverdue = ChronoUnit.DAYS.between(due, returned);
        return FINE_PER_DAY.multiply(BigDecimal.valueOf(daysOverdue));
    }

    private IssueResponseDto toDto(IssuedBook ib) {
        IssueResponseDto dto = new IssueResponseDto();
        dto.setId(ib.getId());
        dto.setBookName(ib.getBook() != null ? ib.getBook().getBookName() : null);
        dto.setAuthorName(ib.getBook() != null ? ib.getBook().getAuthorName() : null);
        dto.setUserId(ib.getUser() != null ? ib.getUser().getUserId() : null);
        dto.setIssueDate(ib.getIssueDate());
        dto.setDueDate(ib.getDueDate());
        dto.setReturnDate(ib.getReturnDate());
        dto.setStatus(ib.getStatus().name());
        dto.setFine(ib.getFine() == null ? BigDecimal.ZERO : ib.getFine());
        return dto;
    }
}
