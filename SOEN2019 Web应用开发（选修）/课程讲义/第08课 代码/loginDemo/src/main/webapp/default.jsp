<%--
  Created by IntelliJ IDEA.
  User: cheny
  Date: 2022/10/21
  Time: 11:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>请登录</title>
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/site.css" rel="stylesheet">
</head>
<body>
<div class="container login-box">

<h2>请登录</h2>


<form action="checkLogin.jsp" method="post" class="form-group" >
  <label for="userNameabc" class="form-label">请输入用户名</label>
  <input type="input" name="userName" id="userNameabc" class="form-control">

  <label for="userPwdabc" class="form-label">请输入用户名</label>
  <input type="password" name="userPassword" id="userPwdabc" class="form-control">
  <br>
  <div class="text-center">
    <input type="submit" class="btn btn-primary" value = "提交">
  </div>
</form>
</div>
</body>
</html>
