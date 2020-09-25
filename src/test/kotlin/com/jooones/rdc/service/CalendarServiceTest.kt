package com.jooones.rdc.service

import org.junit.jupiter.api.Test
import java.time.LocalDate

internal class CalendarServiceTest {

    private var calendarService = CalendarService()

    @Test
    fun getSurroundingMonths() {
        //Calendar(arrayOf(Day(1, 1, 2, "2019", "10.3", "10.2", "10.2", "10.1")));

//        assertThat(calendarService.getSurroundingMonths()).isNotNull
        print(calendarService.getSurroundingMonths(LocalDate.now()).toString())
    }
}
