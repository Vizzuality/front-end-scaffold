import { useCallback, useState } from 'react';

import { ViewState, MapProvider } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
// Layer manager
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

// Controls
import Controls from 'components/map/controls';
import FitBoundsControl from 'components/map/controls/fit-bounds';
import ZoomControl from 'components/map/controls/zoom';

// Map
import Map from './component';
import LAYERS from './layers';
import { CustomMapProps } from './types';

const StoryMap = {
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

export default StoryMap;

const cartoProvider = new CartoProvider();

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { initialViewState, bounds, maxZoom } = args;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <div className="relative h-screen w-full">
      <Map
        maxZoom={maxZoom}
        bounds={bounds}
        initialViewState={initialViewState}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={handleViewState}
      >
        {(map) => (
          <>
            <LayerManager
              map={map}
              plugin={PluginMapboxGl}
              providers={{
                [cartoProvider.name]: cartoProvider.handleData,
              }}
            >
              {LAYERS.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
            <Controls>
              <ZoomControl />
              <FitBoundsControl bounds={bounds} />
            </Controls>
          </>
        )}
      </Map>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  viewport: {},
  initialViewState: {
    bounds: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
    fitBoundsOptions: {
      padding: 250,
    },
    maxZoom: 7,
    minZoom: 4,
  },
  bounds: {
    bbox: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
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
