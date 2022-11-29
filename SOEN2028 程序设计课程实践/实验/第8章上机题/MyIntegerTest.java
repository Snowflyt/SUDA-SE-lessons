public class MyIntegerTest {

    public static void main(String[] args) {
        MyInteger myInteger = new MyInteger(10);
        
        System.out.println(myInteger.get());
        System.out.println(myInteger.isEven());
        System.out.println(myInteger.isOdd());
        System.out.println(myInteger.isPrime());
        System.out.println(myInteger.equals(10));
        System.out.println(myInteger.equals(new MyInteger(10)));

        char[] charArray = {'1', '0', '0', '0'};
        System.out.println(MyInteger.parseInt(charArray));

        String str = "100";
        System.out.println(MyInteger.parseInt(str));
    }

}
