package com.jooones.rdc.application

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan("com.jooones.rdc")
open class RdcApplication {

    companion object Rdc {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<RdcApplication>(*args)
        }
    }

}