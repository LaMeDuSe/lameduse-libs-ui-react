import { SYSTEM_ENTRYPOINTS } from "next/dist/shared/lib/constants";
import React from "react";
import {useState} from "react";
import Button from "react";

const jour=['Di','Lu','Ma','Me','Je','Ve','Sa'];

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
      setAnnee(annee-11);
    }
    else{
      setMois(mois-1);
    }
  };
  

  return (
    <div>
      <h2>
        Calendrier de {mois+1}/{annee}
      </h2>

      <div style={{textAlign: "left"}}>
        <button onClick={moisPrecedent}>prec</button>
      </div>
      <div style={{textAlign: "right"}}>
        <button onClick={moisSuivant}>suiv</button>
      </div>

      {date &&(
        <p style={{color:"blue"}}>{date}</p>
      )}

      <table>
        <thead>
          <tr>
            {jour.map((j)=>(
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
                  onClick={() => j!==null && handleClick(j)}
                  style={{ padding: "6px", textAlign: "center" }}>
                  {j!== null ? j : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Calendrier;
