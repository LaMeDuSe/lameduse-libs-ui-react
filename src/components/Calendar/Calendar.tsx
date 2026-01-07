
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./Calendar.css"


const day_FR : Tuple<string, 7> = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const day_EN : Tuple<string, 7> = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const month_FR : Tuple<string, 12> = ['Janvier ', 'Février ', 'Mars ', 'Avril ', 'Mai ', 'Juin ', 'Juillet ', 'Aout ', 'Septembre ', 'Octobre ', 'Novembre ', 'Décembre '];
const month_EN : Tuple<string, 12> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Translation = {
  day: Tuple<string, 7>;
  month: Tuple<string, 12>;
  back: string;
}

const defaultTranslation : {[key: string]: Translation}= {
  fr: {
    day: day_FR,
    month: month_FR,
    back: "Retour",
  },
  en: {
    day: day_EN,
    month: month_EN,
    back: "Back",
  },
}



export interface CalendarProps {
  year: number;
  Month: number;
  onClick?: (date: string) => void;
  vueDate?: boolean;
  shape?: "square" | "circle";
  color_style?: "component_Calendar_dark" | "component_Calendar_light" | "component_Calendar_other_dark" | "component_Calendar_other_light";
  translation?: "fr" | "en" | Translation;
}

const Calendar: React.FC<CalendarProps> = ({ onClick, vueDate, shape, color_style, translation }) => {
  const [, setDate] = useState<string | null>(null);
  const [Month, setMonth] = useState(new Date().getMonth());
  const [year, setyear] = useState(new Date().getFullYear());
  const [mode, setMode] = useState<"date_select" | "year_select">("date_select");
  const [, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    Month: number;
    year: number;
  } | null>(null);


  const first_day = (new Date(year, Month - 1, 1).getDay() + 6) % 7;
  const nbr_day_in_Month = new Date(year, Month, 0).getDate();
  const nbr_day_in_Month_previous = new Date(year, Month - 1, 0).getDate();

  const startYear=1900;
  const endYear=2099;

  const allYears = Array.from({ length: endYear-startYear +1 }, (_, i) => startYear + i);

  let week: (number | null)[] = [];
  let week_array: (number | null)[][] = [];


  /*Fills in the days of the previous month to the left of the first day of the current month*/
  for (let other_month_day = first_day - 1; other_month_day >= 0; other_month_day--) {
    week.push(nbr_day_in_Month_previous - other_month_day);
  }

  /*Adds the days of the current month into the weeks' array*/
  for (let index_day = 1; index_day <= nbr_day_in_Month; index_day++) {
    week.push(index_day);
    if (week.length === 7) {
      week_array.push(week);
      week = [];
    }
  }

  /*Implementation of a week*/
  let next_day = 1;
  while (week.length < 7) {
    week.push(next_day++);
  }
  week_array.push(week);

  /*Implementation of all weeks in the month*/
  while (week_array.length < 5) {
    let line: (number | null)[] = [];
    for (let nbr_day_in_week = 0; nbr_day_in_week < 7; nbr_day_in_week++) {
      line.push(next_day++);
    }
    week_array.push(line);
  }


  const handleClick = (day: number, MonthTarget: number = Month, yearTarget: number = year) => {
    setMonth(MonthTarget);
    setyear(yearTarget);
    setSelectedDate({ day, Month: MonthTarget, year: yearTarget });
  };

  const Monthnext = () => {
    if (Month === 12) {
      setMonth(1);
      setyear(year + 1);
    }
    else {
      setMonth(Month + 1);
    }
  };

  const Monthprevious = () => {
    if (Month === 1) {
      setMonth(12);
      setyear(year - 1);
    }
    else {
      setMonth(Month - 1);
    }
  };

  const yearnext = () => {
    setyear(year + 1);
  };

  const yearpreviouse = () => {
    setyear(year - 1);
  };

  const back = () => {
    if (selectedDate) {
      setMonth(selectedDate.Month);
      setyear(selectedDate.year);
      setMode("date_select");
    }
  };

  const locale = typeof translation === "object" ? translation : defaultTranslation[translation || "en"];

  useEffect(() => {
    setSelectedDay(null);
    setDate(null);
  }, [Month, year]);


  return (
    <div className={`component_Calendar_global ${color_style}`}>

      {mode === "year_select" && (
        <div className="component_Calendar_scroll_year">
          {allYears.map((year) => (
            <button
              key={year}
              onClick={() => {
                setyear(year);
                setMode("date_select");
              }}
            >
              {year}
            </button>
          ))}
        </div>
      )}


      {/*######### Only if date view is applied ######*/}
      {mode === "date_select" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={yearpreviouse}>{"<<"}</button>
            <button onClick={() => setMode("year_select")}>{year}</button>
            <button onClick={yearnext}>{">>"}</button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={Monthprevious}>{"<"}</button>
            <h2>{locale.month[Month - 1]}</h2>
            <button onClick={Monthnext}>{">"}</button>
          </div>

          {vueDate && selectedDate && (
            <p onClick={back}>
              {selectedDate.day}/{selectedDate.Month}/{selectedDate.year}
            </p>
          )}

          {!vueDate && (
            <div>
              <button className="component_Calendar_back" onClick={back}>{locale.back}</button>
            </div>
          )}

          <table style={{ border: "1px solid", borderCollapse: "separate", borderSpacing: 0, width: "100%", borderRadius: shape === "circle" ? "10px" : "0px", overflow: "hidden" }}>
            <thead>
              <tr>
                {locale.day.map((DAY) => (
                  <th key={DAY}>{DAY}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {week_array.map((WEEK, line) => (
                <tr key={line}>
                  {WEEK.map((date_number_day, idx) => {
                    const isSelected =
                      date_number_day !== null &&
                      selectedDate &&
                      selectedDate.day === date_number_day &&
                      selectedDate.Month === Month &&
                      selectedDate.year === year;

                    const isOtherMonth = date_number_day !== null && (
                      (line === 0 && date_number_day > 20) ||
                      (line >= 4 && date_number_day < 15)
                    );

                    return (
                      <td
                        key={idx}
                        onClick={() => {
                          if (date_number_day === null) return;

                          const isPrevMonth = line === 0 && date_number_day > 20;
                          const isNextMonth = line >= 4 && date_number_day < 15;

                          if (isPrevMonth) {
                            const prevMonth = Month === 1 ? 12 : Month - 1;
                            const prevyear = Month === 1 ? year - 1 : year;
                            handleClick(date_number_day, prevMonth, prevyear);
                          } else if (isNextMonth) {
                            const nextMonth = Month === 12 ? 1 : Month + 1;
                            const nextyear = Month === 12 ? year + 1 : year;
                            handleClick(date_number_day, nextMonth, nextyear);
                          } else {
                            handleClick(date_number_day);
                          }
                        }}
                        className={
                          date_number_day === null
                            ? ""
                            : isOtherMonth
                              ? shape === "circle"
                                ? "component_Calendar_other_month_circle"
                                : "component_Calendar_other_month_square"
                              : isSelected
                                ? shape === "circle"
                                  ? "component_Calendar_d_calendar_selected_circle"
                                  : "component_Calendar_d_calendar_selected"
                                : shape === "circle"
                                  ? "component_Calendar_d_calendar component_Calendar_td_rounded_hover"
                                  : "component_Calendar_d_calendar"
                        }
                      >
                        {date_number_day !== null ? date_number_day : ""}
                      </td>

                    );
                  })}
                </tr>
              ))}

            </tbody>
          </table>
        </>
      )}
    </div>
  );

};


export default Calendar;
