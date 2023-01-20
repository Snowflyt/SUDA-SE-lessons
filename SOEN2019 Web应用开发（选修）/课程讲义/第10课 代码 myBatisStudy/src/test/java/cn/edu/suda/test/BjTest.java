package cn.edu.suda.test;

import cn.edu.suda.domain.Student;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

public class BjTest {
    @Test
    public void GetBj() throws IOException {
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
        SqlSession sqlSession = sqlSessionFactory.openSession();

        Student student = sqlSession.selectOne("selectBj", "002");
        System.out.println(student);

        sqlSession.commit();
        sqlSession.close();
    }

    @Test
    public void GetAllStudents() throws IOException {
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
        SqlSession sqlSession = sqlSessionFactory.openSession();

        List<Student> students = sqlSession.selectList("selectAllStudent");
        students.forEach(s-> System.out.println(s));

        sqlSession.commit();
        sqlSession.close();
    }

    @Test
    public void InsertAStudent() throws IOException {
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
        SqlSession sqlSession = sqlSessionFactory.openSession();

        Student student = new Student();
        student.setXh("111");
        student.setXm("zzz");
        student.setAge(28);

        sqlSession.insert("insertStudent",student);

        List<Student> students = sqlSession.selectList("selectAllStudent");
        students.forEach(s-> System.out.println(s));
        sqlSession.commit();
        sqlSession.close();
    }
    @Test
    public void DeleteAStudent() throws IOException {
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
        SqlSession sqlSession = sqlSessionFactory.openSession();

        sqlSession.delete("deleteStudent", "11");
        sqlSession.commit();
        sqlSession.close();
    }

    @Test
    public void UpdateStudent() throws IOException {
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
        SqlSession sqlSession = sqlSessionFactory.openSession();

        Student student = sqlSession.selectOne("selectStudent", "002");
        student.setAge(30);
        student.setXm("zhangzhang");

        sqlSession.update("updateStudent", student);
        sqlSession.commit();
        sqlSession.close();
    }
}
