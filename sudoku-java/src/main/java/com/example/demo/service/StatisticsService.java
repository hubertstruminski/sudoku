package com.example.demo.service;

import com.example.demo.entity.Statistics;
import com.example.demo.repository.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService {

    @Autowired
    private StatisticsRepository statisticsRepository;

    public List<Statistics> getAllStatistics() {
        List<Statistics> result = new ArrayList<>();
        List<Statistics> statistics = statisticsRepository.getAllStatistics();

        if(statistics.size() > 5) {
            for(int i=0; i<5; i++) {
                result.add(statistics.get(i));
            }
            return result;
        } else {
            return statistics;
        }
    }

    public Statistics getStatisticsById(Long id) {
        return statisticsRepository.getStatisticsById(id);
    }

    public void save(Statistics statistics) {
        statisticsRepository.save(statistics);
    }
}
