package com.jooones.rdc.service

import com.fasterxml.jackson.databind.json.JsonMapper
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import com.jooones.rdc.model.CustomDay

open class CustomDaysReader {

    open fun read(): List<CustomDay> {
        val jsonString: String = this::class.java.classLoader.getResource("custom-days.json").readText(Charsets.UTF_8)
        val mapper = JsonMapper.builder().addModule(KotlinModule()).build()
        return mapper.readValue(jsonString)
    }
}
