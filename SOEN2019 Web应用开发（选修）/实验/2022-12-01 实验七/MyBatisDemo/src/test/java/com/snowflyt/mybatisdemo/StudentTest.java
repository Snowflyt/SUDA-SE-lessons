package com.snowflyt.mybatisdemo;

import com.snowflyt.mybatisdemo.entity.Student;
import com.snowflyt.mybatisdemo.util.MyBatisHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Slf4j
class StudentTest {

    @Test
    void selectStudent() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            Student student = session.selectOne("selectStudent", 2L);
            log.info("SELECT: student={}", student);
            assertNotNull(student);
        }
    }

    @Test
    void selectAllStudents() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            List<Student> students = session.selectList("selectAllStudents");
            log.info("SELECT_ALL: students={}", students);
            assertTrue(students.size() > 0);
        }
    }

    @Test
    void updateStudent() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            Student oldStudent = session.selectOne("selectStudent", 2L);
            log.info("UPDATE: oldStudent={}", oldStudent);
            assertNotNull(oldStudent);
            Student newStudent = new Student();
            newStudent.setId(2L);
            newStudent.setName("Mike");
            newStudent.setBirth(LocalDate.of(1999, 1, 1));
            log.info("UPDATE: newStudent={}", newStudent);
            session.update("updateStudent", newStudent);
            session.commit();
            assertEquals(newStudent, session.selectOne("selectStudent", 2L));
            session.update("updateStudent", oldStudent);
            session.commit();
            assertEquals(oldStudent, session.selectOne("selectStudent", 2L));
        }
    }

    @Test
    void insertStudent() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            Student student = new Student();
            student.setName("John");
            student.setBirth(LocalDate.of(1990, 1, 1));
            log.info("INSERT: student={}", student);
            session.insert("insertStudent", student);
            session.commit();
            List<Student> students = session.selectList("selectAllStudents");
            student.setId(students.get(students.size() - 1).getId());
            assertEquals(student, students.get(students.size() - 1));
        }
    }

    @Test
    void deleteStudent() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            assertNotNull(session.selectOne("selectStudent", 1L));
            Student student = session.selectOne("selectStudent", 1L);
            log.info("DELETE: student={}", student);
            session.delete("deleteStudent", 1L);
            session.commit();
            assertNull(session.selectOne("selectStudent", 1L));
            session.insert("insertStudent", student);
            session.commit();
            assertNotNull(session.selectOne("selectStudent", 1L));
        }
    }

}
