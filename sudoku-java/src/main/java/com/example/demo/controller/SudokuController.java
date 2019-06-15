package com.example.demo.controller;

import com.example.demo.service.CustomUrlDecoder;
import com.example.demo.service.GeneratorSudokuBoard;
import com.example.demo.service.SudokuSolver;
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

    @PostMapping("/result")
    public ResponseEntity<?> checkResult(@RequestBody int[][] boardCheck, String time, @RequestParam String userName, boolean isTip) {
        if(isTip) {
            Object[] result = new Object[3];
            result[0] = isTip;
            result[1] = userName;
            result[2] = time;

            return new ResponseEntity<Object[]>(result, HttpStatus.OK);
        } else {

        }
        return new ResponseEntity<String>("OK", HttpStatus.OK);
    }

    @PostMapping("/resultTip/{userName}/{isTip}")
    public ResponseEntity<?> checkResultForTip(@RequestBody  String time, @PathVariable String userName,
                                               @PathVariable String isTip) throws UnsupportedEncodingException {
        time = customUrlDecoder.decodeAndSplitUrl(time);
        System.out.println(time);

        userName = customUrlDecoder.decodeAndSplitUrl(userName);
        System.out.println(userName);

        isTip = customUrlDecoder.decodeAndSplitUrl(isTip);
        System.out.println(isTip);

        return new ResponseEntity<String>("OK", HttpStatus.OK);
    }
}
