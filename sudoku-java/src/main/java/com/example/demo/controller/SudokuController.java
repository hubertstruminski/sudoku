package com.example.demo.controller;

import com.example.demo.service.CustomUrlDecoder;
import com.example.demo.service.GeneratorSudokuBoard;
import com.example.demo.service.SudokuSolver;
import com.example.demo.thread.MainThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

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

    private boolean isSolved = false;

    @GetMapping
    public ResponseEntity<?> startSudoku() {
        while(isSolved == false) {
            int[][] entireArray = generatorSudokuBoard.generateSudokuBoard();
            int[][] sudokuBoard = sudokuSolver.cloneArray(entireArray);

            if(sudokuSolver.solveChecker(sudokuBoard)) {
                return new ResponseEntity<int[][]>(entireArray, HttpStatus.CREATED);
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
    public ResponseEntity<?> checkResult(@RequestBody int[][] boardCheck, @PathVariable String time,
                                         @PathVariable String userName) throws UnsupportedEncodingException {
        if(mainThread.checkBoardWithinThreads(boardCheck)) {

        } else {

        }
        return new ResponseEntity<String>("OK", HttpStatus.OK);
    }

    @PostMapping("/resultTip/{userName}")
    public ResponseEntity<?> checkResultForTip(@RequestBody  String time,
                                               @PathVariable String userName) throws UnsupportedEncodingException {
        time = customUrlDecoder.decodeAndSplitUrl(time);
        userName = customUrlDecoder.decodeAndSplitUrl(userName);

        Object[] result = new Object[2];
        result[0] = time;
        result[1] = userName;

        return new ResponseEntity<Object[]>(result, HttpStatus.OK);
    }
}
