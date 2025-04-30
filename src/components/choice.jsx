import { renderToString } from 'react-dom/server';

export default function choice(props){
  let styles = {}
  if (renderToString(props.userAnswer) !== "" & renderToString(props.text) === renderToString(props.correctChoice)){
    styles={
      backgroundColor: "#4F5B42"
    }
  }
  else if (renderToString(props.text) === renderToString(props.userAnswer)){
    if (renderToString(props.text) !== renderToString(props.correctChoice)){
      styles={
        backgroundColor: "#5B424D"
      }
    }
  }
  return (
          <button 
            className={props.userAnswer !== "" ? "disabled" : ""}
            style={styles}
            onClick={() => props.handleChoice(props.text)}
            disabled={props.userAnswer !== ""}
          >
            {props.text}
          </button>
          )
}