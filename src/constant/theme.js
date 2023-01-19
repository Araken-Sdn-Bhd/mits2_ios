import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');


export const COLORS = {
    primary : "#FF5678",

    black: "#171717",
    white: "#FFFFFF",
    green:"#19d07e",
    background: "#FFFFFF",
    lightgreen:"#dbffef",
    dot:"#dddddd",
    unselectedicon:"#7c8a90",
    grey:"#7c8a90"
    
}

export const SIZES = {
    base: 10,
    width,
    height
}


const theme = { COLORS, SIZES };

export default theme;