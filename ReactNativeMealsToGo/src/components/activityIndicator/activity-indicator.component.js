import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loader = () => (
  <ActivityIndicator size={40} animating={true} color={MD2Colors.red800} />
);

export default Loader;