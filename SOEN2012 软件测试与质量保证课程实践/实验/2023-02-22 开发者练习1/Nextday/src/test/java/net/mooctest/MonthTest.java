package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.Field;

import org.junit.Test;

public class MonthTest {

    @Test
    public void testSetMonth() {
        Year year = new Year(2022);
        Month month = new Month(1, year);
        assertEquals(1, month.getMonth());
        assertEquals(31, month.getMonthSize());
        month.setMonth(2, year);
        assertEquals(2, month.getMonth());
        assertEquals(28, month.getMonthSize());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testSetMonthInvalid() {
        Year year = new Year(2022);
        Month month = new Month(0, year);
        month.setMonth(0, year);
    }

    @Test
    public void testIncrement() {
        Year year = new Year(2022);
        Month month = new Month(11, year);
        assertTrue(month.increment());
        assertEquals(12, month.getMonth());
        assertFalse(month.increment());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testIsValid1() {
        Year year = new Year(2022);
        new Month(0, year);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testIsValid2() {
        Year year = new Year(2022);
        new Month(13, year);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testIsValid3() {
        new Month(1, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testIsValid4() {
        new Month(0, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testIsValid5() {
        new Month(13, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalid6() throws NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        Field field = CalendarUnit.class.getDeclaredField("currentPos");
        field.setAccessible(true);

        Year year = new Year(2023);
        field.setInt(year, 0);
        new Month(3, year);
    }

    @Test
    public void testEquals() {
        Year year1 = new Year(2022);
        Year year2 = new Year(2022);
        Year year3 = new Year(2023);
        Month month1 = new Month(1, year1);
        Month month2 = new Month(1, year1);
        Month month3 = new Month(2, year1);
        Month month4 = new Month(1, year2);
        Month month5 = new Month(1, year3);

        assertFalse(month1.equals(null));
        assertFalse(month1.equals("foo"));

        assertEquals(month1, month2);
        assertNotEquals(month1, month3);
        assertEquals(month1, month4);
        assertNotEquals(month1, month5);
    }

    @Test
    public void testGetMonthSize() {
        Year year = new Year(2022);
        Month month1 = new Month(1, year);
        Month month2 = new Month(2, year);
        Month month3 = new Month(3, year);

        assertEquals(31, month1.getMonthSize());
        assertEquals(28, month2.getMonthSize());
        assertEquals(31, month3.getMonthSize());

        year = new Year(2024);
        month2 = new Month(2, year);

        assertEquals(29, month2.getMonthSize());
    }

}
