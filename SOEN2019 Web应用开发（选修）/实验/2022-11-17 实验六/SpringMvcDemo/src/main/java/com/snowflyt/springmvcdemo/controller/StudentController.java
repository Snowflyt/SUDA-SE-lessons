package com.snowflyt.springmvcdemo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
@RequestMapping("/student")
public class StudentController {

    @GetMapping
    @ResponseBody
    public String getStudent(String id ) {
        log.info("fetch student");
        return "student with id " + id + " fetched";
    }

    @PostMapping
    public String saveStudent(String id, String name, Model page) {
        log.info("student added");
        page.addAttribute("id", id);
        page.addAttribute("name", name);
        return "student_added.jsp";
    }

}
