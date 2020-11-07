package com.jooones.rdc.model

import com.fasterxml.jackson.annotation.JsonFormat
import java.util.*

data class CustomDay(var top: String, var bottom: String, var prd: String) {

    @get:JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    var date: Date?=null
}
