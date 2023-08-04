import { Source, Layer } from 'react-map-gl';

import { GeoJSONSourceRaw, AnyLayer, GeoJSONSourceOptions } from 'mapbox-gl';

import type { LayerComponentProps } from '../types';

import data from './example.json';

const GEOJSON = data as GeoJSON.FeatureCollection;
const SOURCE: GeoJSONSourceRaw & GeoJSONSourceOptions = {
  type: 'geojson',
  data: GEOJSON,
};

const LAYER: AnyLayer = {
  id: `example-layer`,
  type: 'line',
  paint: {
    'line-color': '#000000',
    'line-opacity': 1,
  },
  layout: {
    visibility: 'visible',
  },
};

const ExampleLayer = ({ beforeId }: LayerComponentProps) => (
  <Source {...SOURCE}>
    <Layer {...LAYER} beforeId={beforeId} />
  </Source>
);

export default ExampleLayer;
