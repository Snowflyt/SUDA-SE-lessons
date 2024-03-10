package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class YearTest {

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidYear() {
        new Year(0);
    }

    @Test
    public void testIncrement() {
        // 正常年
        Year year = new Year(1000);
        year.increment();
        assertEquals(1001, year.getYear());

        // -1 increment之后应该变成1
        year = new Year(-1);
        year.increment();
        assertEquals(1, year.getYear());
    }

    @Test
    public void testPositiveLeapYear() {
        // 普通非闰年
        Year year = new Year(2023);
        assertFalse(year.isLeap());

        // 为100整数倍但不是400整数倍的非闰年
        year = new Year(1900);
        assertFalse(year.isLeap());

        // 普通闰年
        year = new Year(2020);
        assertTrue(year.isLeap());

        // 为400整数倍的闰年
        year = new Year(2000);
        assertTrue(year.isLeap());
    }

    @Test
    public void testNegativeLeapYear() {
        // 普通非闰年
        Year year = new Year(-2024);
        assertFalse(year.isLeap());

        // 为100整数倍但不是400整数倍的非闰年
        year = new Year(-1901);
        assertFalse(year.isLeap());

        // 普通闰年
        year = new Year(-2021);
        assertTrue(year.isLeap());

        // 为400整数倍的闰年
        year = new Year(-2001);
        assertTrue(year.isLeap());
    }

    @Test
    public void testEquals() {
        // 相等
        Year year = new Year(2020);
        assertEquals(year, new Year(2020));

        // 不相等
        year = new Year(2019);
        assertNotEquals(year, new Year(2020));

        // 非Year
        year = new Year(2020);
        assertNotEquals(year, "foo");
    }

}
