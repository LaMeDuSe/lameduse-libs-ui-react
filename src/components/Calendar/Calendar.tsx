import React from "react";
import {useState} from "react";
import { useEffect} from "react";
import "./Calendar.css"

const day=['Lu','Ma','Me','Je','Ve','Sa','Di'];
const day_EN=['Mo','Tu','We','Th','Fr','Sa','Su']

const month=['Janvier ','Février ','Mars ','Avril ','Mai ','Juin ','Juillet ','Aout ','Septembre ','Octobre ','Novembre ','Décembre '];
const month_EN=['January','February','March','April', 'May','June','July', 'August','September','October','November','December'];

const allYears = Array.from({ length: 200 }, (_, i) => 1900 + i);

export interface CalendarProps {
  year: number;
  Month: number;
  onClick?: (date:string)=>void;
  yesno?: "YES" | "NO";
  vueDate?: boolean;
  shape?: "carré" | "rond";
  color_style?: "dark" | "light";
  translation?: "fr" | "en";
}

const Calendrier: React.FC<CalendarProps> = ({ onClick, yesno,vueDate, shape, color_style, translation}) => {
  const [date,setDate]=useState<string | null>(null);
  const [Month,setMonth]=useState(new Date().getMonth());
  const [year,setyear]=useState(new Date().getFullYear());
  const [mode, setMode] = useState<"calendrier" | "year" >("calendrier");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<{
  day: number;
  Month: number;
  year: number;
  } | null>(null);


  const j1 = (new Date(year, Month, 1).getDay() + 6) % 7;
  const nbr_j_ds_Month=new Date(year,Month+1,0).getDate();
  const nbr_j_ds_Month_previous=new Date(year,Month,0).getDate();

  let week: (number | null )[] = [];
  let week_array: (number | null )[][]=[];

  for(let i=j1-1; i>=0;i--){
    week.push(nbr_j_ds_Month_previous-i);
  }

  for(let i=1;i<=nbr_j_ds_Month;i++){
    week.push(i);
    if(week.length===7){
      week_array.push(week);
      week=[];
    }
  }

  let j_next=1;
  while(week.length<7){
    week.push(j_next++);
  }
  week_array.push(week);

  while (week_array.length < 6) {
    let line: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
      line.push(j_next++);
    }
    week_array.push(line);
}


  const handleClick = (day: number, MonthTarget: number = Month, yearTarget: number = year) => {
    setMonth(MonthTarget);
    setyear(yearTarget);
    setSelectedDate({ day, Month: MonthTarget, year: yearTarget });
  };

  const Monthnext=()=>{
    if(Month===11){
      setMonth(0);
      setyear(year+1);
    }
    else{
      setMonth(Month+1);
    }
  };

  const Monthprevious=()=>{
    if(Month===0){
      setMonth(11);
      setyear(year-1);
    }
    else{
      setMonth(Month-1);
    }
  };

  const yearnext=()=>{
    setyear(year+1);
  };

  const yearpreviouse=()=>{
    setyear(year-1);
  };

  const MonthCorrespondant=(c: number,translation:"fr" | "en"): string | undefined=>{
    if(c>=1 && c<=12){
      return transl_month[translation][c-1];
    }
    return undefined;
  };

  const transl = translation ?? "fr";

  const back=()=>{
    if(selectedDate){
      setMonth(selectedDate.Month);
      setyear(selectedDate.year);
      setMode("calendrier");
    }
  };

  const transl_day={
    fr:day,
    en:day_EN,
  }

  const transl_month={
    fr: month,
    en:month_EN,
  }

  const transl_back={
    fr:{back:"Retour",},en:{back:"Back",},
  };

  useEffect(() => {
  setSelectedDay(null);
  setDate(null);
  }, [Month, year]);


  return (
    <div className={`global ${color_style === "dark" ? "dark" : color_style === "light" ? "light" : ""}`}>
  
      {mode === "year" && (
        <div className="scroll_an">
          {allYears.map((a) => (
            <button
              key={a}
              onClick={() => {
                setyear(a);
                setMode("calendrier");
              }}
            >
              {a}
            </button>
          ))}
        </div>
      )}

  
{/*######### seulement si mode calendrier est selectionné######*/}
      {mode === "calendrier" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={yearpreviouse}>{"<<"}</button>
            <button style={{color: "rgb(110, 172, 172)",fontWeight: "bold"}}  onClick={() => setMode(mode === "year" ? "calendrier" : "year")}>{year}</button>
            <button onClick={yearnext}>{">>"}</button>
          </div>
  
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={Monthprevious}>{"<"}</button>
            <h2 style={{color: "rgb(110, 172, 172)"}}>{MonthCorrespondant(Month+1,transl)}</h2>
            <button onClick={Monthnext}>{">"}</button>
          </div>
  
          {vueDate && selectedDate && (
            <p style={{ color: "rgb(110, 172, 172)", fontWeight: "bold" }} onClick={back}>
              {selectedDate.day}/{selectedDate.Month + 1}/{selectedDate.year}
            </p>
          )}

          {!vueDate &&(
          <div>
            <button className="back" onClick={back}>{transl_back[transl].back}</button>
          </div>
          )}
  
          <table style={{ border: "1px solid", borderCollapse: "separate", borderSpacing:0, width: "100%", borderRadius: shape==="rond" ? "10px" :"0px", overflow: "hidden" }}>
            <thead>
              <tr>
                {transl_day[transl].map((j) => (
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
                      ? shape === "rond"
                        ? "other-month-rond"
                        : "other-month-carré"
                      : isSelected
                      ? shape === "rond"
                        ? "j_calendar_selected_rond"
                        : "j_calendar_selected"
                      : shape === "rond"
                      ? "j_calendar td-rounded-hover"
                      : "j_calendar"
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


export default Calendrier;
