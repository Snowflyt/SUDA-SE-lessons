package cn.edu.suda.servletproject;

import java.io.*;
import java.util.Date;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "helloServlet", value = "/hello-servlet")
public class HelloServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Hello World!";
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        System.out.println("doGet请求执行.......");
        // Hello
        Date dt = new Date();
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>" + dt + "</h1>");
        out.println("</body></html>");
    }

    public void destroy() {
    }
}