package net.mooctest;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class NextdayTest {

    @Test
    public void testInstantiation() {
        new Nextday();
    }

    @Test
    public void testNextday() {
        Date nextDay = Nextday.nextDay(new Date(2, 28, 2023));
        assertEquals(new Date(3, 1, 2023), nextDay);
    }

}
