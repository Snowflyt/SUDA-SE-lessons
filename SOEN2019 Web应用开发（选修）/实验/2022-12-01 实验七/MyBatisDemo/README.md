# README

1. 相关代码包含在com.snowflyt.mybatisdemo包中
2. 生成全部示例数据的SQL语句为resources/data.sql。运行应用前请在数据库中创建数据库mybatis_demo，然后在数据库中运行data.sql中的SQL语句
3. 项目使用MySQL 8.x，如果使用其他版本的MySQL，需要修改pom.xml中的MySQL驱动版本，并修改resources/db.properties中的driver字段为"com.mysql.jdbc.Driver"
4. 项目默认使用本地MySQL数据库，账号为root，密码为空，如果需要修改，请修改resources/db.properties中的相关字段
5. 测试代码包含在test/com/snowflyt/mybatisdemo中，全部使用JUnit Assertions编写
6. 项目在Java 1.8环境下测试通过