<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
  <head>
    <title>添加学生</title>
  </head>
  <body>
    <form action="student" method="POST" class="form-group">
      <label for="idInput" class="form-label">输入学生学号</label>
      <input
        type="text"
        name="id"
        id="idInput"
      />
      <br />

      <label for="nameInput" class="form-label">输入学生姓名</label>
      <input
        type="text"
        name="name"
        id="nameInput"
      />
      <br />

      <input type="submit" value="提交" class="btn btn-primary" />
    </form>
  </body>
</html>
