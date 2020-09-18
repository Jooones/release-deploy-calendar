package com.jooones.rdc.service

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class CalendarServiceTest {

    private var calendarService = CalendarService()

    @Test
    fun getSurroundingMonths() {
        assertThat(calendarService.getSurroundingMonths()).isNotNull
    }
}
