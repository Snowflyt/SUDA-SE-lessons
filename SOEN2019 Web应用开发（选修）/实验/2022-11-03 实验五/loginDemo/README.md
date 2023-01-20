# README

1. 相关代码包含在io.snowflyt.logindemo包中
2. 生成全部示例数据的SQL语句为resources/data.sql。运行应用前请在数据库中创建数据库login_demo，然后在数据库中运行data.sql中的SQL语句
3. 项目使用MySQL 8.x，如果使用其他版本的MySQL，需要修改pom.xml中的MySQL驱动版本，并修改util包下JdbcUtil类中的JdbcDriver字段为"com.mysql.jdbc.Driver"
4. 项目默认使用本地MySQL数据库，账号为root，密码为空，如果需要修改，请修改util包下JdbcUtil类中的JdbcUrl字段
5. 默认登录的账号和密码均为admin
6. 项目在Tomcat 8.5.83和Java 1.8环境下测试通过