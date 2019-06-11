package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sudoku")
@CrossOrigin
public class SudokuController {

    @GetMapping
    public ResponseEntity<?> startSudoku() {

        return new ResponseEntity<String>("Request was handled successfully.", HttpStatus.CREATED);
    }
}
