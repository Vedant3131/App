import "./shared.css";

export function HomeFooter({ footerText }) {
  return (
    <footer className="fixed-bottom" id="home-footer">
      <div className="container">
        <span>{footerText}</span>
      </div>
    </footer>
  );
}
