export function Option({ handler, children }) {
  return (
    <li className="option" onClick={handler}>
      {children}
    </li>
  );
}
