package com.example.demo.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Statistics {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "time")
    private String time;

    @Column(name = "date")
    @Temporal(TemporalType.DATE)
    private Date date;

    public Statistics(String userName, String time, Date date) {
        this.userName = userName;
        this.time = time;
        this.date = date;
    }
}
