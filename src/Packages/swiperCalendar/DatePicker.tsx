/* eslint-disable react-hooks/exhaustive-deps */
import { addDays } from "date-fns";
import React from "react";
import hexToRgb from "./hexToRgb";
import { DateView } from "./DateView";
import { MonthView } from './MonthView';
import styles from "./DatePicker.module.css";

interface DatepickerProps {
    endDate: number,
    selectDate: any;
    labelFormat: any;
    color: string,
    startDate?: Date,
    type?: 'month' | 'day',
    getSelectedDay?: any;
    marked?: any;
}

function DatePicker(props: DatepickerProps) {

    const {selectDate, color, startDate= new Date(), endDate = 100, type = 'day',marked,labelFormat,getSelectedDay } = props
    
    const next = (event) => {
        event.preventDefault();
        const e: any = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : 0;
        e.scrollLeft += width - 60;
    };

    const prev = (event) => {
        event.preventDefault();
        const e: any = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : 0;
        e.scrollLeft -= width - 60;
    };

    const primaryColor = color ? (color.indexOf("rgb") > 0 ? color : hexToRgb(color)) : 'rgb(54, 105, 238)';

    // const startDate = startDate || new Date();
    const lastDate = addDays(startDate, endDate);

    let buttonzIndex = { zIndex: 2 };
    let buttonStyle: any = { background: primaryColor };
    let Component = DateView;

    if (type === "month") {
        buttonzIndex = { zIndex: 5 };
        Component = MonthView;
        buttonStyle = { background: primaryColor, marginBottom: "5px" };
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttonWrapper} style={buttonzIndex}>
                <button className={styles.button} style={buttonStyle} onClick={prev}>&lt;</button>
            </div>
            <Component  primaryColor={primaryColor} startDate={startDate} lastDate={lastDate} selectDate={selectDate} getSelectedDay={getSelectedDay} labelFormat={labelFormat} marked={marked} />
            <div className={styles.buttonWrapper} style={buttonzIndex}>
                <button className={styles.button} style={buttonStyle} onClick={next}>&gt;</button>
            </div>
        </div>
    )
}

export default DatePicker 