import '../styles/Output.css';

export function Output({ text, status }) {
  return (
    <div className={`output ${status}`}>
      <span>{text}</span>
    </div>
  );
}
