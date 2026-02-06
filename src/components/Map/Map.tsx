import React from 'react';

/**
 * Props for the Map component.
 */
export interface MapProps {
  /**
   * The name of the place 
   */
  q?: string
  /**
   * The latitude for the center of the map.
   */
  lat?: number;
  /**
   * The longitude for the center of the map.
   */
  lng?: number;
  /**
   * The zoom level of the map.
   */
  zoom?: number;
  /**
   * The width of the map in pixels.
   */
  width?: string | number;
  /**
   * The height of the map in pixels.
   */
  height?: string | number;
  /**
   * Your Google Maps API key.
   */
  apiKey: string;
  /**
   * Additional CSS class names to apply to the container.
   */
  className?: string;
}

/**
 * A component to display an embedded Google Map.
 */
const Map = ({
  q,
  lat,
  lng,
  zoom = 14,
  width = '100%',
  height = 450,
  apiKey,
  className = '',
}: MapProps) => {
  if (!apiKey) {
    return <div style={{ width, height, backgroundColor: '#e0e0e0' }}>API Key is missing.</div>;
  }
  if (!(lat && lng)&& !q){
    return <div style={{ width, height, backgroundColor: '#e0e0e0' }}>Location is missing.</div>;
  }

  const locationQuery = q || `${lat},${lng}`;
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${locationQuery}&zoom=${zoom}`;

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ width, height }}
    >
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
};

export default Map;
