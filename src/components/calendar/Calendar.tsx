import { SYSTEM_ENTRYPOINTS } from "next/dist/shared/lib/constants";
import React from "react";
import {useState} from "react";
import Button from "react";
import "./Calendar.css"

const jour=['Lu','Ma','Me','Je','Ve','Sa','Di'];

const month=['Janvier ','Février ','Mars ','Avril ','Mai ','Juin ','Juillet ','Aout ','Septembre ','Octobre ','Novembre ','Décembre '];

const allYears = Array.from({ length: 200 }, (_, i) => 1900 + i);

const an=[2015,2016,2017 ,2018 ,2019 ,2020 ,2021, 2022 ,2023, 2024, 2025];

export interface CalendarProps {
  annee: number;
  mois: number;
  onClick?: (date:string)=>void;
  yesno?: "YES" | "NO";
}

const Calendrier: React.FC<CalendarProps> = ({ onClick, yesno }) => {
  const [date,setDate]=useState<string | null>(null);
  const [mois,setMois]=useState(new Date().getMonth());
  const [annee,setAnnee]=useState(new Date().getFullYear());
  const [mode, setMode] = useState<"calendrier" | "annee">("calendrier");

  const j1=new Date(annee,mois,1).getDay();
  const nbr_j_ds_mois=new Date(annee,mois+1,0).getDate();

  let semaine: (number | null)[] = Array(j1).fill(null);//on fait un tableau de null
  let semaines: (number | null)[][]=[];

  for(let i=1; i<=nbr_j_ds_mois;i++){
    semaine.push(i);
    if(semaine.length===7){
      semaines.push(semaine);
      semaine=[];
    }
  }

  if(semaine.length>0){
    while(semaine.length<7){
      semaine.push(null);
    }
    semaines.push(semaine);
  }

  const handleClick=(jour:number)=>{
    const date=`${jour}/${mois+1}/${annee}`;
    setDate(date);
  }

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

  

  return (
    <div>
      <h2>{mois + 1}/{annee}</h2>
  
{/*###########Bouton pour basculer entre le mode calendrier et années #############*/}
      <div style={{ margin: "10px 0" }}>
          <button onClick={() => setMode(mode === "annee" ? "calendrier" : "annee")}>#</button>
      </div>
  
{/*######### seulement si mode année est selectionné######*/}
      {mode === "annee" && (
        <div style={{ marginTop: "8px", maxHeight: "200px", overflowY: "scroll" }}>
          {allYears.map((a) => (
            <button
              key={a}
              onClick={() => {
                setAnnee(a);
                setMode("calendrier");
              }}
              style={{
                padding: "4px 8px",
                margin: "2px",
                cursor: "pointer"
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
            <button onClick={anneeSuivante}>{">>"}</button>
          </div>
  
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <button onClick={moisPrecedent}>{"<"}</button>
            <button onClick={moisSuivant}>{">"}</button>
          </div>
  
          {date && <p style={{ color: "blue" }}>{date}</p>}
  
          <table style={{ border: "1px solid", borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                {jour.map((j) => (
                  <th key={j}>{j}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semaines.map((s, i) => (
                <tr key={i}>
                  {s.map((j, idx) => (
                    <td
                      key={idx}
                      onClick={() => j !== null && handleClick(j)}
                      className={j !== null ? "j_calendar" : ""}
                    >
                      {j !== null ? j : ""}
                    </td>
                  ))}
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
