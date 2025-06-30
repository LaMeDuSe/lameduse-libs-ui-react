
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


  const first_day = (new Date(year, Month, 1).getDay() + 6) % 7;
  const nbr_day_in_Month = new Date(year, Month + 1, 0).getDate();
  const nbr_day_in_Month_previous = new Date(year, Month, 0).getDate();

  const startYear=1900;
  const endYear=2099;

  const allYears = Array.from({ length: endYear-startYear +1 }, (_, i) => startYear + i);

  let week: (number | null)[] = [];
  let week_array: (number | null)[][] = [];


  /*Fills in the days of the previous month to the left of the first day of the current month*/
  for (let i = first_day - 1; i >= 0; i--) {
    week.push(nbr_day_in_Month_previous - i);
  }

  /*Adds the days of the current month into the weeks' array*/
  for (let i = 1; i <= nbr_day_in_Month; i++) {
    week.push(i);
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
  while (week_array.length < 6) {
    let line: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
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
    if (Month === 11) {
      setMonth(0);
      setyear(year + 1);
    }
    else {
      setMonth(Month + 1);
    }
  };

  const Monthprevious = () => {
    if (Month === 0) {
      setMonth(11);
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
          {allYears.map((a) => (
            <button
              key={a}
              onClick={() => {
                setyear(a);
                setMode("date_select");
              }}
            >
              {a}
            </button>
          ))}
        </div>
      )}


      {/*######### Only if date view is applied ######*/}
      {mode === "date_select" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={yearpreviouse}>{"<<"}</button>
            <button className="text-lameduse-white" onClick={() => setMode("year_select")}>{year}</button>
            <button onClick={yearnext}>{">>"}</button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={Monthprevious}>{"<"}</button>
            <h2 className="text-lameduse-white">{locale.month[Month - 1]}</h2>
            <button onClick={Monthnext}>{">"}</button>
          </div>

          {vueDate && selectedDate && (
            <p className="text-lameduse-white" onClick={back}>
              {selectedDate.day}/{selectedDate.Month + 1}/{selectedDate.year}
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
                {locale.day.map((j) => (
                  <th key={j}>{j}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {week_array.map((s, i) => (
                <tr key={i}>
                  {s.map((j, idx) => {
                    const isSelected =
                      j !== null &&
                      selectedDate &&
                      selectedDate.day === j &&
                      selectedDate.Month === Month &&
                      selectedDate.year === year;

                    const isOtherMonth = j !== null && (
                      (i === 0 && j > 20) ||
                      (i >= 4 && j < 15)
                    );

                    return (
                      <td
                        key={idx}
                        onClick={() => {
                          if (j === null) return;

                          const isPrevMonth = i === 0 && j > 20;
                          const isNextMonth = i >= 4 && j < 15;

                          if (isPrevMonth) {
                            const prevMonth = Month === 0 ? 11 : Month - 1;
                            const prevyear = Month === 0 ? year - 1 : year;
                            handleClick(j, prevMonth, prevyear);
                          } else if (isNextMonth) {
                            const nextMonth = Month === 11 ? 0 : Month + 1;
                            const nextyear = Month === 11 ? year + 1 : year;
                            handleClick(j, nextMonth, nextyear);
                          } else {
                            handleClick(j);
                          }
                        }}
                        className={
                          j === null
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
                        {j !== null ? j : ""}
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
