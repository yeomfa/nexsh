import '../styles/Output.css';
import DOMPurify from 'dompurify';

export function Output({ text, status }) {
  // Avoid XSS
  const cleanText = DOMPurify.sanitize(text);

  return (
    <div className={`output ${status}`}>
      <span dangerouslySetInnerHTML={{ __html: cleanText }} />
    </div>
  );
}
