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
} from "@shopify/react-native-skia";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { useRotate } from "@/hooks/useRotate";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const radius = 120;

  const fontSize = 10;
  const font = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), fontSize);

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

  // const skCirclePath = Skia.Path.Make();
  // skCirclePath.addCircle((canvasLayout.width / 2), (canvasLayout.height / 2), canvasLayout.width / 2);

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
        <Circle cx={canvasLayout.width*0.5} cy={canvasLayout.height*0.5} r={clockRadius} color={"grey"}/>
        <Circle cx={canvasLayout.width*0.5} cy={canvasLayout.height*0.5} r={clockRadius-5} color={"black"}/>
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

         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*60/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*60/180)*textRadius}
        text="1"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*30/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*30/180)*textRadius}
        text="2"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*0/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*0/180)*textRadius}
        text="3"
        color={"white"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-30/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-30/180)*textRadius}
        text="4"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-60/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-60/180)*textRadius}
        text="5"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-90/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-90/180)*textRadius}
        text="6"
        color={"white"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-120/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-120/180)*textRadius}
        text="7"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-150/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-150/180)*textRadius}
        text="8"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-180/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-180/180)*textRadius}
        text="9"
        color={"white"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-210/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-210/180)*textRadius}
        text="10"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-240/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-240/180)*textRadius}
        text="11"
        color={"red"}
        font={font}
      />
         <Text
        x={canvasLayout.width*0.5+Math.cos(Math.PI*-270/180)*textRadius}
        y={canvasLayout.height*0.5-Math.sin(Math.PI*-270/180)*textRadius}
        text="12"
        color={"white"}
        font={font}
      />
        </Group>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
