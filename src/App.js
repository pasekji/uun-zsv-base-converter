import { useReducer } from "react";
import "./styles.css"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}


function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentInput === undefined){
        return state
      }
      if ((payload.digit === "0b" || payload.digit === "0x") && state.currentInput === undefined){
        return {
          ...state,
          currentInput: `${state.currentInput || ""}${payload.digit}`,
        }
      }
      if (state.currentInput !== undefined) {
        if (payload.digit === "0x" || payload.digit === "0b"){
          return state
        }
      }
      
      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`,
      }
  case ACTIONS.CHOOSE_OPERATION:
    if(state.currentInput == null && state.result == null){
      return state
    }

    if (state.currentInput == null){
      return {
        ...state,
        operation: payload.operation,
      }
    }

    return {
      ...state,
      operation: payload.operation,
      result: state.currentInput,
      currentInput: null,
    }
    
  case ACTIONS.CLEAR:
    return {}

  case ACTIONS.EVALUATE:
    if (state.operation == null){
      return state
    }
    return {
      ...state,
      result:  evaluate(state) ,
      operation: null,
      currentInput: null,
    }
  }
}

function evaluate({currentInput, result, operation}){
  let from = ""
  let computation = ""
  if (result.startsWith("0x")){
    from = "hex"
  } else if (result.startsWith("0b")){
    from = "bin"
  }
  else{
    from = "dec"
  }

  switch(operation) {
    case " to dec ":
      switch(from){
        case "hex":
          return convertHexToDec(result)
        case "bin":
          return convertBinToDec(result)
        case "dec":
          for(let i = 0; i < result.length; i++) {
            if (!(result.charAt(i) >= '0' && result.charAt(i) <= '9')){
              return ""
            }
          }
          return result
      }
      break
    case " to bin ":
      switch(from){
        case "hex":
          return convertHexToBin(result)
        case "bin":
          let bin = result.replace("0b", "")
          for(let i = 0; i < bin.length; i++) {
            if (!(bin.charAt(i) >= '0' && bin.charAt(i) <= '1')){
                return ""
            }
          }
          return result
        case "dec":
          return convertDecToBin(result)
      }
      break
    case " to hex ":
      switch(from){
        case "hex":
          return result
        case "bin":
          return convertBinToHex(result)
        case "dec":
          return convertDecToHex(result)
      }
      break
  }
}

function convertDecToBin(result){
  for(let i = 0; i < result.length; i++) {
    if (!(result.charAt(i) >= '0' && result.charAt(i) <= '9')){
      return ""
    }
  }

  let dec = parseInt(result)
  let bin = ""
  while (dec > 0) {
    if (dec % 2 == 1) {
       bin = "1" + bin;
    } else {
       bin = "0" + bin;
    }
    dec = Math.floor(dec / 2);
  }

  bin = "0b" + bin
  return bin
}

function convertDecToHex(result){
  if(result === ""){
    return ""
  }

  for(let i = 0; i < result.length; i++) {
    if (!(result.charAt(i) >= '0' && result.charAt(i) <= '9')){
      return ""
    }
  }

  let dec = parseInt(result)
  let hex = ""
  let tmp = 0
  while (dec > 0) {
    tmp = dec % 16
    tmp = tmp.toString()
    switch(tmp){
      case "0":
        hex = "0" + hex
        break
      case "1":
        hex = "1" + hex
        break
      case "2":
        hex = "2" + hex
        break
      case "3":
        hex = "3" + hex
        break
      case "4":
        hex = "4" + hex
        break
      case "5":
        hex = "5" + hex
        break
      case "6":
        hex = "6" + hex
        break
      case "7":
        hex = "7" + hex
        break
      case "8":
        hex = "8" + hex
        break
      case "9":
        hex = "9" + hex
        break
      case "10":
        hex = "A" + hex
        break
      case "11":
        hex = "B" + hex
        break
      case "12":
        hex = "C" + hex
        break
      case "13":
        hex = "D" + hex
        break
      case "14":
        hex = "E" + hex
        break
      case "15":
        hex = "F" + hex
        break
    }
    dec = Math.floor(dec / 16);
  }

  hex = "0x" + hex
  return hex
}

function convertBinToDec(result){
  let dec = 0
  let base = 1
  let bin = result.replace("0b", "")

  for(let i = 0; i < bin.length; i++) {
    if (!(bin.charAt(i) >= '0' && bin.charAt(i) <= '1')){
        return ""
    }
  }

  for(let i = bin.length - 1; i >= 0; i--) {
      dec += (bin.charAt(i).charCodeAt(0) - 48) * base
      base = base * 2
  }

  return dec.toString()
}

function convertBinToHex(result){
  return convertDecToHex(convertBinToDec(result))
}

function convertHexToDec(result){
  let base = 1
  let dec = 0
  let hex = result.replace("0x", "")
  let len = hex.length

  for (let i = len - 1; i >= 0; i--) {
    if (hex.charAt(i) >= '0' && hex.charAt(i) <= '9') {
      dec += (hex.charAt(i).charCodeAt(0) - 48) * base
      base = base * 16
    }
    else if (hex.charAt(i) >= 'A' && hex.charAt(i) <= 'F') {
      dec += (hex.charAt(i).charCodeAt(0) - 55) * base
      base = base * 16
    }
  }

  return dec.toString()
}

function convertHexToBin(result){
  let hex = result.replace("0x", "")
  let bin = ""
  for(let c of hex) {
    switch(c) {
      case '0':
        bin += "0000"
        break
      case '1':
        bin += "0001"
        break
      case '2':
        bin += "0010"
        break
      case '3':
        bin += "0011"
        break
      case '4':
        bin += "0100"
        break
      case '5':
        bin += "0101"
        break
      case '6':
        bin += "0110"
        break
      case '7':
        bin += "0111"
        break
      case '8':
        bin += "1000"
        break
      case '9':
        bin += "1001"
        break
      case 'A':
        bin += "1010"
        break
      case 'B':
        bin += "1011"
        break
      case 'C':
        bin += "1100"
        break
      case 'D':
        bin += "1101"
        break
      case 'E':
        bin += "1110"
        break
      case 'F':
        bin += "1111"
        break
      default:
        return ""
    }
  }

  bin = "0b" + bin
  return bin
}

function App() {
  const [{currentInput, result, operation}, dispatch] = useReducer(reducer, {})

  return (
  <div>
    <div className="converter-grid">
      <div className="output">
        <div className="result"> { result } { operation }</div>
        <div className="current-input"> { currentInput } </div>
      </div>
      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <DigitButton digit="0b" dispatch={dispatch}/>
      <DigitButton digit="0x" dispatch={dispatch}/>
      <OperationButton operation=" to dec " dispatch={dispatch}/>
      <OperationButton operation=" to bin " dispatch={dispatch}/>
      <OperationButton operation=" to hex " dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <DigitButton digit="A" dispatch={dispatch}/>
      <DigitButton digit="B" dispatch={dispatch}/>
      <DigitButton digit="C" dispatch={dispatch}/>
      <DigitButton digit="D" dispatch={dispatch}/>
      <DigitButton digit="E" dispatch={dispatch}/>
      <DigitButton digit="F" dispatch={dispatch}/>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
    <div className="instructions">
      <h2>How to use this converter?</h2>
      <p> Don't try to type inputs with your keyboard, use the provided buttons! </p>
      <p> If you want to convert from binary representation, put 0b at the begining of the input. Likewise, use 0x to convert from hexadecimal. If you don't provide either 0b or 0x, the input is assumed to be decimal. </p>
      <p> Then select the base you want to convert to, "to bin" button if you want to convert to binary, "to dec" button if you want to convert to decimal, "to hex" button if you want to convert to hexadecimal. </p>
      <p> Then press "=" button to get your converted result. </p>
      <p> If you provide invalid input, f.e. 0b10120 or 10AF, you'll get empty output. When that happens, restart the converter by pressing "AC" button. </p>
      <p> If you want to erase input or restart the converter, press "AC" button. </p>
      <div className="author">
        <h5> Made by Jiri Pasek as software development homework for <a href="https://unicornuniversity.net/">UUN</a></h5>
      </div>
    </div>
  </div>
  )
}

export default App;
