package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Service
public class CustomUrlDecoder {

    public String decodeAndSplitUrl(String query) throws UnsupportedEncodingException {
        String decoded = URLDecoder.decode(query, "UTF-8");
        return decoded.replace("=", "");
    }
}
