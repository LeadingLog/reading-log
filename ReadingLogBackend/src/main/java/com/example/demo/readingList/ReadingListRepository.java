package com.example.demo.readingList;


import com.example.demo.user.Entity.User;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.Date;

import com.example.demo.code.BookStatus;


@Repository
public interface ReadingListRepository extends JpaRepository<ReadingList, Integer> {

	// 알라딘 서버 응답 값에 추가 할 것
	Optional<ReadingList> findByUserIdAndIsbn13(Integer userId, String isbn13);

	// 유져 아이디 별로 필터링
	Page<ReadingList> findByUserId(Integer userId, Pageable pageable);
	
	// 유져 아이디 별 관심 도서 제외 모든 책 
	Page<ReadingList> findByUserIdAndBookStatusNot(Integer userId, BookStatus bookStatus, Pageable pageable);

	// 유저ID & 독서상태에따라 필터링
	Page<ReadingList> findByUserIdAndBookStatus(Integer userId, BookStatus bookStatus, Pageable pageable);

	//특정  상태에 대한 도서 검색 
	@Query("SELECT r FROM ReadingList r " + "WHERE r.userId = :userId " + "AND (r.bookStatus = :status) "
			+ "AND (LOWER(r.bookTitle) LIKE LOWER(CONCAT('%', :query, '%')) "
			+ "OR LOWER(r.author) LIKE LOWER(CONCAT('%', :query, '%')))")
	List<ReadingList> searchByUserIdAndQueryWithStatus(@Param("userId") Integer userId,
			@Param("status") BookStatus status, @Param("query") String query);

	//전체의 리스트의 도서 검색
	@Query("SELECT r FROM ReadingList r " + "WHERE r.userId = :userId "
			+ "AND (LOWER(r.bookTitle) LIKE LOWER(CONCAT('%', :query, '%')) "
			+ "OR LOWER(r.author) LIKE LOWER(CONCAT('%', :query, '%')))")
	List<ReadingList> searchByUserIdAndQueryWithAll(@Param("userId") Integer userId, @Param("query") String query);

	//전체 미완독 도서 조회 
	@Query("""
		    SELECT r FROM ReadingList r
		    WHERE r.userId = :userId
		      AND r.bookStatus IN (:statuses)
		      AND r.readEndDt IS NOT NULL
		      AND r.readEndDt < :targetDate
		    """)
		List<ReadingList> findInCompleteBook(
		    @Param("userId") Integer userId,
		    @Param("statuses") List<BookStatus> statuses,
		    @Param("targetDate") LocalDate targetDate
		);
	
	//특정 년/월에 미완독 도서 
	@Query("""
		    SELECT r FROM ReadingList r
		    WHERE r.userId = :userId
		      AND r.bookStatus IN (:statuses)
		      AND r.readEndDt IS NOT NULL
		      AND r.readEndDt = :targetDate
		    """)
		List<ReadingList> findInCompleteBookInMonth(
		    @Param("userId") Integer userId,
		    @Param("statuses") List<BookStatus> statuses,
		    @Param("targetDate") LocalDate targetDate
		);


    // 이번달 독서 
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
