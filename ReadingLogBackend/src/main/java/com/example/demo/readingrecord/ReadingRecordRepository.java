package com.example.demo.readingrecord;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadingRecordRepository extends JpaRepository<ReadingRecord, Long> {

	// 사용자의 연별 월별 총 독서 시간
	@Query(value = "SELECT EXTRACT(MONTH FROM r.read_date) AS month, SUM(r.total_time) AS total "
			+ "FROM reading_record r " + "WHERE r.user_id = :userId AND EXTRACT(YEAR FROM r.read_date) = :year "
			+ "GROUP BY month " + "ORDER BY month", nativeQuery = true)
	List<Object[]> findMonthlyTotalTimeByUserAndYear(@Param("userId") Integer userId, @Param("year") Integer year);

	// 사용자 별 총 읽은 시간
	@Query(value = "SELECT SUM(r.total_time) FROM reading_record r WHERE r.user_id = :userId", nativeQuery = true)
	Integer findTotalReadingTimeByUserId(@Param("userId") Integer userId);

	// 사용자별 연도 필터링된 총 독서 시간
	@Query(value = "SELECT SUM(r.total_time) FROM reading_record r WHERE r.user_id = :userId AND EXTRACT(YEAR FROM r.read_date) = :year", nativeQuery = true)
	Integer findTotalReadingTimeByUserIdAndYear(@Param("userId") Integer userId, @Param("year") Integer year);

	// 년/월에 읽은 도서의 독서 조회
	@Query(value = """
			SELECT
			    rr.book_id,
			    rl.book_title,
			    rl.book_status,
			    SUM(rr.total_time) AS total_time
			FROM
			    reading_record rr
			JOIN
			    reading_list rl
			    ON rr.book_id = rl.book_id AND rr.user_id = rl.user_id
			WHERE
			    rr.user_id = :userId
			    AND EXTRACT(YEAR FROM rr.read_date) = :year
			    AND EXTRACT(MONTH FROM rr.read_date) = :month
			GROUP BY
			    rr.book_id, rl.book_title, rl.book_status
			ORDER BY
			    total_time DESC
			""", nativeQuery = true)
	List<Object[]> findExactYearMonthBookTotalTimeByUserId(@Param("userId") Integer userId, @Param("year") Integer year,
			@Param("month") Integer month);

	// 오늘 사용자가 읽은 시간
	@Query(value = "SELECT SUM(r.total_time) " + "FROM reading_record r "
			+ "WHERE r.user_id = :userId AND r.read_date = CURRENT_DATE", nativeQuery = true)
	Integer findTodayTotalReadingTimeByUser(@Param("userId") Integer userId);

	
	//해당 연에 월별로 완독한 도서 리스트와 총 읽은 시간 출력 
	@Query(value = """
		    SELECT 
		        COALESCE(rr.total_time_sum, 0) AS total_reading_time,
		        COALESCE(rl.month, months.month) AS month,
		        COALESCE(rl.complete_count, 0) AS complete
		    FROM 
		        (SELECT generate_series(1, 12) AS month) AS months
		    LEFT JOIN (
		        SELECT 
		            EXTRACT(MONTH FROM finish_chk) AS month,
		            COUNT(*) AS complete_count
		        FROM reading_list
		        WHERE user_id = :userId
		          AND book_status = 'COMPLETED'
		          AND EXTRACT(YEAR FROM finish_chk) = :year
		        GROUP BY EXTRACT(MONTH FROM finish_chk)
		    ) rl ON rl.month = months.month
		    LEFT JOIN (
		        SELECT 
		            SUM(total_time) AS total_time_sum
		        FROM reading_record
		        WHERE user_id = :userId
		          AND EXTRACT(YEAR FROM read_date) = :year
		    ) rr ON true
		    ORDER BY month
		""", nativeQuery = true)
		List<Object[]> getMonthlyCompleteCountAndTotalReadingTime(@Param("userId") Integer userId, @Param("year") Integer year);

	
	
//	// 사용자 아이디 & 독서 일자 중 연 > 월 > 책 > 읽은시간
//	@Query(value = "SELECT " + "EXTRACT(YEAR FROM r.read_date) AS year, " + "EXTRACT(MONTH FROM r.read_date) AS month, "
//			+ "r.book_id, " + "SUM(r.total_time) AS total_time " + "FROM reading_record r "
//			+ "WHERE r.user_id = :userId " + "GROUP BY year, month, r.book_id "
//			+ "ORDER BY year, month", nativeQuery = true)
//	List<Object[]> findYearMonthBookTotalTimeByUserId(@Param("userId") Integer userId);

//	// 사용자 아이디 & 독서 일자 중 연 > 월 > 읽은시간 > 책
//	@Query(value = "SELECT " + "r.book_id, " + "EXTRACT(YEAR FROM r.read_date) AS year, "
//			+ "EXTRACT(MONTH FROM r.read_date) AS month, " + "SUM(r.total_time) AS total_time "
//			+ "FROM reading_record r " + "WHERE r.user_id = :userId " + "GROUP BY r.book_id, year, month "
//			+ "ORDER BY r.book_id, year, month", nativeQuery = true)
//	List<Object[]> findBookTimeByYearMonth(@Param("userId") Integer userId);

}
