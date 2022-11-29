public class MyInteger {

    private int value;

    public MyInteger(int value) {
        this.value = value;
    }

    public int get() {
        return value;
    }

    public boolean isEven() {
        return isEven(value);
    }

    public static boolean isEven(int value) {
        return value % 2 == 0;
    }

    public boolean isOdd() {
        return isOdd(value);
    }

    public static boolean isOdd(int value) {
        return value % 2 == 1;
    }

    public boolean isPrime() {
        return isPrime(value);
    }

    public static boolean isPrime(int value) {
        if (value == 2) {
            return true;
        }
        if (value < 2 || value % 2 == 0) {
            return false;
        }
        for (int i = 3; i * i <= value; i += 2) {
            if (value % i == 0) {
                return false;
            }
        }
        return true;
    }

    public boolean equals(int value) {
        return this.value == value;
    }

    public boolean equals(MyInteger value) {
        return this.value == value.get();
    }
    
    public static int parseInt(char[] charArray) {
        int result = 0;
        for (int i = 0; i < charArray.length; i++) {
            result = result * 10 + charArray[i] - '0';
        }
        return result;
    }

    public static int parseInt(String str) {
        int result = 0;
        for (int i = 0; i < str.length(); i++) {
            result = result * 10 + str.charAt(i) - '0';
        }
        return result;
    }

}
