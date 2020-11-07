package com.jooones.rdc.service

import org.junit.jupiter.api.Test

internal class CalendarServiceTest {

    private var calendarService = CalendarService()

    @Test
    fun getSurroundingMonths() {
        print(calendarService.createCalendar().toString())
    }
}
