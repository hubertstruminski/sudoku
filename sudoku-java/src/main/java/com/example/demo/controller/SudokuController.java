package com.example.demo.controller;

import com.example.demo.entity.Statistics;
import com.example.demo.service.*;
import com.example.demo.thread.MainThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("sudoku")
@CrossOrigin
public class SudokuController {

    @Autowired
    private SudokuSolver sudokuSolver;

    @Autowired
    private GeneratorSudokuBoard generatorSudokuBoard;

    @Autowired
    private CustomUrlDecoder customUrlDecoder;

    @Autowired
    private MainThread mainThread;

    @Autowired
    private StatisticsService statisticsService;

    @Autowired
    private SudokuService sudokuService;

    private boolean isSolved = false;

    @GetMapping
    public ResponseEntity<?> startSudoku() {
        while(isSolved == false) {
            int[][] entireArray = generatorSudokuBoard.generateSudokuBoard();
            int[][] sudokuBoard = sudokuSolver.cloneArray(entireArray);

            if(sudokuSolver.solveChecker(sudokuBoard)) {
                int[][] solvedSudoku = sudokuSolver.solve(sudokuBoard);

                List<int[][]> result = new ArrayList<>();
                result.add(entireArray);
                result.add(solvedSudoku);

                return new ResponseEntity<List<int[][]>>(result, HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<String>("If you see this message contact with our support.", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/tip")
    public ResponseEntity<?> getTip(@RequestBody int[][] boardTipArray) {
        int[][] solvedBoard = sudokuSolver.solve(boardTipArray);
        int[][] ints = sudokuSolver.cloneArray(solvedBoard);
        return new ResponseEntity<int[][]>(ints, HttpStatus.OK);
    }

    @PostMapping("/result/{userName}/{time}")
    public ResponseEntity<?> checkResult(@RequestBody int[] boardCheck, @PathVariable String time,
                                         @PathVariable String userName) throws UnsupportedEncodingException {
        Object[] result;
        int[][] solvedSudoku = sudokuService.convertArray(boardCheck);

        if( mainThread.checkBoardWithinThreads(solvedSudoku)) {
            Statistics statistics = new Statistics(userName, time, new Date());
            statisticsService.save(statistics);

            result = new Object[] {true, userName, time};
        } else {
            result = new Object[] {false, userName, time};
        }
        return new ResponseEntity<Object[]>(result, HttpStatus.OK);
    }

    @PostMapping("/resultTip/{userName}/{numberOfTips}")
    public ResponseEntity<?> checkResultForTip(@RequestBody  String time,
                                               @PathVariable String userName, @PathVariable int numberOfTips) throws UnsupportedEncodingException {
        time = customUrlDecoder.decodeAndSplitUrl(time);
        userName = customUrlDecoder.decodeAndSplitUrl(userName);

        Object[] result = new Object[3];
        result[0] = time;
        result[1] = userName;
        result[2] = numberOfTips;

        return new ResponseEntity<Object[]>(result, HttpStatus.OK);
    }
}
