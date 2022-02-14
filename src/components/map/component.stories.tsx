import { useCallback, useState } from 'react';

import { useMap, ViewState, MapProvider } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';

// Controls
import Controls from 'components/map/controls';
import FitBoundsControl from 'components/map/controls/fit-bounds';
import ZoomControl from 'components/map/controls/zoom';

// Map
import Map from './component';
import { Bounds, CustomMapProps } from './types';

export default {
  title: 'Components/Map',
  component: Map,
  argTypes: {
    ReactMapGLAttributes: {
      name: 'All ReactMapGL props',
      description: 'http://visgl.github.io/react-map-gl/',
      table: {
        type: {
          summary: 'ReactMapGLAttributes',
        },
      },
      control: {
        disable: true,
      },
    },
    mapboxApiAccessToken: {
      description:
        'http://visgl.github.io/react-map-gl/docs/api-reference/static-map#mapboxapiaccesstoken',
      table: {
        type: {
          summary: 'ReactMapGLAttributes',
        },
      },
      control: {
        disable: true,
      },
    },
    children: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (MapStory: Story) => (
      <MapProvider>
        <MapStory />
      </MapProvider>
    ),
  ],
};

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, maxZoom } = args;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});
  const { [id]: mapRef } = useMap();

  const handleViewState = useCallback((vw) => {
    setViewState(vw);
  }, []);

  const handleFitBoundsChange = useCallback(
    (_bounds: Bounds) => {
      const { bbox, options } = _bounds;
      mapRef.fitBounds(
        [
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ],
        options
      );
    },
    [mapRef]
  );

  return (
    <div className="relative w-full h-screen">
      <Map id={id} viewState={viewState} onViewStateChange={handleViewState} maxZoom={maxZoom} />
      <Controls>
        <ZoomControl mapRef={mapRef} />
        <FitBoundsControl bounds={bounds} onFitBoundsChange={handleFitBoundsChange} />
      </Controls>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'map-storybook',
  className: '',
  viewport: {},
  bounds: {
    bbox: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
    options: {
      padding: 250,
      duration: 5000,
    },
  },
  onMapViewportChange: (viewport) => {
    console.info('onMapViewportChange: ', viewport);
  },
  onMapReady: ({ map, mapContainer }) => {
    console.info('onMapReady: ', map, mapContainer);
  },
  onMapLoad: ({ map, mapContainer }) => {
    console.info('onMapLoad: ', map, mapContainer);
  },
  maxZoom: 4,
};
