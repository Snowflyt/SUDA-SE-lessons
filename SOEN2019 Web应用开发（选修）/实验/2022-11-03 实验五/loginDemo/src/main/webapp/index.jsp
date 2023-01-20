<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
  <head>
    <title>登录</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
  </head>
  <body>
    <div class="container login-box">
      <form action="CheckLoginServlet" method="post" class="form-group">
        <label for="usernameInput" class="form-label">输入用户名</label>
        <input
          type="input"
          name="username"
          id="usernameInput"
          class="form-control"
        />
        <br />

        <label for="passwordInput" class="form-label">输入密码</label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          class="form-control"
        />
        <br />

        <div class="text-center">
          <input type="submit" value="提交" class="btn btn-primary " />
        </div>
      </form>
    </div>
  </body>
</html>
