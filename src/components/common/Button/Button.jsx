export default function Button ({ id, className, onClick, value, children }) {
  return (
    <button
    id={id}
    className={className}
    onClick={onClick}
    value={value}
    >{children}</button>
  )
}
