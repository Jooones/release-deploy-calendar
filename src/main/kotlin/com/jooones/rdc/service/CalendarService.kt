package com.jooones.rdc.service

import com.jooones.rdc.controller.Calendar
import org.springframework.stereotype.Service

@Service
open class CalendarService() {

    fun createCalendar(): Calendar {
        return Calendar("jan 1, jan 2, jan 3.... yawn")
    }

}
