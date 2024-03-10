package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class SimulatedAnnealingTest {

    @Test(timeout = 1000)
    public void testSimulatedAnneal() {
        SimulatedAnnealing sa = new SimulatedAnnealing(new EightQueens().generateBoard());
        Node solution = sa.simulatedAnneal(10, 1);
        while (solution.getHeuristic() != 0) {
            solution = sa.simulatedAnneal(10, 1);
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
            sa = new SimulatedAnnealing(null);
            solution = sa.simulatedAnneal(10, 1);
            while (solution.getHeuristic() != 0) {
                solution = sa.simulatedAnneal(10, 1);
            }
        }
        assertTrue(numTests > 0);
    }

    @Test
    public void testStartState() {
        SimulatedAnnealing sa = new SimulatedAnnealing(new EightQueens().generateBoard());
        sa.startState();

        Queen[] queens = sa.getStartNode().getState();
        assertEquals(8, queens.length);

        for (Queen queen : queens) {
            assertNotNull(queen);
        }
    }

    @Test
    public void testGetNodesGenerated() {
        SimulatedAnnealing sa = new SimulatedAnnealing(new EightQueens().generateBoard());
        assertEquals(0, sa.getNodesGenerated());

        sa.simulatedAnneal(10, 1);
        assertTrue(sa.getNodesGenerated() > 0);
    }

    @Test
    public void testGetStartNode() {
        SimulatedAnnealing sa = new SimulatedAnnealing(new EightQueens().generateBoard());
        Node start = sa.getStartNode();

        assertEquals(8, start.getState().length);
    }
}