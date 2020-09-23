package com.tco.requests;

import com.tco.requests.RequestFind;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    @Test
    @DisplayName("limit should be 5")
    public void testLimit(){
        int temp = fin.getLimit();
        assertEquals(5, temp);
    }

    @Test
    @DisplayName("found should be 5")
    public void testFound(){
        int temp = fin.getFound();
        assertEquals(5, temp);
    }

    @Test
    @DisplayName("name should be Salt Box Airport via pattern salt%")
    public void testPlacesName(){
        List<HashMap<String, String>> temp = fin.getPlaces();
        String temp1 = (temp.get(0)).get("name");
        assertEquals("Salt Box Airport", temp1);
    }

    @Test
    @DisplayName("municipality should be Hiram via pattern salt%")
    public void testPlacesMunicipality(){
        List<HashMap<String, String>> temp = fin.getPlaces();
        String temp1 = (temp.get(0)).get("municipality");
        assertEquals("Hiram", temp1);
    }
}