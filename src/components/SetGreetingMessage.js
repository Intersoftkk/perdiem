import React from "react";

export const setGreetingMessage = () => {
    let currentDateObject = new Date();
    let hours = currentDateObject.getHours();
    let minutes = currentDateObject.getMinutes();
    let greeting = '';
    if(hours >= 4 && (hours <= 11 && minutes <= 59)) { // 4 am (04:00) to 12 pm (11:59)
        greeting = "Good morning";
    } else if(hours >= 12 && (hours <= 15 && minutes <= 59)) { // 12 pm (12:00) to 4 pm (15:59)
        greeting = "Good afternoon";
    } else if((hours >= 16 && (hours <= 23 && minutes <= 59)) || ((hours >= 0) && (hours <= 3 && minutes <= 59))) { // 4 pm (16:00) to 4 am (03:59)
        greeting = "Good night";
    }
    return greeting;
}