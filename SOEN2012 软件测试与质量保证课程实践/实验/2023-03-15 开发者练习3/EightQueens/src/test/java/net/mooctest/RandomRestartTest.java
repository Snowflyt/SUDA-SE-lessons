package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class RandomRestartTest {
    @Test(timeout = 1000)
    public void testRandomRestart() {
        RandomRestart rr = new RandomRestart(new EightQueens().generateBoard());
        Node solution = rr.randomRestart();
        while (solution.getHeuristic() != 0) {
            solution = rr.randomRestart();
        }
        assertNotNull(solution);
        assertEquals(0, solution.getHeuristic());
        Queen[] queens = solution.getState();
        boolean allFalse;
        int numTests = 0;
        while (true) {
            allFalse = true;
            for (int i = 0; i < queens.length; i++) {
                for (int j = i + 1; j < queens.length; j++) {
                    numTests++;
                    if (queens[i].getRow() == queens[j].getRow() ||
                            queens[i].getColumn() == queens[j].getColumn() ||
                            queens[i].canAttack(queens[j])) {
                        assertFalse(queens[i].canAttack(queens[j]));
                        allFalse = false;
                    }
                }
            }
            if (allFalse)
                break;
            rr = new RandomRestart(null);
            solution = rr.randomRestart();
            while (solution.getHeuristic() != 0) {
                solution = rr.randomRestart();
            }
        }
        assertTrue(numTests > 0);
    }

    @Test
    public void testSetAndGetStartNode() {
        Node n = new Node();
        RandomRestart rr = new RandomRestart(new EightQueens().generateBoard());
        rr.setStartNode(n);
        assertEquals(n, rr.getStartNode());
    }

    @Test
    public void testGetNodesGenerated() {
        RandomRestart rr = new RandomRestart(new EightQueens().generateBoard());
        rr.randomRestart();
        assertTrue(rr.getNodesGenerated() > 0);
    }
}
