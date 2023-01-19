public class ProducerConsumer {

    public static void main(String[] args) {
        // create buffer queue
        int capacity = 3;
        ProducerConsumerQueue<Double> queue = new ProducerConsumerQueue<>(capacity);

        // create producer and consumer
        int count = 10;
        Producer<Double> producer = new Producer<>(queue, count, Math::random);
        Consumer<Double> consumer = new Consumer<>(queue, count);

        // start producer and consumer threads
        new Thread(producer).start();
        new Thread(consumer).start();
    }

}
