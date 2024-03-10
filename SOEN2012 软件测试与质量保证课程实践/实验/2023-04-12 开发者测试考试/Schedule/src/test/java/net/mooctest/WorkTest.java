package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.Field;

import org.junit.Test;

public class WorkTest {
    private static Work createTestWork() {
        return new Work("name", 1, 2);
    }

    @Test
    public void testConstructor() {
        Work work = createTestWork();

        // Use reflect to get the private field "name"
        try {
            Field field = Work.class.getDeclaredField("name");
            field.setAccessible(true);
            assertEquals("name", field.get(work));
        } catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        assertEquals(1, work.getArrivalTime());
        assertEquals(2, work.getServiceTime());
        assertEquals(0, work.getBeginTime());
        assertEquals(0, work.getEndTime());
        assertEquals(0, work.getPriority());
        assertFalse(work.isIn());
    }

    @Test
    public void testSetters() {
        Work work = createTestWork();

        work.setBeginTime(3);
        assertEquals(3, work.getBeginTime());

        work.setEndTime(4);
        assertEquals(4, work.getEndTime());

        work.setIn();
        assertTrue(work.isIn());
    }

    @Test
    public void testCircleTime() {
        Work work = createTestWork();

        // Test circle time
        work.setBeginTime(3);
        work.setEndTime(4);
        assertEquals(3, work.getCircleTime());

        work.setBeginTime(5);
        work.setEndTime(17);
        assertEquals(16, work.getCircleTime());

        // Test circle WP time
        work.setBeginTime(3);
        work.setEndTime(4);
        assertTrue(Math.abs(1.5 - work.getCircleWPTime()) < 1e-6);

        work.setBeginTime(5);
        work.setEndTime(17);
        assertTrue(Math.abs(8.0 - work.getCircleWPTime()) < 1e-6);
    }
}
