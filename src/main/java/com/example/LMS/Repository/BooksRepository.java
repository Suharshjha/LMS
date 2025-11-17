package com.example.LMS.Repository;

import com.example.LMS.Models.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BooksRepository extends JpaRepository<Books, Long> {

    @Query("SELECT b FROM Books b " +
            "WHERE LOWER(b.bookName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.authorName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.bookCategory) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Books> searchBooks(@Param("keyword") String keyword);
}
