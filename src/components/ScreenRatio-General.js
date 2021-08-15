import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

// Use Pixel 3a as base size which is 18 x 37
const baseWidth = 540;
const baseHeight = 1110;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const ScreenRatio_General =
    (size) => Math.ceil((size * scale));