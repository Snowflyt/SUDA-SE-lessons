package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class HillClimbingTest {
    @Test
    public void testConstructor() {
        HillClimbing hc = new HillClimbing();
        Node node = hc.getStartNode();
        assertNotNull(node);
        assertEquals(node.getState().length, 8);
    }

    @Test
    public void testStartState() {
        HillClimbing hc = new HillClimbing();
        hc.startState();
        Node node = hc.getStartNode();
        assertNotNull(node);
        assertEquals(node.getState().length, 8);
    }

    @Test(timeout = 1000)
    public void testHillClimbing() {
        boolean allFalse = true;
        while (allFalse) {
            HillClimbing hc = new HillClimbing();
            Node solution = hc.hillClimbing();
            Queen[] queens = solution.getState();
            allFalse = false;
            for (int i = 0; i < queens.length; i++) {
                for (int j = i + 1; j < queens.length; j++) {
                    allFalse = allFalse && !queens[i].canAttack(queens[j]);
                }
            }
        }
    }

    @Test
    public void testHillClimbingWithStartingState() {
        Queen[] queens = new EightQueens().generateBoard();

        boolean allFalse = true;
        while (allFalse) {
            HillClimbing hc = new HillClimbing();
            Node solution = hc.hillClimbing();
            queens = solution.getState();
            allFalse = false;
            for (int i = 0; i < queens.length; i++) {
                for (int j = i + 1; j < queens.length; j++) {
                    allFalse = allFalse && !queens[i].canAttack(queens[j]);
                }
            }
        }
    }

    @Test
    public void testGetNodesGenerated() {
        HillClimbing hc = new HillClimbing();
        hc.hillClimbing();
        assertTrue(hc.getNodesGenerated() > 0);
    }
}