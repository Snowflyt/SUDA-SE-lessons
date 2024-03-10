class Stock {
    private final String symbol;
    private String name;
    private double previousClosingPrice = 0;
    private double currentPrice = 0;

    public Stock(String symbol, String name) {
        this.symbol = symbol;
        this.name = name;
    }

    public String getSymbol() {
        return symbol;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPreviousClosingPrice() {
        return previousClosingPrice;
    }

    public void setPreviousClosingPrice(double previousClosingPrice) {
        this.previousClosingPrice = previousClosingPrice;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    /**
     * Return the percentage changed from previous closing price to current price.
     * 
     * @return
     */
    public double getChangePercent() {
        return (currentPrice - previousClosingPrice) / previousClosingPrice;
    }
}

public class Exercise2 {
    public static void main(String[] args) {
        Stock stock = new Stock("ORCL", "Oracle Corporation");
        stock.setPreviousClosingPrice(34.5);
        stock.setCurrentPrice(34.35);
        System.out.printf("Price-change percentage: %.2f%%", stock.getChangePercent() * 100);
    }
}
