package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;

public class ScheduleTest {
    private static Schedule createTestSchedule() {
        return new Schedule();
    }

    private static List<Work> createTestWorkList() {
        List<Work> workList = new ArrayList<>();
        workList.add(new Work("A", 1, 3));
        workList.add(new Work("C", 4, 4));
        workList.add(new Work("E", 8, 2));
        workList.add(new Work("B", 2, 6));
        workList.add(new Work("D", 6, 5));
        return workList;
    }

    @Test
    public void testFCFS() {
        Schedule schedule = createTestSchedule();
        List<Work> workList = createTestWorkList();

        List<Double> result = schedule.FCFS(workList);
        double avgCircleTime = result.get(0);
        double avgCircleTimeWP = result.get(1);

        assertTrue(Math.abs(7.6 - avgCircleTime) < 1e-6);
        assertTrue(Math.abs(5.0 / 3 - avgCircleTimeWP) < 1e-6);

        List<Integer> expectedBeginTimeList = Arrays.asList(1, 4, 8, 10, 16);
        List<Integer> expectedEndTimeList = Arrays.asList(4, 8, 10, 16, 21);
        for (int i = 0; i < workList.size(); i++) {
            assertEquals((int) expectedBeginTimeList.get(i),
                    workList.get(i).getBeginTime());
            assertEquals((int) expectedEndTimeList.get(i),
                    workList.get(i).getEndTime());
        }
    }

    @Test
    public void testSJF() {
        Schedule schedule = createTestSchedule();
        List<Work> workList = createTestWorkList();

        List<Double> result = schedule.SJF(workList);
        double avgCircleTime = result.get(0);
        double avgCircleTimeWP = result.get(1);

        assertTrue(Math.abs(7.4 - avgCircleTime) < 1e-6);
        assertTrue(Math.abs(4.78 / 3 - avgCircleTimeWP) < 1e-6);

        List<Integer> expectedBeginTimeList = Arrays.asList(1, 4, 8, 15, 10);
        List<Integer> expectedEndTimeList = Arrays.asList(4, 8, 10, 21, 15);
        for (int i = 0; i < workList.size(); i++) {
            assertEquals((int) expectedBeginTimeList.get(i),
                    workList.get(i).getBeginTime());
            assertEquals((int) expectedEndTimeList.get(i),
                    workList.get(i).getEndTime());
        }
    }
}
