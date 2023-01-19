import java.util.concurrent.Semaphore;

public class ProducerConsumerQueue<T> {

    private final Semaphore availableItems;
    private final Semaphore availableSpaces;
    private final T[] items;
    private int putPosition = 0;
    private int takePosition = 0;

    @SuppressWarnings("unchecked")
    public ProducerConsumerQueue(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException();
        }
        availableItems = new Semaphore(0);
        availableSpaces = new Semaphore(capacity);
        items = (T[]) new Object[capacity];
    }

    public void put(T item) throws InterruptedException {
        availableSpaces.acquire();
        items[putPosition] = item;
        putPosition = (putPosition + 1) % items.length;
        availableItems.release();
    }

    public T get() throws InterruptedException {
        availableItems.acquire();
        T item = items[takePosition];
        takePosition = (takePosition + 1) % items.length;
        availableSpaces.release();
        return item;
    }

}
