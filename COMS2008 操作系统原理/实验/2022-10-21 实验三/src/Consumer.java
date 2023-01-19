public class Consumer<T> implements Runnable {

    private final ProducerConsumerQueue<T> queue;
    private final int count;

    public Consumer(ProducerConsumerQueue<T> queue, int count) {
        this.queue = queue;
        this.count = count;
    }

    @Override
    public void run() {
        // get 5 items from the queue
        for (int i = 0; i < count; i++) {
            try {
                T item = queue.get();
                System.out.println("Consumed: " + item);
            } catch (InterruptedException e) {
                e.printStackTrace();
                // restore interrupted status
                Thread.currentThread().interrupt();
            }
        }
    }
    
}
