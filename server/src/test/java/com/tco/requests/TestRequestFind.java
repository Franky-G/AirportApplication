package com.tco.requests;

import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {

    private RequestFind fin;

    @BeforeEach
    public void createConfigurationForTestCases(){
        fin = new RequestFind();
        fin.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
        String type = fin.getRequestType();
        assertEquals("find", type);
    }

    @Test
    @DisplayName("Version number is equal to 2")
    public void testVersion() {
        int version = fin.getRequestVersion();
        assertEquals(2, version);
    }

    @Test
    @DisplayName("match should be \"^[a-zA-z0-9_]+$\"")
    public void testMatch(){
        String temp = fin.getMatch();
        assertEquals("[a-zA-z0-9_]+", temp);
    }
}