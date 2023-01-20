<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/site.css" rel="stylesheet">
</head>
<body>

<div class="container login-box" >
    <form action="CheckLoginServlet" method="post" class="form-group">
        <label for="userName" class="form-label">输入用户名</label>
        <input  type = "input" name="userName" id="userName" class="form-control"> <br />

        <label for="userPwd" class="form-label">输入密码</label>
        <input  type = "password" name="userPwd" id="userPwd" class="form-control"> <br />

        <lable class="form-label">请选择兴趣爱好</lable>
        <input type="checkbox" name="like" value="踢球" id="likeFootball" class="form-check-input"> <label for="likeFootball" class="form-check-label">踢球</label>
        <input type="checkbox" name="like" value="游戏" id="likeGame" class="form-check-input">  <label for="likeGame" class="form-check-label">游戏</label>
        <input type="checkbox" name="like" value="学习" id="likeSleep" class="form-check-input"> <label for="likeSleep" class="form-check-label">睡觉</label>

        <div class="text-center">
            <input type="submit" value="提交" class="btn btn-primary ">
        </div>




    </form>
</div>

</body>
</html>