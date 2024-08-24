import { Image, StyleSheet, Platform, View } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";

import {
  Group,
  useFont,
  Text,
  Skia,
  Canvas,
  vec,
  Path,
  Circle,
  Paint,
  Shadow,
} from "@shopify/react-native-skia";

import { Dimensions, LayoutChangeEvent } from "react-native";
import { useRotate } from "@/hooks/useRotate";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

interface ClockNumbersProps{
  width:number;
  height:number;
  textRadius:number;
}
const ClockNumbers=({width,height,textRadius}:ClockNumbersProps)=>{
  return Array.from({ length: 12 }).map((_,i)=>{
    const fontSize = 13;
    const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), fontSize);
    let angle=60-30*i
    let textNumber=`${i+1}`
    return  <Text
      key={`clockNumber-${i}`}
      x={width*0.5+Math.cos(Math.PI*(angle)/180)*textRadius}
      y={height*0.5-Math.sin(Math.PI*(angle)/180)*textRadius}
      text={textNumber}
      color={"black"}
      font={font}
    />
  })
}

export default function HomeScreen() {
  const radius = 120;
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
  secondsPath.moveTo(canvasLayout.width * 0.5, canvasLayout.height * 0.5);
  secondsPath.lineTo(
    canvasLayout.width * 0.5,
    canvasLayout.height * 0.5 - radius
  );
  secondsPath.close();
  const minutesPath = Skia.Path.Make();
  minutesPath.moveTo(canvasLayout.width * 0.5, canvasLayout.height * 0.5);
  minutesPath.lineTo(
    canvasLayout.width * 0.5,
    canvasLayout.height * 0.5 - radius
  );
  minutesPath.close();
  const hoursPath = Skia.Path.Make();
  hoursPath.moveTo(canvasLayout.width * 0.5, canvasLayout.height * 0.5);
  hoursPath.lineTo(
    canvasLayout.width * 0.5,
    canvasLayout.height * 0.5 - radius * 0.5
  );
  hoursPath.close();

  const { secondsStyle, minutesStyle, hoursStyle } = useRotate(0);
  const clockRadius=canvasLayout.width*0.5-10
  const textRadius=canvasLayout.width*0.5-40

  return (
    <View style={styles.container}>
      <Canvas
        onLayout={handleCanvasLayout}
        style={{
          width: "100%",
          aspectRatio: 1,
          borderColor: "blue",
          borderWidth: 2,
          borderStyle: "solid",

        }}
      >
        <Group>
          <Circle cx={canvasLayout.width*0.5} cy={canvasLayout.height*0.5} r={clockRadius} color={"grey"}/>
        </Group>
        <Group>
          <Circle cx={canvasLayout.width*0.5} cy={canvasLayout.height*0.5} r={clockRadius-5}>
          <Paint color={"#f0f0f0"}>
          <Shadow dx={8} dy={8} blur={5} color="rgba(0, 0, 0, 0.2)"/>
          <Shadow dx={-8} dy={-8} blur={5} color="rgba(255, 255, 255, 0.7)"/>
          </Paint>
          </Circle>
        </Group>
        <Group
          transform={secondsStyle}
          origin={vec(canvasLayout.width * 0.5, canvasLayout.height * 0.5)}
        >
          <Path
            path={secondsPath}
            color="red"
            style="stroke"
            strokeJoin="round"
            strokeWidth={1.5}
          />
        </Group>
        <Group
          transform={minutesStyle}
          origin={vec(canvasLayout.width * 0.5, canvasLayout.height * 0.5)}
        >
          <Path
            path={minutesPath}
            color="grey"
            style="stroke"
            strokeJoin="round"
            strokeWidth={3.5}
          />
        </Group>
        <Group
          transform={hoursStyle}
          origin={vec(canvasLayout.width * 0.5, canvasLayout.height * 0.5)}
        >
          <Path
            path={hoursPath}
            color="grey"
            style="stroke"
            strokeJoin="round"
            strokeWidth={3.5}
          />
        </Group>
        <Group>
        <ClockNumbers width={canvasLayout.width} height={canvasLayout.height} textRadius={textRadius}/>
        </Group>
        <Circle cx={canvasLayout.width*0.5} cy={canvasLayout.height*0.5} r={7} color={"grey"}/>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    justifyContent: "center",
    alignContent: "center",
  },
});
