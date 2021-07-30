import cardStyle from "./card.module.css";

export default function Card(props) {
  return (
    <div {...props} className={`${cardStyle.card} ${props.className}`}>
      {props.children}
    </div>
  );
}
