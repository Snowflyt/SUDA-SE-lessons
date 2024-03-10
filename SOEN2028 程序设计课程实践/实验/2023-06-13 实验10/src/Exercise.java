import java.math.BigDecimal;
import java.io.*;

class Student {
    private String id;
    private String name;
    private String year;
    private String major;
    private String phone;
    private Card card = null;

    public Student(String id, String name, String year, String major, String phone) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.major = major;
        this.phone = phone;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public String getYear() {
        return year;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String newMajor) {
        this.major = newMajor;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String newPhone) {
        this.phone = newPhone;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card newCard) {
        this.card = newCard;
    }
}

class Card {
    private String id;
    private BigDecimal balance = new BigDecimal(0);
    private Student holder;
    private Record[] records = new Record[0];
    private BigDecimal totalDeposit = new BigDecimal(0);
    private BigDecimal totalConsumption = new BigDecimal(0);

    public Card(String id, Student holder) {
        this.id = id;
        this.holder = holder;
    }

    public String getId() {
        return id;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public Student getHolder() {
        return holder;
    }
    
    public BigDecimal getTotalDeposit() {
        return totalDeposit;
    }

    public BigDecimal getTotalConsumption() {
        return totalConsumption;
    }

    public Record[] getRecords() {
        return records;
    }

    public void setRecords(Record[] records) {
        this.records = records;
        balance = new BigDecimal(0);
        totalDeposit = new BigDecimal(0);
        totalConsumption = new BigDecimal(0);
        for (Record record : records) {
            if (record.getType() == Record.Type.CONSUME) {
                totalConsumption = totalConsumption.add(record.getAmount());
                balance = balance.subtract(record.getAmount());
            } else {
                totalDeposit = totalDeposit.add(record.getAmount());
                balance = balance.add(record.getAmount());
            }
        }
    }

    public void addRecord(Record record) {
        Record[] newRecords = new Record[records.length + 1];
        for (int i = 0; i < records.length; i++) {
            newRecords[i] = records[i];
        }
        newRecords[records.length] = record;
        records = newRecords;
        if (record.getType() == Record.Type.CONSUME) {
            totalConsumption = totalConsumption.add(record.getAmount());
            balance = balance.subtract(record.getAmount());
        } else {
            totalDeposit = totalDeposit.add(record.getAmount());
            balance = balance.add(record.getAmount());
        }
    }

    public void removeRecord(Record record) {
        if (record.getType() == Record.Type.CONSUME) {
            totalConsumption = totalConsumption.subtract(record.getAmount());
            balance = balance.add(record.getAmount());
        } else {
            totalDeposit = totalDeposit.subtract(record.getAmount());
            balance = balance.subtract(record.getAmount());
        }
        Record[] newRecords = new Record[records.length - 1];
        int j = 0;
        for (int i = 0; i < records.length; i++) {
            if (records[i] != record) {
                newRecords[j] = records[i];
                j++;
            }
        }
        records = newRecords;
    }

    public void removeRecordByIndex(int index) {
        Record[] newRecords = new Record[records.length - 1];
        int j = 0;
        for (int i = 0; i < records.length; i++) {
            if (i != index) {
                newRecords[j] = records[i];
                j++;
            } else {
                if (records[i].getType() == Record.Type.CONSUME) {
                    totalConsumption = totalConsumption.subtract(records[i].getAmount());
                    balance = balance.add(records[i].getAmount());
                } else {
                    totalDeposit = totalDeposit.subtract(records[i].getAmount());
                    balance = balance.subtract(records[i].getAmount());
                }
            }
        }
        records = newRecords;
    }

    public void updateRecord(Record oldRecord, Record newRecord) {
        if (oldRecord.getType() == Record.Type.CONSUME) {
            totalConsumption = totalConsumption.subtract(oldRecord.getAmount());
            balance = balance.add(oldRecord.getAmount());
        } else {
            totalDeposit = totalDeposit.subtract(oldRecord.getAmount());
            balance = balance.subtract(oldRecord.getAmount());
        }
        if (newRecord.getType() == Record.Type.CONSUME) {
            totalConsumption = totalConsumption.add(newRecord.getAmount());
            balance = balance.subtract(newRecord.getAmount());
        } else {
            totalDeposit = totalDeposit.add(newRecord.getAmount());
            balance = balance.add(newRecord.getAmount());
        }
        for (int i = 0; i < records.length; i++) {
            if (records[i] == oldRecord) {
                records[i] = newRecord;
                break;
            }
        }
    }

    public void updateRecordByIndex(int index, Record record) {
        if (records[index].getType() == Record.Type.CONSUME) {
            totalConsumption = totalConsumption.subtract(records[index].getAmount());
            balance = balance.add(records[index].getAmount());
        } else {
            totalDeposit = totalDeposit.subtract(records[index].getAmount());
            balance = balance.subtract(records[index].getAmount());
        }
        if (record.getType() == Record.Type.CONSUME) {
            totalConsumption = totalConsumption.add(record.getAmount());
            balance = balance.subtract(record.getAmount());
        } else {
            totalDeposit = totalDeposit.add(record.getAmount());
            balance = balance.add(record.getAmount());
        }
        records[index] = record;
    }

    public void clearRecords() {
        records = new Record[0];
        balance = new BigDecimal(0);
        totalDeposit = new BigDecimal(0);
        totalConsumption = new BigDecimal(0);
    }
}

class Record {
    public enum Type {
        DEPOSIT, CONSUME
    }

    private Type type;
    private BigDecimal amount;
    private String location;

    public Record(Type type, BigDecimal amount, String location) {
        this.type = type;
        this.amount = amount;
        this.location = location;
    }

    public Type getType() {
        return type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getLocation() {
        return location;
    }
}

public class Exercise {
    private static final String STUDENT_FILE = "Studata.txt";
    private static final String CARD_FILE = "StuCard.txt";
    private static final String RECORD_FILE = "Recorddata.txt";
    private static final String MAX_DEPOSIT_STUDENT_FILE = "SaveMax.txt";

    private static final String SEPARATOR = "********************************************";

    public static void main(String[] args) throws IOException {
        Student[] students = loadStudents();
        Card[] cards = loadCards(students);

        // Sort students by total consumption
        for (int i = 0; i < students.length - 1; i++) {
            for (int j = 0; j < students.length - 1 - i; j++) {
                if (students[j].getCard().getTotalConsumption().compareTo(students[j + 1].getCard().getTotalConsumption()) > 0) {
                    Student temp = students[j];
                    students[j] = students[j + 1];
                    students[j + 1] = temp;
                }
            }
        }

        // Print all students' information
        for (Student student : students) {
            System.out.println(SEPARATOR);
            System.out.println("学号：" + student.getId());
            System.out.println("姓名：" + student.getName());
            System.out.println("入学年份：" + student.getYear());
            System.out.println("专业：" + student.getMajor());
            System.out.println("联系方式：" + student.getPhone());
            System.out.println("卡号：" + student.getCard().getId());
            System.out.println("余额：" + student.getCard().getBalance());
            System.out.println("该卡共消费：" + student.getCard().getTotalConsumption());
            System.out.println();
        }

        // Get the student with the maximum deposit
        Student maxDepositStudent = students[0];
        for (Student student : students) {
            if (student.getCard().getTotalDeposit().compareTo(maxDepositStudent.getCard().getTotalDeposit()) > 0) {
                maxDepositStudent = student;
            }
        }

        // Save the student with the maximum deposit to file
        BufferedWriter writer = new BufferedWriter(new FileWriter(MAX_DEPOSIT_STUDENT_FILE));
        writer.write(SEPARATOR + "\n");
        writer.write("学号：" + maxDepositStudent.getId() + "\n");
        writer.write("姓名：" + maxDepositStudent.getName() + "\n");
        writer.write("入学年份：" + maxDepositStudent.getYear() + "\n");
        writer.write("专业：" + maxDepositStudent.getMajor() + "\n");
        writer.write("联系方式：" + maxDepositStudent.getPhone() + "\n");
        writer.write("卡号：" + maxDepositStudent.getCard().getId() + "\n");
        writer.write("余额：" + maxDepositStudent.getCard().getBalance() + "\n");
        writer.write("该卡的详细消费情况：\n");
        for (Record record : maxDepositStudent.getCard().getRecords()) {
            String type = record.getType() == Record.Type.CONSUME ? "消费" : "存钱";
            writer.write(type + " 金额：" + record.getAmount() + " 消费地点：" + record.getLocation() + "\n");
        }
        writer.write("该卡共消费：" + maxDepositStudent.getCard().getTotalConsumption() + "\n");
        writer.close();
    }

    private static Student[] loadStudents() throws IOException {
        Student[] students = new Student[0];
        BufferedReader reader = new BufferedReader(new FileReader(STUDENT_FILE));
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(" ");
            Student student = new Student(parts[0], parts[1], parts[2], parts[3], parts[4]);
            Student[] newStudents = new Student[students.length + 1];
            for (int i = 0; i < students.length; i++) {
                newStudents[i] = students[i];
            }
            newStudents[students.length] = student;
            students = newStudents;
        }
        reader.close();
        return students;
    }

    private static Card[] loadCards(Student[] students) throws IOException {
        Card[] cards = new Card[students.length];
        int currCardIndex = 0;

        // Read cards
        BufferedReader reader = new BufferedReader(new FileReader(CARD_FILE));
        String line;
        while ((line = reader.readLine()) != null) {
            if ("".equals(line)) {
                continue;
            }
            String[] parts = line.split(" ");
            for (Student student : students) {
                if (student.getId().equals(parts[0])) {
                    Card card = new Card(parts[1], student);
                    cards[currCardIndex] = card;
                    student.setCard(card);
                }
            }
            currCardIndex++;
        }
        reader.close();

        // Read records and update balance
        reader = new BufferedReader(new FileReader(RECORD_FILE));
        while ((line = reader.readLine()) != null) {
            if ("".equals(line)) {
                continue;
            }
            String[] parts = line.split(" ");
            for (Card card : cards) {
                if (card.getId().equals(parts[0])) {
                    Record record = new Record(parts[1].equals("1") ? Record.Type.DEPOSIT : Record.Type.CONSUME, new BigDecimal(parts[2]), parts[3]);
                    card.addRecord(record);
                }
            }
        }
        reader.close();

        return cards;
    }
}
