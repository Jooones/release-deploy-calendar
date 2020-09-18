package com.jooones.rdc.model

class Calendar(var days: Array<Day>) {
    override fun toString(): String {
        return "Calendar(months=${days.contentToString()})"
    }
}
