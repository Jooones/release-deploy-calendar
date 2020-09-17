package com.jooones.rdc.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CalendarController {

    @GetMapping("/api/calendar")
    fun calendar(): ResponseEntity<Calendar> {
        return ResponseEntity(Calendar("jan 1, jan 2, jan 3.... yawn"), HttpStatus.OK)
    }
}
