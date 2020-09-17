package test

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.web.reactive.function.server.RouterFunctions.resources

@Configuration
open class WebConfiguration {

    @Bean
    open fun resRouter() = resources("/**", ClassPathResource("static/"))

}
