package com.example.LMS.Repository;

import com.example.LMS.Models.Books;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BooksRepository extends JpaRepository<Books, Long> {
}
