package com.example.demo.readingList;

import com.example.demo.user.Entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.Date;

@Repository
public interface ReadingListRepository extends JpaRepository<ReadingList, Long>{

    @Query ("SELECT r " +
//            "r.bookTitle" +
//            " , r.author" +
//            " , r.isbn13" +
//            " , r.bookId " +
//            " , r.coverImgUrl" +
//            " , r.bookStatus " +
//            " , r.createdAt " +
            "FROM ReadingList r " +
            "WHERE r.userId = :userId " +
            "AND FUNCTION('TO_CHAR', r.readStartDt, 'YYYYMM') <= :yymm " +
            "AND FUNCTION('TO_CHAR', r.readEndDt, 'YYYYMM') >= :yymm")
    Page<ReadingList> getMontlyReadingList (@Param("userId") Integer userId,@Param("yymm") String yymm, Pageable pageable);

}
