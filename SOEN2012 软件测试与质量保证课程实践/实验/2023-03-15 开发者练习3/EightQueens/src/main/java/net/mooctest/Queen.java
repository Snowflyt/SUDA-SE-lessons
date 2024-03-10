package net.mooctest;

/**
 * @file Queen.java
 * @author nsquires
 *         A Queen chess piece
 */

public class Queen {
	private int row;
	private int column;

	/**
	 * Constructor. Sets Queen's row and column
	 * 
	 * @param r
	 * @param c
	 */
	public Queen(int r, int c) {
		row = r;
		column = c;
	}

	/**
	 * Determines whether this queen can attack another
	 * 
	 * @param q
	 * @return boolean
	 */
	public boolean canAttack(Queen q) {
		boolean canAttack = false;

		// test rows and columns
		if (row == q.getRow() || column == q.getColumn())
			canAttack = true;
		// test diagonal
		else if (Math.abs(column - q.getColumn()) == Math.abs(row - q.getRow()))
			canAttack = true;

		return canAttack;
	}

	/**
	 * moves the piece down
	 * 
	 * @param spaces
	 */
	public void moveDown(int spaces) {
		row += spaces;

		// bound check/reset
		if (row > 7 && row % 7 != 0) {
			row = (row % 7) - 1;
		} else if (row > 7 && row % 7 == 0) {
			row = 7;
		}
	}

	/**
	 * row setter
	 * 
	 * @param r
	 */
	public void setRow(int r) {
		row = r;
	}

	/**
	 * row getter
	 * 
	 * @return int
	 */
	public int getRow() {
		return row;
	}

	/**
	 * column setter
	 * 
	 * @param c
	 */
	public void setColumn(int c) {
		column = c;
	}

	/**
	 * column getter
	 * 
	 * @return int
	 */
	public int getColumn() {
		return column;
	}

	public String toString() {
		return "(" + row + ", " + column + ")";
	}
}
