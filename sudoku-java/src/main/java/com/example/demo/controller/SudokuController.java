package com.example.demo.controller;

import com.example.demo.service.GeneratorSudokuBoard;
import com.example.demo.service.SudokuSolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("sudoku")
@CrossOrigin
public class SudokuController {

    @Autowired
    private SudokuSolver sudokuSolver;

    @Autowired
    private GeneratorSudokuBoard generatorSudokuBoard;

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
}
