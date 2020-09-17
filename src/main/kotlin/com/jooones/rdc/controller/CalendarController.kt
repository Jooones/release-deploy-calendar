package com.jooones.rdc.controller

import com.jooones.rdc.service.CalendarService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class CalendarController {

    @Autowired
    lateinit var calendarService: CalendarService

    @GetMapping("/api/calendar")
    fun calendar(): ResponseEntity<Calendar> {
        return ResponseEntity(calendarService.createCalendar(), HttpStatus.OK)
    }
}
