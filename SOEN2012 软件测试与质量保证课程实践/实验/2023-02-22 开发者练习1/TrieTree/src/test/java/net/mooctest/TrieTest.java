package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class TrieTest {

    private static final Trie tree = new Trie();

    @BeforeClass
    public static void setUp() {
        tree.insert("foo");
        tree.insert("foo");
        tree.insert("bar");
    }

    @Test
    public void testGetRoot() {
        Assert.assertNotNull(tree.getRoot());
    }

    @Test
    public void testInsert() {
        Trie tree = new Trie();

        // Test null and empty string
        tree.insert(null);
        assertFalse(tree.has(null));
        tree.insert("");
        assertFalse(tree.has(""));

        // Test first insert
        tree.insert("foo");
        assertTrue(tree.has("foo"));
        assertEquals(1, tree.countPrefix("foo"));

        // Test second insert
        tree.insert("foo");
        assertTrue(tree.has("foo"));
        assertEquals(2, tree.countPrefix("foo"));

        // Test another insert
        tree.insert("bar");
        assertTrue(tree.has("bar"));
        assertEquals(1, tree.countPrefix("bar"));
    }

    @Test
    public void testHas() {
        assertTrue(tree.has("foo"));
        assertTrue(tree.has("bar"));
        assertFalse(tree.has("baz"));
    }

    @Test
    public void testCountPrefix() {
        // Test null and empty string
        assertEquals(-1, tree.countPrefix(null));
        assertEquals(-1, tree.countPrefix(""));

        // Normal test
        assertEquals(2, tree.countPrefix("fo"));
        assertEquals(1, tree.countPrefix("bar"));
        assertEquals(1, tree.countPrefix("ba"));
        assertEquals(0, tree.countPrefix("baz"));
    }

    @Test
    public void testHasPrefix() {
        // Test null and empty string
        assertNull(tree.hasPrefix(null));
        assertNull(tree.hasPrefix(""));

        // Normal test
        assertNull(tree.hasPrefix("fo"));
        assertNull(tree.hasPrefix("bar"));
        assertNull(tree.hasPrefix("ba"));
        assertNull(tree.hasPrefix("baz"));
    }

    @Test
    public void testPreTraverse() {
        // Test null and empty string
        tree.preTraverse(null);

        // Normal test
        tree.preTraverse(tree.getRoot());
    }

}
