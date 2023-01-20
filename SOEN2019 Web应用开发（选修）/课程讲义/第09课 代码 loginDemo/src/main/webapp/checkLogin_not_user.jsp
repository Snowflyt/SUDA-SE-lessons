<%--
  Created by IntelliJ IDEA.
  User: cheny
  Date: 2022/10/21
  Time: 11:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录判断</title>
</head>
<body>
    <%
        String userName = request.getParameter("userName");
        String pwd = request.getParameter("userPassword");
        //只能用户名为cy, 密码为abc的用户登录
        if ("cy".equals(userName.trim()) && "abc".equals(pwd)) {
            out.println("登录成功");
        } else {
            out.println("非法访问");
        }
    %>

</body>
</html>
