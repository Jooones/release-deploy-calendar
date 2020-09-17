function getCalendar(){
    return fetch('http://localhost:8080/api/calendar')
        .then(response => response.json())
        .then(data => console.log(data))
}