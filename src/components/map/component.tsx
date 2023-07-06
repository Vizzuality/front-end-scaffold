import { useEffect, useState, useCallback, FC } from 'react';

import ReactMapGL, { ViewState, ViewStateChangeEvent, useMap } from 'react-map-gl';

import cx from 'clsx';

import MapLibreGL from 'maplibre-gl';

// * If you plan to use Mapbox (and not a fork):
// * 1) Remove maplibre-gl
// * 2) Remove maplibre-gl.css import
// * 3) Install Mapbox v1/v2 (v2 requires token)
// * 4) If you have installed v2: provide the token to the map through the `mapboxAccessToken` property
// * 5) Remove the `mapLib` property on the map component
// * 6) Replace the mapStyles on the map

import { DEFAULT_VIEW_STATE } from './constants';
import type { CustomMapProps } from './types';

export const CustomMap: FC<CustomMapProps> = ({
  // * if no id is passed, react-map-gl will store the map reference in a 'default' key:
  // * https://github.com/visgl/react-map-gl/blob/ecb27c8d02db7dd09d8104e8c2011bda6aed4b6f/src/components/use-map.tsx#L18
  id = 'default',
  // mapboxAccessToken,
  children,
  className,
  viewState = {},
  initialViewState,
  bounds,
  onMapViewStateChange,
  dragPan,
  dragRotate,
  scrollZoom,
  doubleClickZoom,
  mapStyle,
  ...mapboxProps
}: CustomMapProps) => {
  /**
   * REFS
   */
  const { [id]: mapRef } = useMap();

  /**
   * STATE
   */
  const [localViewState, setLocalViewState] = useState<Partial<ViewState>>(
    !initialViewState && {
      ...DEFAULT_VIEW_STATE,
      ...viewState,
    }
  );
  const [isFlying, setFlying] = useState(false);

  /**
   * CALLBACKS
   */

  const handleFitBounds = useCallback(() => {
    const { bbox, options } = bounds;

    // enabling fly mode avoids the map to be interrupted during the bounds transition
    setFlying(true);

    mapRef.fitBounds(
      [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      options
    );
  }, [bounds, mapRef]);

  const handleMapMove = useCallback(
    ({ viewState: _viewState }: ViewStateChangeEvent) => {
      setLocalViewState(_viewState);
      onMapViewStateChange(_viewState);
    },
    [onMapViewStateChange]
  );

  useEffect(() => {
    if (mapRef && bounds) {
      handleFitBounds();
    }
  }, [mapRef, bounds, handleFitBounds]);

  useEffect(() => {
    setLocalViewState((prevViewState) => ({
      ...prevViewState,
      ...viewState,
    }));
  }, [viewState]);

  useEffect(() => {
    if (!bounds) return undefined;

    const { options } = bounds;
    const animationDuration = options?.duration || 0;
    let timeoutId: number = null;

    if (isFlying) {
      timeoutId = window.setTimeout(() => {
        setFlying(false);
      }, animationDuration);
    }

    return () => {
      if (timeoutId) {
        window.clearInterval(timeoutId);
      }
    };
  }, [bounds, isFlying]);

  return (
    <div
      className={cx({
        'relative z-0 h-full w-full': true,
        [className]: !!className,
      })}
    >
      <ReactMapGL
        id={id}
        // ! if you're using Mapbox (and not a fork), remove the below property
        // ! and replace the according map styles
        mapLib={MapLibreGL}
        mapStyle={mapStyle}
        initialViewState={initialViewState}
        dragPan={!isFlying && dragPan}
        dragRotate={!isFlying && dragRotate}
        scrollZoom={!isFlying && scrollZoom}
        doubleClickZoom={!isFlying && doubleClickZoom}
        onMove={handleMapMove}
        {...mapboxProps}
        {...localViewState}
      >
        {!!mapRef && children(mapRef.getMap())}
      </ReactMapGL>
    </div>
  );
};

export default CustomMap;
