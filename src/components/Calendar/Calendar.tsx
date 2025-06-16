import { SYSTEM_ENTRYPOINTS } from "next/dist/shared/lib/constants";
import React from "react";
import {useState} from "react";
import Button from "react";
import { useEffect} from "react";
import "./Calendar.css"

const jour=['Lu','Ma','Me','Je','Ve','Sa','Di'];
const jour_EN=['Mo','Tu','We','Th','Fr','Sa','Su']

const month=['Janvier ','Février ','Mars ','Avril ','Mai ','Juin ','Juillet ','Aout ','Septembre ','Octobre ','Novembre ','Décembre '];
const month_EN=['January','February','March','April', 'May','June','July', 'August','September','October','November','December'];

const allYears = Array.from({ length: 200 }, (_, i) => 1900 + i);

/*const an=[2015,2016,2017 ,2018 ,2019 ,2020 ,2021, 2022 ,2023, 2024, 2025];
*/
export interface CalendarProps {
  annee: number;
  mois: number;
  onClick?: (date:string)=>void;
  yesno?: "YES" | "NO";
  afficherDate?: boolean;
  forme?: "carré" | "rond";
  theme_couleur?: "dark" | "light";
  traduction?: "fr" | "en";
}

const Calendrier: React.FC<CalendarProps> = ({ onClick, yesno,afficherDate, forme, theme_couleur, traduction}) => {
  const [date,setDate]=useState<string | null>(null);
  const [mois,setMois]=useState(new Date().getMonth());
  const [annee,setAnnee]=useState(new Date().getFullYear());
  const [mode, setMode] = useState<"calendrier" | "annee" >("calendrier");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<{
  jour: number;
  mois: number;
  annee: number;
  } | null>(null);


  const j1 = (new Date(annee, mois, 1).getDay() + 6) % 7;
  const nbr_j_ds_mois=new Date(annee,mois+1,0).getDate();
  const nbr_j_ds_mois_precedent=new Date(annee,mois,0).getDate();

  let semaine: (number | null )[] = [];
  let semaines: (number | null )[][]=[];

  for(let i=j1-1; i>=0;i--){
    semaine.push(nbr_j_ds_mois_precedent-i);
  }

  for(let i=1;i<=nbr_j_ds_mois;i++){
    semaine.push(i);
    if(semaine.length===7){
      semaines.push(semaine);
      semaine=[];
    }
  }

  let j_suivant=1;
  while(semaine.length<7){
    semaine.push(j_suivant++);
  }
  semaines.push(semaine);

  while (semaines.length < 6) {
    let ligne: (number | null)[] = [];
    for (let i = 0; i < 7; i++) {
      ligne.push(j_suivant++);
    }
    semaines.push(ligne);
}


  const handleClick = (jour: number, moisCible: number = mois, anneeCible: number = annee) => {
    setMois(moisCible);
    setAnnee(anneeCible);
    setSelectedDate({ jour, mois: moisCible, annee: anneeCible });
  };

  const moisSuivant=()=>{
    if(mois===11){
      setMois(0);
      setAnnee(annee+1);
    }
    else{
      setMois(mois+1);
    }
  };

  const moisPrecedent=()=>{
    if(mois===0){
      setMois(11);
      setAnnee(annee-1);
    }
    else{
      setMois(mois-1);
    }
  };

  const anneeSuivante=()=>{
    setAnnee(annee+1);
  };

  const anneePrecedente=()=>{
    setAnnee(annee-1);
  };

  const moisCorrespondant=(c: number,traduction:"fr" | "en"): string | undefined=>{
    if(c>=1 && c<=12){
      return trad_month[traduction][c-1];
    }
    return undefined;
  };

  const trad = traduction ?? "fr";

  const back=()=>{
    if(selectedDate){
      setMois(selectedDate.mois);
      setAnnee(selectedDate.annee);
      setMode("calendrier");
    }
  };

  const trad_jour={
    fr:jour,
    en:jour_EN,
  }

  const trad_month={
    fr: month,
    en:month_EN,
  }

  const trad_back={
    fr:{back:"Retour",},en:{back:"Back",},
  };

  useEffect(() => {
  setSelectedDay(null);
  setDate(null);
  }, [mois, annee]);


  return (
    <div className={`global ${theme_couleur === "dark" ? "dark" : theme_couleur === "light" ? "light" : ""}`}>
  
      {mode === "annee" && (
        <div className="scroll_an">
          {allYears.map((a) => (
            <button
              key={a}
              onClick={() => {
                setAnnee(a);
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
            <button onClick={anneePrecedente}>{"<<"}</button>
            <button style={{color: "rgb(110, 172, 172)",fontWeight: "bold"}}  onClick={() => setMode(mode === "annee" ? "calendrier" : "annee")}>{annee}</button>
            <button onClick={anneeSuivante}>{">>"}</button>
          </div>
  
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={moisPrecedent}>{"<"}</button>
            <h2 style={{color: "rgb(110, 172, 172)"}}>{moisCorrespondant(mois+1,trad)}</h2>
            <button onClick={moisSuivant}>{">"}</button>
          </div>
  
          {afficherDate && selectedDate && (
            <p style={{ color: "rgb(110, 172, 172)", fontWeight: "bold" }} onClick={back}>
              {selectedDate.jour}/{selectedDate.mois + 1}/{selectedDate.annee}
            </p>
          )}

          {!afficherDate &&(
          <div>
            <button className="back" onClick={back}>{trad_back[trad].back}</button>
          </div>
          )}
  
          <table style={{ border: "1px solid", borderCollapse: "separate", borderSpacing:0, width: "100%", borderRadius: forme==="rond" ? "10px" :"0px", overflow: "hidden" }}>
            <thead>
              <tr>
                {trad_jour[trad].map((j) => (
                  <th key={j}>{j}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semaines.map((s, i) => (
                <tr key={i}>
                  {s.map((j, idx) => {
                  const isSelected =
                  j !== null &&
                  selectedDate &&
                  selectedDate.jour === j &&
                  selectedDate.mois === mois &&
                  selectedDate.annee === annee;

                  const isOtherMonth = j !== null && (
                  (i === 0 && j > 20) ||            // début du calendrier = jours du mois précédent
                  (i >= 4 && j < 15)                // fin du calendrier = jours du mois suivant
              );

              return (
                <td
                  key={idx}
                  onClick={() => {
                    if (j === null) return;

                    const isPrevMonth = i === 0 && j > 20;
                    const isNextMonth = i >= 4 && j < 15;

                    if (isPrevMonth) {
                      const prevMois = mois === 0 ? 11 : mois - 1;
                      const prevAnnee = mois === 0 ? annee - 1 : annee;
                      handleClick(j, prevMois, prevAnnee);
                    } else if (isNextMonth) {
                      const nextMois = mois === 11 ? 0 : mois + 1;
                      const nextAnnee = mois === 11 ? annee + 1 : annee;
                      handleClick(j, nextMois, nextAnnee);
                    } else {
                      handleClick(j);
                    }
                  }}
                  className={
                    j === null
                      ? ""
                      : isOtherMonth
                      ? forme === "rond"
                        ? "other-month-rond"
                        : "other-month-carré"
                      : isSelected
                      ? forme === "rond"
                        ? "j_calendar_selected_rond"
                        : "j_calendar_selected"
                      : forme === "rond"
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
