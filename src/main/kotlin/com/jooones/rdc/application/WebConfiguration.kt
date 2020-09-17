package com.jooones.rdc.application

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.web.servlet.function.RouterFunctions.resources

@Configuration
open class WebConfiguration {

    @Bean
    open fun resRouter() = resources("/**", ClassPathResource("static/"))

}
