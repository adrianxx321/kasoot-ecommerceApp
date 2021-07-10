import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Animated from "react-native-reanimated"

const {width, height} = Dimensions.get("window")

export default Paginator = ({data, scrollX}) => {
    return (
        <View 
            style={{
                flexDirection: "row",
                justifyContent: "center",
                bottom: 30
            }}>
            {data.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                const indicatorLength = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 36, 12],
                    extrapolate: "clamp"
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.1, 1, 0.1],
                    extrapolate: "clamp"
                })

                return (
                    <Animated.View style={[styles.indicator, {width: indicatorLength, opacity}]} key={index.toString()}/>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    indicator: {
        height: 6,
        borderRadius: 5,
        backgroundColor: "#bf5f26",
        marginHorizontal: 6,
    }
})