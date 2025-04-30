export default function Header(props){
  return (
    <header>
      <span>
        <p><strong>Correct count: {props.correctCount}</strong></p>
        <p><strong>Wrong count: {props.wrongCount}</strong></p>
      </span>
      <img src="https://i.ibb.co/hJ25Yjt3/Chat-GPT-Image-Apr-29-2025-at-04-30-20-PM.png"/>
    </header>)
}