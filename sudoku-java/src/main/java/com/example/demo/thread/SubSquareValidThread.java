package com.example.demo.thread;

import java.util.HashSet;
import java.util.Set;

public class SubSquareValidThread implements Runnable {

    private int row;
    private int column;
    private int[][] board;
    public Set<Integer> subSquareSet;

    public SubSquareValidThread(int row, int column, int[][] board) {
        this.row = row;
        this.column = column;
        this.board = board;
        this.subSquareSet = new HashSet<>();
    }

    @Override
    public void run() {
        int r = row - row % 3;
        int c = column - column % 3;

        for (int i = r; i < r + 3; i++) {
            for (int j = c; j < c + 3; j++) {
                for(int number=1; number<=9; number++) {
                    if (board[r][c] == number) {
                        subSquareSet.add(number);
                    }
                    if(i == (r + 2) && j == (c + 2)  && number == 9) {
                        if(subSquareSet.size() != 9) {
                            return;
                        }
                    }
                }

            }
        }
    }

    public Set<Integer> getSubSquareSet() {
        return subSquareSet;
    }
}
