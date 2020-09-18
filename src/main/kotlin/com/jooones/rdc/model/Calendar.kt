package com.jooones.rdc.model

class Calendar(var months: Array<Day>) {
    override fun toString(): String {
        return "Calendar(months=${months.contentToString()})"
    }
}
