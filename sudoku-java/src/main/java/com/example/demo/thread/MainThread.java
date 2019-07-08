package com.example.demo.thread;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MainThread {

    public boolean checkBoardWithinThreads(int[][] board) {
        Thread[] threads = new Thread[27];
        int threadIndex = 0;

        List<SubSquareValidThread> subSquareList = new ArrayList<>();
        List<ColumnValidThread> columnValidList = new ArrayList<>();
        List<RowValidThread> rowValidList = new ArrayList<>();

        for(int row=0; row<9; row++) {
            for(int col=0; col<9; col++) {
                if(row % 3 == 0 && col % 3 == 0) {
                    SubSquareValidThread subSquareValidThread = new SubSquareValidThread(row, col, board);
                    threads[threadIndex++] = new Thread(subSquareValidThread);

                    subSquareList.add(subSquareValidThread);
                }
                if(row == 0) {
                    ColumnValidThread columnValidThread = new ColumnValidThread(col, board);
                    threads[threadIndex++] = new Thread(columnValidThread);

                    columnValidList.add(columnValidThread);
                }
                if(col == 0) {
                    RowValidThread rowValidThread = new RowValidThread(row, board);
                    threads[threadIndex++] = new Thread(rowValidThread);

                    rowValidList.add(rowValidThread);
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

        for(RowValidThread rowValid: rowValidList) {
            if(rowValid.getRowSet().size() != 9) {
                return false;
            }
        }

        for(ColumnValidThread columnValid: columnValidList) {
            if(columnValid.getColumnSet().size() != 9) {
                return false;
            }
        }

        for(SubSquareValidThread subSquareValid: subSquareList) {
            if(subSquareValid.getSubSquareSet().size() != 9) {
                return false;
            }
        }
        return true;
    }
}
