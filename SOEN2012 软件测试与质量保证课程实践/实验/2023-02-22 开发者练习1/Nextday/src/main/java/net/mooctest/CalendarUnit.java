package net.mooctest;

public abstract class CalendarUnit {

	protected int currentPos;

	protected void setCurrentPos(int pCurrentPos) {
		currentPos = pCurrentPos;
	}

	protected int getCurrentPos() {
		return currentPos;
	}

	protected abstract boolean increment();

	protected abstract boolean isValid();

}
