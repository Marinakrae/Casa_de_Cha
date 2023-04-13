package casa_de_cha;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(CorsConfig.class)
public class CasaDeChaApplication {

    public static void main(String[] args) {

        SpringApplication.run(CasaDeChaApplication.class, args);
    }

}
