package com.sowflyt.logindemo.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JdbcUtil {

    private static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";

    private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/login_demo";

    private static final String DATABASE_USERNAME = "root";

    private static final String DATABASE_PASSWORD = "";

    static {
        try {
            Class.forName(JDBC_DRIVER);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    private JdbcUtil() {
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD);
    }

}
