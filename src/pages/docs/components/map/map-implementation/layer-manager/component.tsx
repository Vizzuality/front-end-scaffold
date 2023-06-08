import { FC } from 'react';

import ExampleLayer from './layers/example-layer/example-geojson-layer';
import type { LayerComponentProps } from './types';

const LAYER_COMPONENTS: {
  [key: string]: FC<LayerComponentProps>;
} = {
  example: ExampleLayer,
};

const LayerManagerContainer = ({ layers }: { layers: string[] }) => {
  if (!layers) return null;

  const LAYERS_FILTERED = layers?.filter((layer) => !!LAYER_COMPONENTS[layer]);

  return (
    <>
      {LAYERS_FILTERED?.map((layer, i) => {
        const LayerComponent: FC<LayerComponentProps> = LAYER_COMPONENTS[layer];
        // We need to define where do we want to put the layer
        // We want to put it before the custom-layers transparent backgrond
        const beforeId = i === 0 ? 'custom-layers' : `${layers[i - 1]}-layer`;
        return <LayerComponent key={layer} beforeId={beforeId} />;
      })}
    </>
  );
};
export default LayerManagerContainer;
