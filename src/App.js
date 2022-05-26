import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import { useState } from "react"

export default function App(){

    const [rollCounter, setRollCounter] = useState(0)

    const [dice, setDice] = React.useState(generateRandomDice())

    //tenzies indicates when the user has won the game.
    const [tenzies, setTenzies] = React.useState(false)

     //dice must be just a new array of objects, but it cannot be an array of multiple "Die" components. This is why the state cannot change, it cannot be composed of object elements.

    const newDiceArray = dice.map(die => {
        return(
            <Die
                value = {die.value}
                isHeld = {die.isHeld}
                holdDice = {() => checkHold(die.id)}
                key = {die.id}
            />
        )
    })

    React.useEffect(() => {
        //check "every" function, so we know is all dice are held and have the same value
        const isHeldCondition = dice.every(checkIsHeld)
        const firstValue = dice[0].value
        const sameValueCondition = dice.every(die => die.value === firstValue)

        function checkIsHeld(die) {
            return die.isHeld
        }

        if (isHeldCondition && sameValueCondition){
            setTenzies(true)
        }

    }, [dice])

    //To change the state of one die we make use of the general state (dice). We have to check the id of the die we have clicked. For that we use map, we checked every single die on the array and we see if it has the same id. If it does we invert its isHeld property.

    function checkHold(id){
        setDice(oldDice => oldDice.map(die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            }))
    }

    //It generates an array of objects

    function generateRandomDice(){
        const myArray = []
        for(let i = 0; i<10; i++){
            myArray.push(generateRandomDie())
        }
        return myArray
    }

    function generateRandomDie(){
        return {
            value: Math.floor(Math.random()*6)+1,
            isHeld: false,
            id: nanoid()
        }
    }

    //Just like with showHold we check every dice and see if its isHeld value is true. It its true we pass that same dice, but if it is not true we generate a new die.

    function RollDice(){

        //We check if tenzies is true, so we can start a New Game.

        if (tenzies){

            setDice(generateRandomDice())
            setTenzies(false)
            setRollCounter(0)

        }else{

            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateRandomDie()
            }))

            setRollCounter(prevCount => prevCount + 1)

        }
    }

    return(
        <main className="main-container">
            <div className="main-container-title-instructions">
                <h1 className="main-container-title">Tenzies</h1>
                <p className="main-container-instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="main-container-dice-container">
                {newDiceArray}
            </div>
            <div className="main-container-buttonContainer">
                <button className="main-container-buttonContainer-btn" onClick={RollDice}>{tenzies ? "New Game" : "Roll"}</button>
            </div>
            {tenzies && <div className="main-container-rollCounter">You have rolled the dice: {rollCounter} times</div>}
        </main>
    )
    //We check if the game is over, then we can show the amount of times the user has rolled the dice.
}

