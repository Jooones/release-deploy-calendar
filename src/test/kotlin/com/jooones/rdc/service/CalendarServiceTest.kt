package com.jooones.rdc.service

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class CalendarServiceTest {

    private var calendarService = CalendarService()

    @Test
    fun getSurroundingMonths() {
        //Calendar(arrayOf(Day(1, 1, 2, "2019", "10.3", "10.2", "10.2", "10.1")));

//        assertThat(calendarService.getSurroundingMonths()).isNotNull
        print(calendarService.getSurroundingMonths().toString())
    }
}
