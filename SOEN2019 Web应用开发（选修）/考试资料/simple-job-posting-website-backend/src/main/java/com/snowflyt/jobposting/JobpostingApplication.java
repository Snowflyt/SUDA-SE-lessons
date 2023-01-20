package com.snowflyt.jobposting;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class JobpostingApplication {

    public static void main(String[] args) {
        var context = SpringApplication.run(JobpostingApplication.class, args);
        var env = context.getEnvironment();
        var port = env.getProperty("server.port") == null ? "8080" : env.getProperty("server.port");
        port = port == null ? "8080" : port;
        var path = env.getProperty("server.servlet.context-path");
        path = path == null ? "" : path;
        var swaggerPath = env.getProperty("springdoc.swagger-ui.path");
        swaggerPath = swaggerPath == null ? "/swagger-ui" : swaggerPath;
        log.info("\n----------------------------------------------------------" +
                        "\n\tJob posting website backend successfully started" +
                        "\n\tAccess url:  http://localhost:{}{}/" +
                        "\n\tApi docs:    http://localhost:{}{}{}" +
                        "\n----------------------------------------------------------",
                port, path, port, path, swaggerPath);
    }

}
