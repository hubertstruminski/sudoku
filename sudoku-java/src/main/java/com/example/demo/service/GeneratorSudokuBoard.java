package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GeneratorSudokuBoard {

    public int[][] generateSudokuBoard() {
        Random random = new Random();
        int[][] result = new int[9][9];

        boolean[] booleanArray = new boolean[] {false, true};

        for(int i=0; i<result.length; i++) {
            List<Integer> integersList = fullFillListIntegers();

            for(int j=0; j<result[i].length; j++) {

                int booleanIndex = random.nextInt(2);

                int index = random.nextInt(integersList.size());
                int number = integersList.get(index);

                if(booleanArray[booleanIndex] && isConstraintsChecked(i, j, number, result)) {
                    result[i][j] = number;
                    integersList.remove(index);
                } else {
                    continue;
                }
            }
        }
        return result;
    }

    public boolean isConstraintsChecked(int row, int col, int number, int[][] board) {
        return checkRow(row, number, board) && checkColumn(col, number, board) &&
                checkSubsquare(row, col, number, board);
    }

    private boolean checkRow(int row, int number, int[][] board) {
        for (int i=0; i<9; i++) {
            if (board[row][i] == number) {
                return false;
            }
        }
        return true;
    }

    private boolean checkColumn(int col, int number, int[][] board) {
        for (int i=0; i<9; i++) {
            if (board[i][col] == number) {
                return false;
            }
        }
        return true;
    }

    private boolean checkSubsquare(int row, int col, int number, int[][] board) {
        int r = row - row % 3;
        int c = col - col % 3;

        for (int i = r; i < r + 3; i++) {
            for (int j = c; j < c + 3; j++) {
                if (board[i][j] == number) {
                    return false;
                }
            }
        }
        return true;
    }

    private List<Integer> fullFillListIntegers() {
        List<Integer> result = new ArrayList<>();

        for(int i=1; i<=9; i++) {
            result.add(i);
        }
        return result;
    }

//    public static void main(String[] args) {
//        GeneratorSudokuBoard generatorSudokuBoard = new GeneratorSudokuBoard();
//        int[][] result = generatorSudokuBoard.generateSudokuBoard();
//
//        for(int i=0; i<result.length; i++) {
//            for(int j=0; j<result[i].length; j++) {
//                if(result[i][j] == 0) {
//                    System.out.print("* ");
//                    continue;
//                }
//                System.out.print(result[i][j] + " ");
//            }
//            System.out.print("\n");
//        }
//    }
}
