package com.example.demo.thread;

import org.springframework.stereotype.Service;

@Service
public class MainThread {

    public boolean checkBoardWithinThreads(int[][] board) {
        Thread[] threads = new Thread[27];
        int threadIndex = 0;

        for(int row=0; row<9; row++) {
            for(int col=0; col<9; col++) {
                if(row % 3 == 0 && col % 3 == 0) {
                    SubSquareValidThread subSquareValidThread = new SubSquareValidThread(row, col, board);
                    threads[threadIndex++] = new Thread(subSquareValidThread);
                }
                if(row == 0) {
                    ColumnValidThread columnValidThread = new ColumnValidThread(col, board);
                    threads[threadIndex++] = new Thread(columnValidThread);
                }
                if(col == 0) {
                    RowValidThread rowValidThread = new RowValidThread(row, board);
                    threads[threadIndex++] = new Thread(rowValidThread);
                }
            }
        }

        for(int i=0; i<threads.length; i++) {
            threads[i].start();
        }

        for(int i=0; i<threads.length; i++) {
            try {
                threads[i].join();
            } catch(InterruptedException e) {
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }
        }
        return true;
    }
}
