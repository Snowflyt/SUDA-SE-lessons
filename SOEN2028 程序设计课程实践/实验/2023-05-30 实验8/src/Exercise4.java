// 4.(Mylnteger 类）设计一个名为 MyInteger 的类。这个类包括：
// • 一个名为 value 的 int 型数据域,存储这个对象表示的 int 值。
// • — 个为指定的 int 值创建 MyInteger 对象的构造方法。
// • 一个返回 int 值的 get 方法。
// • 如果值分别为偶数、奇数或素数，那么 isEven()、isOdd()和 isPrime()方法都会
// 返回 true。
// • 如果指定值分别为偶数、奇数或素数，那么相应的静态方法isEven(int)、isOdd(int)
// 和 isPrime(int)会返回 true。
// • 如果指定值分别为偶数、奇数或素数，那么相应的静态方法 isEven(MyInteger)、
// isOdd(MyInteger)和 isPrime(MyInteger)会返回 true。
// • 如果该对象的值与指定的值相等，那么 equals(int)和 equals(MyInteger)方法返
// 回 true0
// • 静态方法 parseInt(char[])将数宇字符构成的数组转换为一个 int 值。
// • 静态方法 parseInt(String)将一个字符串转换为一个 int 值。
// 实现这个类。编写客户程序测试这个类中的所有方法。
class MyInteger {
    private int value;

    public MyInteger(int value) {
        this.value = value;
    }

    public int get() {
        return this.value;
    }

    public boolean isEven() {
        return isEven(this.value);
    }

    public boolean isOdd() {
        return isOdd(this.value);
    }

    public boolean isPrime() {
        return isPrime(this.value);
    }

    public static boolean isEven(int value) {
        return value % 2 == 0;
    }

    public static boolean isOdd(int value) {
        return value % 2 == 1;
    }

    public static boolean isPrime(int value) {
        for (int i = 2; i < Math.sqrt(value) + 1; i++) {
            if (value % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static boolean isEven(MyInteger myInteger) {
        return myInteger.get() % 2 == 0;
    }

    public static boolean isOdd(MyInteger myInteger) {
        return myInteger.get() % 2 != 0;
    }

    public static boolean isPrime(MyInteger myInteger) {
        for (int i = 2; i < myInteger.get(); i++) {
            if (myInteger.get() % i == 0) {
                return false;
            }
        }
        return true;
    }

    public boolean equals(int value) {
        return this.value == value;
    }

    public boolean equals(MyInteger myInteger) {
        if (myInteger == null) {
            return false;
        }

        return this.value == myInteger.get();
    }

    public static int parseInt(char[] chars) {
        int value = 0;
        for (int i = 0; i < chars.length; i++) {
            value = value * 10 + (chars[i] - '0');
        }
        return value;
    }

    public static int parseInt(String str) {
        if (str == null) {
            throw new NumberFormatException("null");
        }

        int value = 0;
        for (int i = 0; i < str.length(); i++) {
            value = value * 10 + (str.charAt(i) - '0');
        }
        return value;
    }
}

public class Exercise4 {
    private static final int i1 = 7;
    private static final int i2 = 12;

    private static class ToBe<T> {
        private T value;

        private ToBe(T value) {
            this.value = value;
        }

        public void toBe(T value) {
            if (!this.value.equals(value)) {
                throw new RuntimeException("Expect: " + value + ", but: " + this.value);
            }
        }

        public void toBeTrue() {
            if (!Boolean.TRUE.equals(this.value)) {
                throw new RuntimeException("Expect: true, but: " + this.value);
            }
        }

        public void toBeFalse() {
            if (!Boolean.FALSE.equals(this.value)) {
                throw new RuntimeException("Expect: false, but: " + this.value);
            }
        }
    }

    private static <T> ToBe<T> expect(T value) {
        return new ToBe<>(value);
    }

    public static void main(String[] args) {
        /* Test odd and prime */
        MyInteger myInteger1 = new MyInteger(i1);
        expect(myInteger1.get()).toBe(i1);
        expect(myInteger1.isEven()).toBeFalse();
        expect(myInteger1.isOdd()).toBeTrue();
        expect(myInteger1.isPrime()).toBeTrue();
        expect(MyInteger.isEven(i1)).toBeFalse();
        expect(MyInteger.isOdd(i1)).toBeTrue();
        expect(MyInteger.isPrime(i1)).toBeTrue();
        expect(MyInteger.isEven(myInteger1)).toBeFalse();
        expect(MyInteger.isOdd(myInteger1)).toBeTrue();
        expect(MyInteger.isPrime(myInteger1)).toBeTrue();
        expect(myInteger1.equals(i1)).toBeTrue();
        expect(myInteger1.equals(myInteger1)).toBeTrue();
        expect(myInteger1.equals(new MyInteger(i1))).toBeTrue();
        expect(myInteger1.equals(i2)).toBeFalse();
        expect(myInteger1.equals(new MyInteger(i2))).toBeFalse();

        /* Test even and not prime */
        MyInteger myInteger2 = new MyInteger(i2);
        expect(myInteger2.get()).toBe(i2);
        expect(myInteger2.isEven()).toBeTrue();
        expect(myInteger2.isOdd()).toBeFalse();
        expect(myInteger2.isPrime()).toBeFalse();
        expect(MyInteger.isEven(i2)).toBeTrue();
        expect(MyInteger.isOdd(i2)).toBeFalse();
        expect(MyInteger.isPrime(i2)).toBeFalse();
        expect(MyInteger.isEven(myInteger2)).toBeTrue();
        expect(MyInteger.isOdd(myInteger2)).toBeFalse();
        expect(MyInteger.isPrime(myInteger2)).toBeFalse();
        expect(myInteger2.equals(i2)).toBeTrue();
        expect(myInteger2.equals(myInteger2)).toBeTrue();
        expect(myInteger2.equals(new MyInteger(i2))).toBeTrue();
        expect(myInteger2.equals(i1)).toBeFalse();
        expect(myInteger2.equals(new MyInteger(i1))).toBeFalse();

        /* Test parseInt */
        expect(MyInteger.parseInt(new char[] { '1', '2', '3' })).toBe(123);
        expect(MyInteger.parseInt("123")).toBe(123);

        System.out.println("All tests passed");
    }
}
