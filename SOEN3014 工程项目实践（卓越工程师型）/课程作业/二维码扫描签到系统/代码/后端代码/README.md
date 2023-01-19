# 后端代码

1. 项目基于JDK 11编写，请不要使用JDK 1.8或JDK 17，部分功能将无法正常使用

2. 尽可能使用MySQL 5.x版本，如一定要使用MySQL 8.x版本，由于MySQL 8.x修改了密码认证策略，将遇到一些问题，请自行解决

3. 数据库配置在`flash-api/application/src/main/resources/application-dev.yml`中，连接地址、用户名及密码均包含在内，默认地址为本地MySQL的webflash数据库，默认用户名为webflash，默认密码为123456。下面将以默认配置为例说明如何启动项目，也可自行修改

4. 要启动项目，请遵循以下步骤：

   1. 在本地MySQL中创建webflash数据库

      ```sql
      CREATE DATABASE IF NOT EXISTS `webflash` DEFAULT charset utf8 COLLATE utf8_general_ci;
      ```

   2. 创建webflash用户，密码123456，并为其赋予访问webflash数据库的权限

   3. 运行`flash-api/src/main/java/cn.enilu.flash.api.ApiApplication.java`，后端将正常启动。默认运行在8082端口，可在`flash-api/application/src/main/resources/application.yml`中更改默认端口

   4. 访问`http://localhost:8082/swagger-ui/index.html`，查看Swagger，如可以正常访问说明后端运行正常

5. 然后遵照前端代码README.md中说明启动前端即可

