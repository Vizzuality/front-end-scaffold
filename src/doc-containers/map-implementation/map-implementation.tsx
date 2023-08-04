'use client';

import { useCallback, useState } from 'react';

import { ViewState, MapProvider } from 'react-map-gl';
import { Layer } from 'react-map-gl';

import { useDebounce } from 'usehooks-ts';

// Controls
import Map from 'components/map';
import Controls from 'components/map/controls';
import FitBoundsControl from 'components/map/controls/fit-bounds';
import ZoomControl from 'components/map/controls/zoom';
import { Bbox } from 'components/map/types';

// Map
import LayerManager from './layer-manager';
const DEFAULT_BBOX: Bbox = [7.295523, 41.102768, 15.425406, 44.885675];
const MAX_ZOOM = 20;
const DEFAULT_BOUNDS = {
  bbox: DEFAULT_BBOX,
  options: {
    padding: 100,
    duration: 1000,
  },
};

const INITIAL_VIEW_STATE = {
  bounds: DEFAULT_BBOX,
  fitBoundsOptions: {
    padding: 100,
  },
  maxZoom: 9,
  minZoom: 2,
};

const MapImplementation = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({});

  const debouncedViewStateValue = useDebounce<Partial<ViewState>>(viewState, 250);

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <MapProvider>
      <div className="relative h-[400px] w-full">
        <Map
          maxZoom={MAX_ZOOM}
          bounds={DEFAULT_BOUNDS}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={debouncedViewStateValue}
          // mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          onMapViewStateChange={handleViewState}
          mapStyle={'https://demotiles.maplibre.org/style.json'}
        >
          {() => (
            <>
              {/* This custom-layers layer serves as a separator to order
              all the layers on the layer manager above the default map layers */}
              <Layer
                id="custom-layers"
                type="background"
                paint={{
                  'background-color': '#000',
                  'background-opacity': 0,
                }}
              />
              <LayerManager layers={['example']} />
              <Controls>
                <ZoomControl />
                <FitBoundsControl bounds={DEFAULT_BOUNDS} />
              </Controls>
            </>
          )}
        </Map>
      </div>
    </MapProvider>
  );
};

export default MapImplementation;
