<%@ page contentType="text/html; charset=UTF-8" import="java.util.Map" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
  <head>
    <title>四则运算题库</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/site.css" rel="stylesheet" />
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>四则运算题库</h1>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>题目</th>
                <th>答案</th>
              </tr>
            </thead>
            <tbody>
              <%
                  Map<String, String> problems = (Map<String, String>) request.getAttribute("problems");
                  for (Map.Entry<String, String> entry : problems.entrySet()) {
                      out.println("<tr>");
                      out.println("<td>" + entry.getKey() + "</td>");
                      out.println("<td>" + entry.getValue() + "</td>");
                      out.println("</tr>");
                  }
              %>
            </tbody>
          </table>
        </div>
      </div>
  </body>
</html>
