package com.snowflyt.mybatisdemo;

import com.snowflyt.mybatisdemo.entity.Clazz;
import com.snowflyt.mybatisdemo.util.MyBatisHelper;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ClazzTest {

    @Test
    void selectClazz() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            Clazz clazz = session.selectOne("selectClazz", 1L);
            assertNotNull(clazz);
        }
    }

    @Test
    void selectAllClazzes() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            List<Clazz> clazzes = session.selectList("selectAllClazzes");
            assertTrue(clazzes.size() > 0);
        }
    }

    @Test
    void updateClazz() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            Clazz oldClazz = session.selectOne("selectClazz", 1L);
            assertNotNull(oldClazz);
            Clazz newClazz = new Clazz();
            newClazz.setId(1L);
            newClazz.setName("Class 2");
            session.update("updateClazz", newClazz);
            session.commit();
            assertEquals(newClazz, session.selectOne("selectClazz", 1L));
            session.update("updateClazz", oldClazz);
            session.commit();
            assertEquals(oldClazz, session.selectOne("selectClazz", 1L));
        }
    }

    @Test
    void insertClazz() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            Clazz clazz = new Clazz();
            clazz.setName("Class 3");
            session.insert("insertClazz", clazz);
            session.commit();
            List<Clazz> clazzes = session.selectList("selectAllClazzes");
            clazz.setId(clazzes.get(clazzes.size() - 1).getId());
            assertEquals(clazz, session.selectOne("selectClazz", clazz.getId()));
        }
    }

    @Test
    void deleteClazz() {
        try (SqlSession session = MyBatisHelper.openSession()) {
            assertNotNull(session.selectOne("selectClazz", 1L));
            Clazz clazz = session.selectOne("selectClazz", 1L);
            session.delete("deleteClazz", clazz.getId());
            session.commit();
            assertNull(session.selectOne("selectClazz", 1L));
            session.insert("insertClazz", clazz);
            session.commit();
            assertNotNull(session.selectOne("selectClazz", 1L));
        }
    }

}
