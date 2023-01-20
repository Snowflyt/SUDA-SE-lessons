package com.sowflyt.logindemo.servlet;

import com.sowflyt.logindemo.util.JdbcUtil;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@WebServlet("/CheckLoginServlet")
public class CheckLoginServlet extends HttpServlet {

    private static final String PROMPT_ATTRIBUTE = "prompt";
    private static final String LOGIN_FAIL_PAGE = "/loginFail.jsp";

    private static boolean isUserExist(String username) throws SQLException {
        String sql = "SELECT * FROM user WHERE username = ?";
        try (Connection connection = JdbcUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, username);
            ResultSet resultSet = statement.executeQuery();
            return resultSet.next();
        }
    }

    private static boolean isPasswordCorrect(String username, String password) throws SQLException {
        String sql = "SELECT * FROM user WHERE username = ? AND password = ?";
        try (Connection connection = JdbcUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, username);
            statement.setString(2, password);
            ResultSet resultSet = statement.executeQuery();
            return resultSet.next();
        }
    }

    private static Map<String, String> getProblems() throws SQLException {
        String sql = "SELECT * FROM problem";
        try (Connection connection = JdbcUtil.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            ResultSet resultSet = statement.executeQuery();
            Map<String, String> problems = new HashMap<>();
            while (resultSet.next()) {
                problems.put(resultSet.getString("problem"), resultSet.getString("answer"));
            }
            return problems;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // get the username and password from the request and compare them with the database
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        try {
            // judge whether the username is empty
            if (username == null || username.equals("")) {
                request.setAttribute(PROMPT_ATTRIBUTE, "用户名不能为空");
                request.getRequestDispatcher(LOGIN_FAIL_PAGE).forward(request, response);
                return;
            }
            // judge whether user exists
            if (!isUserExist(username)) {
                request.setAttribute(PROMPT_ATTRIBUTE, "用户不存在");
                request.getRequestDispatcher(LOGIN_FAIL_PAGE).forward(request, response);
                return;
            }
            // judge whether the password is correct
            if (!isPasswordCorrect(username, password)) {
                request.setAttribute(PROMPT_ATTRIBUTE, "密码错误");
                request.getRequestDispatcher(LOGIN_FAIL_PAGE).forward(request, response);
                return;
            }
            // login successfully and show the problems
            request.setAttribute("problems", getProblems());
            request.getRequestDispatcher("/welcome.jsp").forward(request, response);
        } catch (SQLException | ServletException e) {
            log.error("Error occurred when checking login", e);
        }
    }

}
