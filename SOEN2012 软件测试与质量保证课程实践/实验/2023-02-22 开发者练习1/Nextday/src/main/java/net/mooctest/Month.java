package net.mooctest;

public class Month extends CalendarUnit {

    private Year y;
    private int[] sizeIndex = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

    public Month(int pMonth, Year y) {
        setMonth(pMonth, y);
    }

    public void setMonth(int pMonth, Year y) {
        setCurrentPos(pMonth);
        this.y = y;
        if (!this.isValid()) {
            throw new IllegalArgumentException("Not a valid month");
        }
    }

    public int getMonth() {
        return currentPos;
    }

    public int getMonthSize() {
        if (y.isLeap())
            sizeIndex[1] = 29;
        else
            sizeIndex[1] = 28;
        return sizeIndex[currentPos - 1];
    }

    public boolean increment() {
        currentPos += 1;
        if (currentPos > 12)
            return false;
        else
            return true;
    }

    public boolean isValid() {
        if (y != null && y.isValid())
            if (this.currentPos >= 1 && this.currentPos <= 12)
                return true;
        return false;

    }

    public boolean equals(Object o) {
        if (o instanceof Month) {
            if (this.currentPos == ((Month) o).currentPos
                    && this.y.equals(((Month) o).y))
                return true;
        }
        return false;
    }

}
