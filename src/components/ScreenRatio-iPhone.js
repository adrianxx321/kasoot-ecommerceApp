import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

// Use iPhone 11 as base size which is 207 x 448
const baseWidth = 414;
const baseHeight = 896;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const ScreenRatio_iPhone =
    (size) => Math.ceil((size * scale));