import React, { ReactNode } from 'react';
import { LoadScript } from '@react-google-maps/api';

interface LoadGoogleMapsScriptProps {
  children: ReactNode;
}

const LoadGoogleMapsScript: React.FC<LoadGoogleMapsScriptProps> = ({ children }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  return <LoadScript googleMapsApiKey={googleMapsApiKey}>{children}</LoadScript>;
};

export default LoadGoogleMapsScript;
