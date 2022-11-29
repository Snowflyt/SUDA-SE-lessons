package simpledb;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Iterator;

/**
 * Tuple maintains information about the contents of a tuple. Tuples have a
 * specified schema specified by a TupleDesc object and contain Field objects
 * with the data for each field.
 */
public class Tuple implements Serializable {

    private static final long serialVersionUID = 1L;

    private TupleDesc td;
    private RecordId rid;
    private final Field[] fields;

    /**
     * Create a new tuple with the specified schema (type).
     * 
     * @param td
     *           the schema of this tuple. It must be a valid TupleDesc
     *           instance with at least one field.
     */
    public Tuple(TupleDesc td) {
        // some code goes here
        this.td = td;
        this.rid = null;
        this.fields = new Field[td.numFields()];
    }

    /**
     * @return The TupleDesc representing the schema of this tuple.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here
        return this.td;
    }

    /**
     * @return The RecordId representing the location of this tuple on disk. May
     *         be null.
     */
    public RecordId getRecordId() {
        // some code goes here
        return this.rid;
    }

    /**
     * Set the RecordId information for this tuple.
     * 
     * @param rid
     *            the new RecordId for this tuple.
     */
    public void setRecordId(RecordId rid) {
        // some code goes here
        this.rid = rid;
    }

    /**
     * Change the value of the ith field of this tuple.
     * 
     * @param i
     *          index of the field to change. It must be a valid index.
     * @param f
     *          new value for the field.
     */
    public void setField(int i, Field f) {
        // some code goes here
        this.fields[i] = f;
    }

    /**
     * @return the value of the ith field, or null if it has not been set.
     * 
     * @param i
     *          field index to return. Must be a valid index.
     */
    public Field getField(int i) {
        // some code goes here
        return this.fields[i];
    }

    /**
     * Returns the contents of this Tuple as a string. Note that to pass the
     * system tests, the format needs to be as follows:
     * 
     * column1\tcolumn2\tcolumn3\t...\tcolumnN\n
     * 
     * where \t is any whitespace, except newline, and \n is a newline
     */
    public String toString() {
        // some code goes here
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < this.fields.length; i++) {
            sb.append(this.fields[i].toString());
            if (i != this.fields.length - 1) {
                sb.append("\t");
            }
        }
        sb.append("\n");
        return sb.toString();
    }

    /**
     * @return
     *         An iterator which iterates over all the fields of this tuple
     */
    public Iterator<Field> fields() {
        // some code goes here
        return new FieldIterator();
    }

    private class FieldIterator implements Iterator<Field> {

        private int curr = 0;

        @Override
        public boolean hasNext() {
            // some code goes here
            return curr < fields.length;
        }

        @Override
        public Field next() {
            // some code goes here
            return fields[curr++];
        }

        @Override
        public void remove() {
            // some code goes here
            throw new UnsupportedOperationException();
        }
    }

    /**
     * Reset the TupleDesc of this tuple
     * Does not need to worry about the fields inside the Tuple
     */
    public void resetTupleDesc(TupleDesc td) {
        // some code goes here
        this.td = td;
    }
}
