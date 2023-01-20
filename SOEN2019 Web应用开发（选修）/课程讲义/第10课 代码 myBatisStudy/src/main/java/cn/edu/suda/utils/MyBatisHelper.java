package cn.edu.suda.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;

public class MyBatisHelper {
    private MyBatisHelper() {}
    private static SqlSessionFactory sqlSessionFactory;

    static {
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        try {
            sqlSessionFactory = sqlSessionFactoryBuilder.build(Resources.getResourceAsStream("mybatisConfig.xml"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
    public static SqlSession openSession() throws IOException {
        return sqlSessionFactory.openSession();
    }
}
