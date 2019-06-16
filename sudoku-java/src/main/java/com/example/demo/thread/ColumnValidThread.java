package com.example.demo.thread;

import java.util.HashSet;
import java.util.Set;

public class ColumnValidThread implements Runnable {

    private int column;
    private int[][] board;
    private Set<Integer> columnSet;

    public ColumnValidThread(int column, int[][] board) {
        this.column = column;
        this.board = board;
        this.columnSet = new HashSet<>();
    }

    @Override
    public void run() {
        for(int i=0; i<9; i++) {
            for(int number=1; number<=9; number++) {
                if (board[i][column] == number) {
                    columnSet.add(number);
                }
                if(i == 8 && number == 9) {
                    if(columnSet.size() != 9) {
                        return;
                    }
                }
            }
        }
    }

    public Set<Integer> getColumnSet() {
        return columnSet;
    }
}
