package cn.edu.suda;

import cn.edu.suda.domain.Student;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {


            SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
            SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
            SqlSession sqlSession = sqlSessionFactory.openSession();

            Student student = sqlSession.selectOne("selectStudent", "002");
            System.out.println(student);

            sqlSession.commit();
            sqlSession.close();


    }
}