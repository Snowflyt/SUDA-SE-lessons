package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Test;

public class ManacherTest {

    @Test
    public void testGetLongestPalindromicSubstring() {
        // test null input
        assertNull(Manacher.getLongestPalindromicSubstring(null));

        // test empty input
        assertEquals("", Manacher.getLongestPalindromicSubstring(""));

        // test odd-length input
        assertEquals("baxabaxab", Manacher.getLongestPalindromicSubstring("abaxabaxabb"));

        // test even-length input
        assertEquals("abba", Manacher.getLongestPalindromicSubstring("abbaxx"));

        // test input with multiple longest palindromic substrings
        assertEquals("a", Manacher.getLongestPalindromicSubstring("abcda"));
    }

}
