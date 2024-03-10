package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class QueenTest {

    @Test
    public void testConstructor() {
        Queen queen = new Queen(4, 4);
        assertEquals(4, queen.getRow());
        assertEquals(4, queen.getColumn());
    }

    @Test
    public void testCanAttack() {
        Queen queen1 = new Queen(3, 3);
        Queen queen2 = new Queen(3, 6);
        Queen queen3 = new Queen(6, 3);
        Queen queen4 = new Queen(6, 6);
        Queen queen5 = new Queen(4, 4);

        assertTrue(queen1.canAttack(queen2));
        assertTrue(queen1.canAttack(queen3));
        assertTrue(queen1.canAttack(queen4));
        assertTrue(queen2.canAttack(queen3));
        assertTrue(queen2.canAttack(queen4));
        assertTrue(queen3.canAttack(queen4));
        assertTrue(queen1.canAttack(queen5));
        assertTrue(queen4.canAttack(queen5));
        assertFalse(queen2.canAttack(queen5));
        assertFalse(queen3.canAttack(queen5));
    }

    @Test
    public void testMoveDown() {
        Queen queen = new Queen(3, 3);

        // Test moving down within bounds
        queen.moveDown(2);
        assertEquals(5, queen.getRow());

        // Test moving down and wrapping around the board
        queen.moveDown(4);
        assertEquals(1, queen.getRow());

        // Test moving down to the last row
        queen.moveDown(6);
        assertEquals(7, queen.getRow());

        // Test moving down by 7 (row should remain the same)
        queen.moveDown(7);
        assertEquals(7, queen.getRow());

        // Test moving down by a multiple of 7 (row should remain the same)
        queen.moveDown(14);
        assertEquals(7, queen.getRow());
    }

    @Test
    public void testSetRow() {
        Queen queen = new Queen(4, 4);
        queen.setRow(6);
        assertEquals(6, queen.getRow());
    }

    @Test
    public void testGetRow() {
        Queen queen = new Queen(5, 4);
        assertEquals(5, queen.getRow());
    }

    @Test
    public void testSetColumn() {
        Queen queen = new Queen(4, 4);
        queen.setColumn(6);
        assertEquals(6, queen.getColumn());
    }

    @Test
    public void testGetColumn() {
        Queen queen = new Queen(4, 5);
        assertEquals(5, queen.getColumn());
    }

    @Test
    public void testToString() {
        Queen queen = new Queen(4, 4);
        assertEquals("(4, 4)", queen.toString());
    }
}