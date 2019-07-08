package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.Random;

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

//    public static void main(String[] args) {
//        Random random = new Random();
//        int[] entireArray = new int[81];
//
//        for(int i=0; i<81; i++) {
//            int randomValue = random.nextInt(9) + 1;
//            entireArray[i] = randomValue;
//        }
//
//        int[][] result = convertArray(entireArray);
//
//        for(int i=0; i<result.length; i++) {
//            for(int j=0; j<result[i].length; j++) {
//                System.out.print(result[i][j] + " ");
//            }
//            System.out.println();
//        }
//    }
}
