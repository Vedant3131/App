export function GridView({ children, columns = 3 }) {
  return (
    <div className="container">
      <div className={`row row-cols-${columns}`}>{children}</div>
    </div>
  );
}
