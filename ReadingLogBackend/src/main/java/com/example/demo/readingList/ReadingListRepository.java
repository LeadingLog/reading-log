package com.example.demo.readingList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadingListRepository extends JpaRepository<ReadingList, Long>{


}
