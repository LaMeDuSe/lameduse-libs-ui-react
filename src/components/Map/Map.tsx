import React from 'react';
import Image from 'next/image';

// 1. Définition des types pour les props
export interface StaticMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  width?: number;
  height?: number;
  alt?: string;
  mapType?: "roadmap" | "satellite" | "terrain" | "hybrid";
  apiKey: string;
}

const StaticMap = (props: StaticMapProps) => {
  // On crée une copie locale pour appliquer les valeurs par défaut
  props = { ...props };
  props.zoom = props.zoom || 14;
  props.width = props.width || 600;
  props.height = props.height || 400;
  props.alt = props.alt || "Carte de localisation";
  props.mapType = props.mapType || 'roadmap';

  const params = new URLSearchParams({
    center: `${props.lat},${props.lng}`,
    zoom: props.zoom.toString(),
    size: `${props.width}x${props.height}`,
    maptype: props.mapType,
    key: props.apiKey,
    markers: `color:red|${props.lat},${props.lng}`
  });

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;

  return (
    // Ici, on utilise props.width et props.height
    <div 
      className="relative overflow-hidden rounded-lg" 
      style={{ width: props.width, height: props.height }}
    >
      <Image 
        src={mapUrl}
        alt={props.alt} // Ajout de props. ici aussi
        width={props.width} // Et ici
        height={props.height} // Et là
        unoptimized 
        className="object-cover"
      />
    </div>
  );
};

export default StaticMap;