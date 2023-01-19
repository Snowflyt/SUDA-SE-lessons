package cn.enilu.flash.api;

import cn.enilu.flash.dao.BaseRepositoryFactoryBean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.oas.annotations.EnableOpenApi;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * ApiApplication
 *
 * @author enilu
 * @version 2018/9/11 0011
 */
@EnableCaching
@SpringBootApplication(
        // 集成activit后，默认引入了springSecurity，这里需要通过下面配置去掉SpringSecurity
        exclude = {
                SecurityAutoConfiguration.class,
                ManagementWebSecurityAutoConfiguration.class
        }
)
@ComponentScan(basePackages = "cn.enilu.flash")
@EntityScan(basePackages = "cn.enilu.flash.bean.entity")
@EnableJpaRepositories(basePackages = "cn.enilu.flash.dao", repositoryFactoryBeanClass = BaseRepositoryFactoryBean.class)
@EnableJpaAuditing
@EnableOpenApi
@Slf4j
public class ApiApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ApiApplication.class);
    }

    public static void main(String[] args) throws UnknownHostException {
        var context = SpringApplication.run(ApiApplication.class, args);
        var env = context.getEnvironment();
        var ip = InetAddress.getLocalHost().getHostAddress();
        var active = env.getProperty("spring.profiles.active");
        var port = env.getProperty("server.port");
        port = port == null ? "8080" : port;
        var path = env.getProperty("server.servlet.context-path");
        path = path == null ? "" : path;
        log.info("\n----------------------------------------------------------" +
                        "\n\tweb-flash is running!" +
                        "\n\t系统运行环境 : \t{}" +
                        "\n\t本地访问地址 : \thttp://localhost:{}{}/" +
                        "\n\t外部访问地址 : \thttp://{}:{}{}/" +
                        "\n\t在线文档地址 : \thttp://{}:{}{}/swagger-ui/index.html" +
                        "\n----------------------------------------------------------",
                active, port, path, ip, port, path, ip, port, path);
    }

}
