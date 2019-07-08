package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public class SudokuService {

    public int[][] convertArray(int[] entireArray) {
        int[][] result = new int[9][9];
        int rows = 0;
        int columns = 0;
        for(int i=0; i<entireArray.length; i++) {
            if(columns == 9) {
                columns = 0;
                rows++;
            }
            result[rows][columns] = entireArray[i];
            columns++;
        }
        return result;
    }
}
