package simpledb;

import java.io.*;
import java.security.Permissions;
import java.util.*;

/**
 * HeapFile is an implementation of a DbFile that stores a collection of tuples
 * in no particular order. Tuples are stored on pages, each of which is a fixed
 * size, and the file is simply a collection of those pages. HeapFile works
 * closely with HeapPage. The format of HeapPages is described in the HeapPage
 * constructor.
 * 
 * @see simpledb.HeapPage#HeapPage
 * @author Sam Madden
 */
public class HeapFile implements DbFile {

    private final File file;
    private final TupleDesc tuDesc;

    /**
     * Constructs a heap file backed by the specified file.
     * 
     * @param f
     *          the file that stores the on-disk backing store for this heap
     *          file.
     */
    public HeapFile(File f, TupleDesc td) {
        // some code goes here
        file = f;
        tuDesc = td;
    }

    /**
     * Returns the File backing this HeapFile on disk.
     * 
     * @return the File backing this HeapFile on disk.
     */
    public File getFile() {
        // some code goes here
        return file;
    }

    /**
     * Returns an ID uniquely identifying this HeapFile. Implementation note:
     * you will need to generate this tableid somewhere ensure that each
     * HeapFile has a "unique id," and that you always return the same value for
     * a particular HeapFile. We suggest hashing the absolute file name of the
     * file underlying the heapfile, i.e. f.getAbsoluteFile().hashCode().
     * 
     * @return an ID uniquely identifying this HeapFile.
     */
    public int getId() {
        // some code goes here
        return file.getAbsoluteFile().hashCode();
    }

    /**
     * Returns the TupleDesc of the table stored in this DbFile.
     * 
     * @return TupleDesc of this DbFile.
     */
    public TupleDesc getTupleDesc() {
        // some code goes here
        return tuDesc;
    }

    // see DbFile.java for javadocs
    public Page readPage(PageId pid) {
        // some code goes here
        try {
            RandomAccessFile raf = new RandomAccessFile(file, "r");
            raf.seek(pid.pageNumber() * BufferPool.PAGE_SIZE);
            byte[] data = new byte[BufferPool.PAGE_SIZE];
            raf.read(data);
            raf.close();
            return new HeapPage(new HeapPageId(pid.getTableId(), pid.pageNumber()), data);
        } catch (IOException e) {
            throw new IllegalArgumentException("Page does not exist");
        }
    }

    // see DbFile.java for javadocs
    public void writePage(Page page) throws IOException {
        // some code goes here
        // not necessary for lab1
    }

    /**
     * Returns the number of pages in this HeapFile.
     */
    public int numPages() {
        // some code goes here
        return (int) (file.length() / BufferPool.PAGE_SIZE);
    }

    // see DbFile.java for javadocs
    public ArrayList<Page> insertTuple(TransactionId tid, Tuple t)
            throws DbException, IOException, TransactionAbortedException {
        // some code goes here
        return null;
        // not necessary for lab1
    }

    // see DbFile.java for javadocs
    public ArrayList<Page> deleteTuple(TransactionId tid, Tuple t) throws DbException,
            TransactionAbortedException {
        // some code goes here
        return null;
        // not necessary for lab1
    }

    // see DbFile.java for javadocs
    public DbFileIterator iterator(TransactionId tid) {
        // some code goes here
        return new HeapFileIterator(tid);
    }

    private class HeapFileIterator implements DbFileIterator {

        private final TransactionId tid;
        private int curPage = 0;
        private HeapPage curPageData = null;
        private Iterator<Tuple> curPageIterator = null;

        public HeapFileIterator(TransactionId tid) {
            // some code goes here
            this.tid = tid;
        }

        @Override
        public void open() throws DbException, TransactionAbortedException, IOException {
            curPage = 0;
            curPageData = (HeapPage) Database.getBufferPool().getPage(
                    tid,
                    new HeapPageId(getId(), curPage),
                    simpledb.Permissions.READ_WRITE);
            curPageIterator = curPageData.iterator();
        }

        @Override
        public boolean hasNext() throws DbException, TransactionAbortedException, IOException {
            if (curPageIterator == null) {
                return false;
            }
            if (curPageIterator.hasNext()) {
                return true;
            } else {
                if (curPage < numPages() - 1) {
                    curPage++;
                    curPageData = (HeapPage) Database.getBufferPool().getPage(
                            tid,
                            new HeapPageId(getId(), curPage),
                            simpledb.Permissions.READ_WRITE);
                    curPageIterator = curPageData.iterator();
                    return hasNext();
                } else {
                    return false;
                }
            }
        }

        @Override
        public Tuple next() throws DbException, TransactionAbortedException {
            if (curPageIterator == null) {
                throw new NoSuchElementException("Iterator is not open");
            }
            return curPageIterator.next();
        }

        @Override
        public void rewind() throws DbException, TransactionAbortedException, IOException {
            curPage = 0;
            curPageData = (HeapPage) Database.getBufferPool().getPage(
                    tid,
                    new HeapPageId(getId(), curPage),
                    simpledb.Permissions.READ_WRITE);
            curPageIterator = curPageData.iterator();
        }

        @Override
        public void close() {
            curPageData = null;
            curPageIterator = null;
        }
    }
}
