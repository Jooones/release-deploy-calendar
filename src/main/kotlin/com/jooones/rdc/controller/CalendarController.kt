package com.jooones.rdc.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CalendarController {

    @GetMapping("/api/calendar")
    fun calendar(): String {
        return "{\"value\":\"jan 1, jan 2, jan 3.... yawn\"}"
    }
}
