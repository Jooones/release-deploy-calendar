package com.jooones.rdc.service

import com.jooones.rdc.model.Calendar
import com.jooones.rdc.model.CalendarOld
import com.jooones.rdc.model.Day
import com.jooones.rdc.model.Month
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
open class CalendarService() {

    fun createCalendar(): CalendarOld {
        return CalendarOld("jan 1, jan 2, jan 3.... yawn")
    }

    // 10.75 woensdag 10/04/2019 start, einde: 23/04/2019
    open fun getSurroundingMonths(): Calendar {
        val startOfSprint75 = LocalDate.of(2019, 4, 10)
        val now = LocalDate.now()
        val sixMonthsAgo = now.minusMonths(6)
        val sixMonthsFromNow = now.plusMonths(6)

        val firstDayOfFirstMonth = LocalDate.of(sixMonthsAgo.year, sixMonthsAgo.month, 1);

        var firstSprintStart = startOfSprint75
        var sprintsToAdd = 0
        while (firstSprintStart.isBefore(firstDayOfFirstMonth.minusDays(12))) {
            println(firstSprintStart)
            firstSprintStart = firstSprintStart.plusDays(14)
            sprintsToAdd = sprintsToAdd.inc()
        }
        println(firstSprintStart.toString() + "" + sprintsToAdd.toString())

        return Calendar(arrayOf(Month("1", "2019", arrayOf(Day("1", "1")))))
    }

}
