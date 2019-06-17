package com.example.demo.repository;

import com.example.demo.entity.Statistics;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticsRepository extends CrudRepository<Statistics, Long> {

    @Query("SELECT new com.example.demo.entity.Statistics(userName, time, date) FROM Statistics ORDER BY time ASC")
    List<Statistics> getAllStatistics();

    Statistics getStatisticsById(Long id);
}
