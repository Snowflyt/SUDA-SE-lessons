package simpledb;

import static org.junit.Assert.*;

import java.util.NoSuchElementException;

import junit.framework.Assert;
import junit.framework.JUnit4TestAdapter;

import org.junit.Before;
import org.junit.Test;

import simpledb.TestUtil.SkeletonFile;
import simpledb.systemtest.SimpleDbTestBase;
import simpledb.systemtest.SystemTestUtil;

public class CatalogTest extends SimpleDbTestBase {
    private static String name = "test";
    private String nameThisTestRun;

    @Before
    public void addTables() throws Exception {
        Database.getCatalog().clear();
        nameThisTestRun = SystemTestUtil.getUUID();
        Database.getCatalog().addTable(new SkeletonFile(-1, Utility.getTupleDesc(2)), nameThisTestRun);
        Database.getCatalog().addTable(new SkeletonFile(-2, Utility.getTupleDesc(2)), name);
    }

    /**
     * Unit test for Catalog.getTupleDesc()
     */
    @Test
    public void getTupleDesc() throws Exception {
        TupleDesc expected = Utility.getTupleDesc(2);
        TupleDesc actual = Database.getCatalog().getTupleDesc(-1);

        assertEquals(expected, actual);
    }

    /**
     * Unit test for Catalog.getTableId()
     */
    @Test
    public void getTableId() {
        assertEquals(-2, Database.getCatalog().getTableId(name));
        assertEquals(-1, Database.getCatalog().getTableId(nameThisTestRun));

        try {
            Database.getCatalog().getTableId(null);
            Assert.fail("Should not find table with null name");
        } catch (NoSuchElementException e) {
            // Expected to get here
        }

        try {
            Database.getCatalog().getTableId("foo");
            Assert.fail("Should not find table with name foo");
        } catch (NoSuchElementException e) {
            // Expected to get here
        }
    }

    /**
     * Unit test for Catalog.getDatabaseFile()
     */

    @Test
    public void getDatabaseFile() throws Exception {
        DbFile f = Database.getCatalog().getDatabaseFile(-1);

        // NOTE(ghuo): we try not to dig too deeply into the DbFile API here; we
        // rely on HeapFileTest for that. perform some basic checks.
        assertEquals(-1, f.getId());
    }

    /**
     * Unit test for Catalog.getTableName()
     */
    @Test
    public void getTableName() {
        SkeletonFile file = new SkeletonFile(-3, Utility.getTupleDesc(2));
        Database.getCatalog().addTable(file, "MyTableName");

        assertEquals("MyTableName", Database.getCatalog().getTableName(-3));
    }

    /**
     * Unit test for Catalog.addTable() duplicates
     * String comparisons using new String() should hopefully catch == vs. equals()
     * bugs
     */
    @Test
    public void updateTable() {

        SkeletonFile f1 = new SkeletonFile(-4, Utility.getTupleDesc(2));

        // add table with id and name
        String tableName1 = "OldName";
        Database.getCatalog().addTable(f1, tableName1);

        // add table with same id, this time with name (should update or override
        // previous entry)
        Database.getCatalog().addTable(f1, "NewName");

        // check that lookups by id and the new name yield the same file
        // use new String() to force a new String object in memory
        String newName = new String("NewName");
        assertEquals(newName, Database.getCatalog().getTableName(f1.getId()));
        assertEquals(f1.getId(), Database.getCatalog().getTableId(newName));

    }

    /**
     * Unit test for Catalog.clear()
     */
    @Test
    public void clear() {
        Database.getCatalog().addTable(new SkeletonFile(-5, Utility.getTupleDesc(1)), "TableName");
        Database.getCatalog().clear();
        try {
            Database.getCatalog().getTableId("TableName");
            fail("Expected NoSuchElementException");
        } catch (NoSuchElementException e) {
            // should get here
        }
    }

    /**
     * JUnit suite target
     */
    public static junit.framework.Test suite() {
        return new JUnit4TestAdapter(CatalogTest.class);
    }
}
