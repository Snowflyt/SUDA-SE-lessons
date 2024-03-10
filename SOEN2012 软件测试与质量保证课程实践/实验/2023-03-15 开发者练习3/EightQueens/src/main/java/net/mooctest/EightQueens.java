package net.mooctest;

/**
 * @file EightQueens.java
 * @author nsquires
 * Solves the eight queens problem using various AI techniques
 */
import java.util.Random;

public class EightQueens {
	/**
	 * The starter board
	 * 
	 * @return Queen[]
	 */
	public Queen[] generateBoard() {
		Queen[] start = new Queen[8];
		Random gen = new Random();

		for (int i = 0; i < 8; i++) {
			start[i] = new Queen(gen.nextInt(8), i);
		}
		return start;
	}
}
