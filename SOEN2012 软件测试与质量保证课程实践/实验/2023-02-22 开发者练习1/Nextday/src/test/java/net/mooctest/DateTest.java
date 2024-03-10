package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;

import org.junit.Test;

public class DateTest {

    @Test
    public void testConstructor() {
        Date date = new Date(2, 22, 2023);
        assertEquals(2, date.getMonth().getMonth());
        assertEquals(22, date.getDay().getDay());
        assertEquals(2023, date.getYear().getYear());
    }

    @Test
    public void testIncrement() {
        Date date = new Date(2, 27, 2023);
        date.increment();
        assertEquals(2, date.getMonth().getMonth());
        assertEquals(28, date.getDay().getDay());
        assertEquals(2023, date.getYear().getYear());

        date = new Date(2, 28, 2023);
        date.increment();
        assertEquals(3, date.getMonth().getMonth());
        assertEquals(1, date.getDay().getDay());
        assertEquals(2023, date.getYear().getYear());

        date = new Date(12, 31, 2023);
        date.increment();
        assertEquals(1, date.getMonth().getMonth());
        assertEquals(1, date.getDay().getDay());
        assertEquals(2024, date.getYear().getYear());
    }

    @Test
    public void testEquals() {
        Date date1 = new Date(2, 22, 2023);
        Date date2 = new Date(2, 22, 2023);
        Date date3 = new Date(3, 22, 2023);
        Date date4 = new Date(2, 23, 2023);
        Date date5 = new Date(2, 22, 2024);
        assertEquals(date1, date2);
        assertNotEquals(date1, date3);
        assertNotEquals(date1, date4);
        assertNotEquals(date1, date5);
        assertNotEquals(date1, "foo");
    }

    @Test
    public void testToString() {
        Date date = new Date(2, 22, 2023);
        assertEquals("2/22/2023", date.toString());
    }

    @Test
    public void testPrint() {
        boolean thrown = false;

        try {
            Date date = new Date(2, 22, 2023);
            date.printDate();
        } catch (Exception e) {
            thrown = true;
        }

        assertFalse(thrown);
    }

}
