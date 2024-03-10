package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.Field;

import org.junit.Before;
import org.junit.Test;

public class DayTest {

    private Year y;
    private Month m;
    private Day d;

    @Before
    public void setUp() {
        y = new Year(2023);
        m = new Month(2, y);
        d = new Day(22, m);
    }

    @Test
    public void testGetDay() {
        assertEquals(22, d.getDay());
    }

    @Test
    public void testIncrement() {
        assertTrue(d.increment());
        assertEquals(23, d.getDay());
        assertTrue(d.increment());
        assertEquals(24, d.getDay());
        d.setDay(28, m);
        assertFalse(d.increment());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidDay1() {
        d.setDay(30, m);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidDay2() {
        d.setDay(29, m);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidDay3() {
        d.setDay(0, m);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidDay4() {
        d.setDay(1, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidDay5() throws NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
        Field field = CalendarUnit.class.getDeclaredField("currentPos");
        field.setAccessible(true);

        Month tmp = new Month(2, y);
        field.setInt(tmp, 0);
        d.setDay(1, tmp);
    }

    @Test
    public void testEquals() {
        assertFalse(d.equals(null));
        assertFalse(d.equals("foo"));

        assertEquals(new Day(22, m), d);
        assertNotEquals(new Day(23, m), d);
        assertNotEquals(new Day(22, new Month(2, new Year(2024))), d);
    }

}
