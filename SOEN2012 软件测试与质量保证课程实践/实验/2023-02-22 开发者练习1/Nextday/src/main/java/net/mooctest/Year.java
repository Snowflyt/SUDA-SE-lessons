package net.mooctest;

public class Year extends CalendarUnit {

    public Year(int pYear) {
        setYear(pYear);
    }

    public void setYear(int pYear) {
        setCurrentPos(pYear);
        if (!this.isValid()) {
            throw new IllegalArgumentException("Not a valid month");
        }
    }

    public int getYear() {
        return currentPos;
    }

    public boolean increment() {
        currentPos = currentPos + 1;
        if (currentPos == 0)
            currentPos = 1;
        return true;
    }

    public boolean isLeap() {
        return (currentPos >= 0
                && (((currentPos % 4 == 0)
                        && (currentPos % 100 != 0))
                        || (currentPos % 400 == 0)))
                ||
                (currentPos < 0
                        && ((((currentPos * -1) % 4 == 1)
                                && ((currentPos * -1) % 100 != 1))
                                || ((currentPos * -1) % 400 == 1)));
    }

    @Override
    protected boolean isValid() {
        return currentPos != 0;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof Year
                && currentPos == ((Year) o).currentPos;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

}
