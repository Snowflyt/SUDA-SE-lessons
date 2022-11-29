package simpledb;

import static org.junit.Assert.assertEquals;
import junit.framework.JUnit4TestAdapter;

import java.util.Iterator;

import org.junit.Test;

import simpledb.systemtest.SimpleDbTestBase;

public class TupleTest extends SimpleDbTestBase {

    /**
     * Unit test for Tuple.getField() and Tuple.setField()
     */
    @Test
    public void modifyFields() {
        TupleDesc td = Utility.getTupleDesc(2);

        Tuple tup = new Tuple(td);
        tup.setField(0, new IntField(-1));
        tup.setField(1, new IntField(0));

        assertEquals(new IntField(-1), tup.getField(0));
        assertEquals(new IntField(0), tup.getField(1));

        tup.setField(0, new IntField(1));
        tup.setField(1, new IntField(37));

        assertEquals(new IntField(1), tup.getField(0));
        assertEquals(new IntField(37), tup.getField(1));
    }

    /**
     * Unit test for fields() iterator
     * 
     */
    @Test
    public void fields() {

        int numfields = 4;
        TupleDesc td = Utility.getTupleDesc(numfields);

        // set up the tuple
        Tuple tup = new Tuple(td);
        for (int i = 0; i < numfields; i++)
            tup.setField(i, new IntField(i));

        // use the iterator, make sure get the same number of fields out
        Iterator<Field> iter = tup.fields();
        int count = 0;
        while (iter.hasNext()) {
            iter.next();
            count++;
        }
        assertEquals(numfields, count);
    }

    /**
     * Unit test for Tuple.getTupleDesc()
     */
    @Test
    public void getTupleDesc() {
        TupleDesc td = Utility.getTupleDesc(5);
        Tuple tup = new Tuple(td);
        assertEquals(td, tup.getTupleDesc());
    }

    /**
     * Unit test for Tuple.resetTupleDesc()
     * 
     */
    @Test
    public void resetTupleDesc() {
        // create a tuple with the original tuple desc
        TupleDesc origTd = Utility.getTupleDesc(2, "orig");
        Tuple tup = new Tuple(origTd);
        assertEquals("orig0", tup.getTupleDesc().getFieldName(0));

        // rename the fields by changing the tuple desc to a new one
        TupleDesc newTd = Utility.getTupleDesc(2, "new");
        tup.resetTupleDesc(newTd);
        assertEquals("new0", tup.getTupleDesc().getFieldName(0));
    }

    /**
     * Unit test for Tuple.getRecordId() and Tuple.setRecordId()
     */
    @Test
    public void modifyRecordId() {
        Tuple tup1 = new Tuple(Utility.getTupleDesc(1));
        HeapPageId pid1 = new HeapPageId(0, 0);
        RecordId rid1 = new RecordId(pid1, 0);
        tup1.setRecordId(rid1);

        try {
            assertEquals(rid1, tup1.getRecordId());
        } catch (java.lang.UnsupportedOperationException e) {
            // rethrow the exception with an explanation
            throw new UnsupportedOperationException("modifyRecordId() test failed due to " +
                    "RecordId.equals() not being implemented.  This is not required for Lab 1, " +
                    "but should pass when you do implement the RecordId class.");
        }
    }

    /**
     * JUnit suite target
     */
    public static junit.framework.Test suite() {
        return new JUnit4TestAdapter(TupleTest.class);
    }
}
