package com.jooones.rdc.service

import com.jooones.rdc.model.*
import com.jooones.rdc.model.Calendar
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.ZoneId
import java.util.*
import kotlin.collections.ArrayList

@Service
open class CalendarService() {

    fun createCalendar(): Calendar {
        return getSurroundingMonths(LocalDate.now())
    }

    // Sprint 10.75
    // started on wednesday 10/04/2019
    // ended on tuesday 23/04/2019
    open fun getSurroundingMonths(requestDate: LocalDate): Calendar {
        val startOfSprint75 = LocalDate.of(2019, 4, 10)
        val tenMonthsAgo = requestDate.minusMonths(10)
        val tenMonthsFromNow = requestDate.plusMonths(10)
        val firstDayOfFirstRequestedMonth = LocalDate.of(tenMonthsAgo.year, tenMonthsAgo.month, 1)
        val lastDayOfLastRequestedMonth = LocalDate.of(tenMonthsFromNow.year, tenMonthsFromNow.month, tenMonthsFromNow.lengthOfMonth())

        val days = getDaysOfAllSprintsOfRequestedMonths(startOfSprint75, firstDayOfFirstRequestedMonth, lastDayOfLastRequestedMonth)
        overwriteCustomDays(days)
        return Calendar(days.toTypedArray())
    }

    private fun overwriteCustomDays(days: ArrayList<Day>) {
        CustomDaysReader().read().forEach { customDay ->
            val matchedDay = getMatchingDay(days, customDay)
            matchedDay.top = customDay.top
            matchedDay.bottom = customDay.bottom
            if (customDay.prd.isNotEmpty()) {
                matchedDay.prdVersion = customDay.prd
            }
        }
    }

    private fun getMatchingDay(days: ArrayList<Day>, customDay: CustomDay) =
        days.first { day -> day.getLocalDate().equals(toLocalDate(customDay.date!!)) }

    private fun toLocalDate(date: Date) = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()

    private fun getDaysOfAllSprintsOfRequestedMonths(startOfSprint75: LocalDate, firstDayOfFirstRequestedMonth: LocalDate, lastDayOfLastRequestedMonth: LocalDate): ArrayList<Day> {
        val days = ArrayList<Day>()
        val sprintStartBeforeRequestedMonths = getSprintStartBeforeRequestedMonths(startOfSprint75, firstDayOfFirstRequestedMonth)
        var sprint = sprintStartBeforeRequestedMonths
        while (sprint.date.isBefore(lastDayOfLastRequestedMonth) || sprint.date.isEqual(lastDayOfLastRequestedMonth)) {
            days.addAll(getDaysOfSprint(sprint))
            sprint = SprintStart(sprint.number.plus(1), sprint.date.plusDays(14))
        }
        removeDaysOutsideOfRequestedPeriod(days, firstDayOfFirstRequestedMonth, lastDayOfLastRequestedMonth)
        return days
    }

    private fun removeDaysOutsideOfRequestedPeriod(days: ArrayList<Day>, firstDayOfFirstRequestedMonth: LocalDate, lastDayOfLastRequestedMonth: LocalDate) {
        days.removeIf { day -> day.getLocalDate().isBefore(firstDayOfFirstRequestedMonth) || day.getLocalDate().isAfter(lastDayOfLastRequestedMonth) }
    }

    private fun getDaysOfSprint(sprintStartBeforeRequestedMonths: SprintStart): Array<Day> {
        val firstDayOfSprint = sprintStartBeforeRequestedMonths.date
        val sprintNumber = sprintStartBeforeRequestedMonths.number
        val day1 = Day(
            firstDayOfSprint.dayOfWeek.ordinal + 1,
            firstDayOfSprint.dayOfMonth,
            firstDayOfSprint.monthValue,
            firstDayOfSprint.year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 3}",
            DayType.NEW_SPRINT
        )
        val day2 = Day(
            firstDayOfSprint.plusDays(1).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(1).dayOfMonth,
            firstDayOfSprint.plusDays(1).monthValue,
            firstDayOfSprint.plusDays(1).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 3}",
            DayType.PRD_INSTALL
        )
        val day3 = Day(
            firstDayOfSprint.plusDays(2).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(2).dayOfMonth,
            firstDayOfSprint.plusDays(2).monthValue,
            firstDayOfSprint.plusDays(2).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}"
        )
        val day4 = Day(
            firstDayOfSprint.plusDays(3).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(3).dayOfMonth,
            firstDayOfSprint.plusDays(3).monthValue,
            firstDayOfSprint.plusDays(3).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}"
        )
        val day5 = Day(
            firstDayOfSprint.plusDays(4).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(4).dayOfMonth,
            firstDayOfSprint.plusDays(4).monthValue,
            firstDayOfSprint.plusDays(4).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}"
        )
        val day6 = Day(
            firstDayOfSprint.plusDays(5).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(5).dayOfMonth,
            firstDayOfSprint.plusDays(5).monthValue,
            firstDayOfSprint.plusDays(5).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}",
            DayType.INT_INSTALL
        )
        val day7 = Day(
            firstDayOfSprint.plusDays(6).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(6).dayOfMonth,
            firstDayOfSprint.plusDays(6).monthValue,
            firstDayOfSprint.plusDays(6).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}"
        )
        val day8 = Day(
            firstDayOfSprint.plusDays(7).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(7).dayOfMonth,
            firstDayOfSprint.plusDays(7).monthValue,
            firstDayOfSprint.plusDays(7).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}"
        )
        val day9 = Day(
            firstDayOfSprint.plusDays(8).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(8).dayOfMonth,
            firstDayOfSprint.plusDays(8).monthValue,
            firstDayOfSprint.plusDays(8).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            "10.${sprintNumber - 2}",
            DayType.PRD_HOTFIX_INSTALL
        )
        val day10 = Day(
            firstDayOfSprint.plusDays(9).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(9).dayOfMonth,
            firstDayOfSprint.plusDays(9).monthValue,
            firstDayOfSprint.plusDays(9).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}",
            DayType.STG_INSTALL
        )
        val day11 = Day(
            firstDayOfSprint.plusDays(10).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(10).dayOfMonth,
            firstDayOfSprint.plusDays(10).monthValue,
            firstDayOfSprint.plusDays(10).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}"
        )
        val day12 = Day(
            firstDayOfSprint.plusDays(11).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(11).dayOfMonth,
            firstDayOfSprint.plusDays(11).monthValue,
            firstDayOfSprint.plusDays(11).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}"
        )
        val day13 = Day(
            firstDayOfSprint.plusDays(12).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(12).dayOfMonth,
            firstDayOfSprint.plusDays(12).monthValue,
            firstDayOfSprint.plusDays(12).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}"
        )
        val day14 = Day(
            firstDayOfSprint.plusDays(13).dayOfWeek.ordinal + 1,
            firstDayOfSprint.plusDays(13).dayOfMonth,
            firstDayOfSprint.plusDays(13).monthValue,
            firstDayOfSprint.plusDays(13).year.toString(),
            "10.$sprintNumber",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 1}",
            "10.${sprintNumber - 2}"
        )
        return arrayOf(day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14)
    }

    private fun getSprintStartBeforeRequestedMonths(startOfSprint75: LocalDate, firstDayOfFirstRequestedMonth: LocalDate): SprintStart {
        var firstDayOfSprintBeforeRequestedMonths = startOfSprint75
        var sprintsToAdd = 0
        while (firstDayOfSprintBeforeRequestedMonths.isBefore(firstDayOfFirstRequestedMonth.minusDays(12))) {
            firstDayOfSprintBeforeRequestedMonths = firstDayOfSprintBeforeRequestedMonths.plusDays(14)
            sprintsToAdd = sprintsToAdd.inc()
        }
        val sprintNumber = 75 + sprintsToAdd
        return SprintStart(sprintNumber, firstDayOfSprintBeforeRequestedMonths)
    }

}
