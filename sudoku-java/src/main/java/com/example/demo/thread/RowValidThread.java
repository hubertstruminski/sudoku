package com.example.demo.thread;

import java.util.HashSet;
import java.util.Set;

public class RowValidThread implements Runnable {

    private int row;
    private int[][] board;
    private Set<Integer> rowSet;

    public RowValidThread(int row, int[][] board) {
        this.row = row;
        this.board = board;
        this.rowSet = new HashSet<>();
    }

    @Override
    public void run() {

        for(int i=0; i<9; i++) {
            for(int number=1; number<=9; number++) {
                if (board[row][i] == number) {
                    rowSet.add(number);
                }
                if(i == 8 && number == 9) {
                    if(rowSet.size() != 9) {
                        return;
                    }
                }
            }
        }
    }

    public Set<Integer> getRowSet() {
        return rowSet;
    }
}
