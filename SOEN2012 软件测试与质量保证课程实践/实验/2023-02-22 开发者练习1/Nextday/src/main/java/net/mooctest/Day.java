package net.mooctest;

public class Day extends CalendarUnit {

    private Month m;

    public Day(int pDay, Month m) {
        setDay(pDay, m);
    }

    public boolean increment() {
        currentPos += 1;
        if (currentPos <= m.getMonthSize())
            return true;
        else
            return false;
    }

    public void setDay(int pDay, Month m) {
        setCurrentPos(pDay);
        this.m = m;
        if (!this.isValid()) {
            throw new IllegalArgumentException("Not a valid day");
        }
    }

    public int getDay() {
        return currentPos;
    }

    public boolean isValid() {
        if (m != null && m.isValid())
            if (this.currentPos >= 1 && this.currentPos <= m.getMonthSize())
                return true;
        return false;

    }

    public boolean equals(Object o) {
        if (o instanceof Day) {
            if (this.currentPos == ((Day) o).currentPos
                    && this.m.equals(((Day) o).m))
                return true;
        }
        return false;
    }

}
