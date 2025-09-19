import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error: string | null;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

interface UseGeolocationProps extends GeolocationOptions {
  immediate?: boolean; // Whether to get location immediately on mount
}

const useGeolocation = (props: UseGeolocationProps = {}) => {
  const { immediate = false, ...options } = props;
  const [state, setState] = useState<GeolocationState>({
    loading: false, // Start with false, only load when requested
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const {
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      latitude,
      longitude,
      speed,
    } = position.coords;

    setState({
      loading: false,
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      latitude,
      longitude,
      speed,
      timestamp: position.timestamp,
      error: null,
    });
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = 'An unknown error occurred.';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorMessage = 'The request to get user location timed out.';
        break;
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      error: errorMessage,
    }));
  }, []);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by this browser.',
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const defaultOptions: PositionOptions = {
      enableHighAccuracy: false,
      maximumAge: 300000, // 5 minutes
      timeout: 10000, // 10 seconds
      ...options,
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      defaultOptions
    );
  }, [handleSuccess, handleError, options]);

  useEffect(() => {
    if (immediate) {
      getLocation();
    }
  }, [immediate, getLocation]);

  return { ...state, getLocation };
};

export default useGeolocation;
