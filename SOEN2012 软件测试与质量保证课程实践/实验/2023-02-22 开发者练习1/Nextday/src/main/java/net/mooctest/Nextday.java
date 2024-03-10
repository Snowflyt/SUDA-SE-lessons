package net.mooctest;

public class Nextday {

    public static Date nextDay(Date d) {
        Date dd = new Date(d.getMonth().getCurrentPos(), d.getDay().getCurrentPos(), d.getYear().getCurrentPos());
        dd.increment();
        return dd;
    }

}
