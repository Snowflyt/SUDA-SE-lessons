import java.util.function.Supplier;

public class Producer<T> implements Runnable {

    private final ProducerConsumerQueue<T> queue;
    private final Supplier<T> supplier;
    private final int count;

    public Producer(ProducerConsumerQueue<T> queue, int count, Supplier<T> supplier) {
        this.queue = queue;
        this.supplier = supplier;
        this.count = count;
    }

    @Override
    public void run() {
        // put 5 items in the queue
        for (int i = 0; i < count; i++) {
            try {
                T item = supplier.get();
                System.out.println("Produced: " + item);
                queue.put(item);
            } catch (InterruptedException e) {
                e.printStackTrace();
                // restore interrupted status
                Thread.currentThread().interrupt();
            }
        }
    }

}
