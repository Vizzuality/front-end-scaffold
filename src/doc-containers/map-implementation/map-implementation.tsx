'use client';

import { useCallback, useState } from 'react';

import { ViewState, MapProvider } from 'react-map-gl';
import { Layer } from 'react-map-gl';

// Controls
import Map from 'components/map';
import Controls from 'components/map/controls';
import FitBoundsControl from 'components/map/controls/fit-bounds';
import ZoomControl from 'components/map/controls/zoom';
import { Bbox } from 'components/map/types';

// Map
import LayerManager from './layer-manager';
const DEFAULT_BBOX: Bbox = [8.086023, 42.030424, 14.249353, 45.311115];

const MapImplementation = () => {
  const args = {
    viewport: {},
    initialViewState: {
      bounds: DEFAULT_BBOX,
      fitBoundsOptions: {
        padding: 250,
      },
      maxZoom: 7,
      minZoom: 3,
    },
    bounds: {
      bbox: DEFAULT_BBOX,
      options: {
        padding: 250,
        duration: 1000,
      },
    },
    onMapViewportChange: (viewport) => {
      console.info('onMapViewportChange: ', viewport);
    },
    maxZoom: 20,
  };

  const { initialViewState, bounds, maxZoom } = args;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <MapProvider>
      <div className="relative h-[400px] w-full">
        <Map
          maxZoom={maxZoom}
          bounds={bounds}
          initialViewState={initialViewState}
          viewState={viewState}
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
                <FitBoundsControl bounds={bounds} />
              </Controls>
            </>
          )}
        </Map>
      </div>
    </MapProvider>
  );
};

export default MapImplementation;
