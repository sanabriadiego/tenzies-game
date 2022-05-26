import React from "react"

export default function Die(props){
const styles = {
    backgroundColor : props.isHeld ? "#59E391" : "#FFFFFF"
}

    return(
        <div className="main-container-dice-container-die" onClick={props.holdDice} style={styles}>{props.value}</div>
    )
}