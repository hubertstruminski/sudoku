package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SudokuSolver {

    @Autowired
    private GeneratorSudokuBoard generatorSudokuBoard;

//    private GeneratorSudokuBoard generatorSudokuBoard;
//
//    public SudokuSolver() {
//        this.generatorSudokuBoard = new GeneratorSudokuBoard();
//    }

    public boolean solve(int[][] board) {
        for (int row=0; row<board.length; row++) {
            for (int col=0; col<board[row].length; col++) {
                if (board[row][col] == 0) {
                    for (int number=1; number<=9; number++) {
                        if(generatorSudokuBoard.isConstraintsChecked(row, col, number, board)) {
                            board[row][col] = number;
                            if (solve(board)) {
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

    public void print(int[][] board) {
        for(int i=0; i<board.length; i++) {
            for(int j=0; j<board[i].length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
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

    public String[][] convertToStringArray(int[][] board) {
        String[][] result = new String[9][9];
        for(int i=0; i<board.length; i++) {
            for(int j=0; j<board[i].length; j++) {
                result[i][j] = String.valueOf(board[i][j]);
            }
        }
        return result;
    }

//    public static void main(String[] args) {
//        SudokuSolver sudokuSolver = new SudokuSolver();
//        GeneratorSudokuBoard generatorSudokuBoard = new GeneratorSudokuBoard();
//
//        boolean isDone = false;
//
//        while(isDone == false) {
//            int[][] board = generatorSudokuBoard.generateSudokuBoard();
//            int[][] sudokuBoard = sudokuSolver.cloneArray(board);
//
//            if(sudokuSolver.solve(sudokuBoard)) {
//                sudokuSolver.print(board);
//                System.out.println("--------------------------");
//                sudokuSolver.print(sudokuBoard);
//                isDone = true;
//            }
//        }
//    }
}
