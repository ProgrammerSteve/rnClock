import { Image, StyleSheet, Platform, View } from 'react-native';
import { useState,useEffect,useCallback } from 'react';

import {
  Group,
  useFont,
  Skia,
  Canvas,
  vec,
  Path,
} from "@shopify/react-native-skia";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import { useRotate } from '@/hooks/useRotate';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {

  const radius=120

  const [canvasLayout, setCanvasLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleCanvasLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setCanvasLayout({ x, y, width, height });
  }, []);

  
  const secondsPath = Skia.Path.Make();
  secondsPath.moveTo(canvasLayout.width*0.5, canvasLayout.height*0.5);
  secondsPath.lineTo(canvasLayout.width*0.5, canvasLayout.height*0.5-radius);
  secondsPath.close();
  const minutesPath = Skia.Path.Make();
  minutesPath.moveTo(canvasLayout.width*0.5, canvasLayout.height*0.5);
  minutesPath.lineTo(canvasLayout.width*0.5, canvasLayout.height*0.5-radius);
  minutesPath.close();
  const hoursPath = Skia.Path.Make();
  hoursPath.moveTo(canvasLayout.width*0.5, canvasLayout.height*0.5);
  hoursPath.lineTo(canvasLayout.width*0.5, canvasLayout.height*0.5-radius*0.5);
  hoursPath.close();

  const {secondsStyle,minutesStyle,hoursStyle}=useRotate(0)

  return (


        <View style={styles.container}>



      <Canvas
            onLayout={handleCanvasLayout}
            style={{
              width: "100%",
              aspectRatio:1,
              borderColor: "blue",
              borderWidth: 2,
              borderStyle: "solid",
              backgroundColor: "black",
            }}
          >
            <Group transform={secondsStyle} origin={vec(canvasLayout.width*0.5, canvasLayout.height*0.5)}>
              <Path
                path={secondsPath}
                color="#E5C2B1"
                style="stroke"
                strokeJoin="round"
                strokeWidth={3.5}
              />
            </Group>
            <Group transform={minutesStyle} origin={vec(canvasLayout.width*0.5, canvasLayout.height*0.5)}>
              <Path
                path={minutesPath}
                color="#E5C2B1"
                style="stroke"
                strokeJoin="round"
                strokeWidth={3.5}
              />
            </Group>
            <Group transform={hoursStyle} origin={vec(canvasLayout.width*0.5, canvasLayout.height*0.5)}>
              <Path
                path={hoursPath}
                color="#E5C2B1"
                style="stroke"
                strokeJoin="round"
                strokeWidth={3.5}
              />
            </Group>
          </Canvas>
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
          justifyContent:"center",
          alignContent:"center"
  },

});
