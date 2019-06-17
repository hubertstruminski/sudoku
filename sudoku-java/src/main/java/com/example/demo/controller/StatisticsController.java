package com.example.demo.controller;

import com.example.demo.entity.Statistics;
import com.example.demo.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("statistics")
@CrossOrigin
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping
    public List<Statistics> getAllStatistics() {
        List<Statistics> allStatistics = statisticsService.getAllStatistics();
        return allStatistics;
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getStatistic(@PathVariable Long id) {
        Statistics statistics = statisticsService.getStatisticsById(id);
        return new ResponseEntity<Statistics>(statistics, HttpStatus.OK);
    }
}
