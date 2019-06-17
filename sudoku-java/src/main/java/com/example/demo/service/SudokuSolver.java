package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SudokuSolver {

    @Autowired
    private GeneratorSudokuBoard generatorSudokuBoard;

    public boolean solveChecker(int[][] board) {
        for (int row=0; row<board.length; row++) {
            for (int col=0; col<board[row].length; col++) {
                if (board[row][col] == 0) {
                    for (int number=1; number<=9; number++) {
                        if(generatorSudokuBoard.isConstraintsChecked(row, col, number, board)) {
                            board[row][col] = number;
                            if (solveChecker(board)) {
                                return true;
                            } else {
                                board[row][col] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public int[][] solve(int[][] board) {
        for (int row=0; row<board.length; row++) {
            for (int col=0; col<board[row].length; col++) {
                if (board[row][col] == 0) {
                    for (int number=1; number<=9; number++) {
                        if(generatorSudokuBoard.isConstraintsChecked(row, col, number, board)) {
                            board[row][col] = number;
                            if (solveChecker(board)) {
                                return board;
                            } else {
                                board[row][col] = 0;
                            }
                        }
                    }
                }
            }
        }
        return board;
    }

    public int[][] cloneArray(int[][] board) {
        int[][] result = new int[9][9];

        for(int i=0; i<board.length; i++) {
            for(int j=0; j<board[i].length; j++) {
                result[i][j] = board[i][j];
            }
        }
        return result;
    }
}
