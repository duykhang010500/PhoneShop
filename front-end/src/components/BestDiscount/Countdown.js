import React, { useState, useEffect, useRef } from 'react'

const Countdown = () => {

    //Khởi tạo giá trị ngày, giờ, phút, giây
    const [timerDay, setTimerDay] = useState(0)
    const [timerHours, setTimerHours] = useState(0)
    const [timerMinutes, setTimerMinutes] = useState(0)
    const [timerSeconds, setTimerSeconds] = useState(0)

    let interval = useRef()
    const startTimer = () => {
        const countDownDate = new Date('Jan 31, 2022 00:00:00').getTime()
        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            if (distance < 0) {
                clearInterval(interval.current)
            } else {
                setTimerDay(days)
                setTimerHours(hours)
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
        }, 1000)
    }

    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(interval)
        }
    }, [])

    const formatValue = (value) => {
        if (value < 10)
            return `0` + value.toString()
        else {
            return value.toString()
        }
    }

    return (
        <div className="best__discount-countdown">
            <div className="timer">
                {formatValue(timerDay)}
            </div>
            :
            <div className="timer">
                {formatValue(timerHours)}
            </div>
            :
            <div className="timer">
                {formatValue(timerMinutes)}
            </div>
            :
            <div className="timer">
                {formatValue(timerSeconds)}
            </div>
        </div>
    )
}

export default Countdown
