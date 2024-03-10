package net.mooctest;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;

import org.junit.Test;

public class StringFunctionTest {

    private static <T> void assertArrayEqualsIgnoringOrder(T[] expected, T[] actual) {
        Arrays.sort(expected);
        Arrays.sort(actual);
        assertArrayEquals(expected, actual);
    }

    private static void assertStringIgnoringOrderArrayEqualsIgnoringOrder(
            String[] expected,
            String[] actual) {
        String[] expectedToCompare = new String[expected.length];
        String[] actualToCompare = new String[actual.length];

        for (int i = 0; i < expected.length; i++) {
            char[] expectedChars = expected[i].toCharArray();
            Arrays.sort(expectedChars);
            expectedToCompare[i] = new String(expectedChars);
        }
        for (int i = 0; i < actual.length; i++) {
            char[] actualChars = actual[i].toCharArray();
            Arrays.sort(actualChars);
            actualToCompare[i] = new String(actualChars);
        }

        assertArrayEqualsIgnoringOrder(expectedToCompare, actualToCompare);
    }

    @Test
    public void testInstantiation() {
        assertNotNull(new StringFunction());
    }

    @Test
    public void testReverseWordsByCharWithAdditionalStorage() {
        assertEquals("world! hello,", StringFunction.reverseWordsByCharWithAdditionalStorage("hello, world!"));
        assertEquals("", StringFunction.reverseWordsByCharWithAdditionalStorage(""));
        assertEquals("blue is sky the",
                StringFunction.reverseWordsByCharWithAdditionalStorage("the sky is blue"));
        assertEquals("one two three four",
                StringFunction.reverseWordsByCharWithAdditionalStorage("four three two one"));
    }

    @Test
    public void testReverseWordsInPlace() {
        assertEquals("world! hello,", StringFunction.reverseWordsInPlace("hello, world!"));
        assertEquals("", StringFunction.reverseWordsInPlace(""));
        assertEquals("blue is sky the", StringFunction.reverseWordsInPlace("the sky is blue"));
        assertEquals("one two three four", StringFunction.reverseWordsInPlace("four three two one"));
    }

    @Test
    public void testIsPalindromeInPlace() {
        assertTrue(StringFunction.isPalindromeInPlace("racecar"));
        assertTrue(StringFunction.isPalindromeInPlace("a"));
        assertTrue(StringFunction.isPalindromeInPlace(""));
        assertFalse(StringFunction.isPalindromeInPlace("hello"));
        assertFalse(StringFunction.isPalindromeInPlace("world"));
    }

    @Test
    public void testGenerateSubsets() {
        assertStringIgnoringOrderArrayEqualsIgnoringOrder(
                new String[] { "", "a", "b", "ab" },
                StringFunction.generateSubsets("ab"));
        assertStringIgnoringOrderArrayEqualsIgnoringOrder(
                new String[] { "", "x", "y", "xy", "z", "xz", "yz", "xyz" },
                StringFunction.generateSubsets("xyz"));
        assertStringIgnoringOrderArrayEqualsIgnoringOrder(
                new String[] { "", "1", "2", "12", "3", "13", "23", "123" },
                StringFunction.generateSubsets("123"));
    }

    @Test
    public void testLevenshteinDistanceRecursive() {
        assertEquals(0, StringFunction.levenshteinDistanceRecursive("", ""));
        assertEquals(1, StringFunction.levenshteinDistanceRecursive("", "a"));
        assertEquals(1, StringFunction.levenshteinDistanceRecursive("a", ""));
        assertEquals(0, StringFunction.levenshteinDistanceRecursive("abc", "abc"));
        assertEquals(1, StringFunction.levenshteinDistanceRecursive("abc", "ab"));
        assertEquals(1, StringFunction.levenshteinDistanceRecursive("abc", "abcd"));
        assertEquals(3, StringFunction.levenshteinDistanceRecursive("kitten", "sitting"));
        assertEquals(8, StringFunction.levenshteinDistanceRecursive("rosettacode", "raisethysword"));
    }

    @Test
    public void testLevenshteinDistanceIterative() {
        assertEquals(0, StringFunction.levenshteinDistanceIterative("", ""));
        assertEquals(1, StringFunction.levenshteinDistanceIterative("", "a"));
        assertEquals(1, StringFunction.levenshteinDistanceIterative("a", ""));
        assertEquals(0, StringFunction.levenshteinDistanceIterative("abc", "abc"));
        assertEquals(1, StringFunction.levenshteinDistanceIterative("abc", "ab"));
        assertEquals(1, StringFunction.levenshteinDistanceIterative("abc", "abcd"));
        assertEquals(3, StringFunction.levenshteinDistanceIterative("kitten", "sitting"));
        assertEquals(8, StringFunction.levenshteinDistanceIterative("rosettacode", "raisethysword"));
    }

}
