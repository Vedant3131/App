export function Error({ errorHeading, errorMessages }) {
  if (!errorMessages.length) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">{errorHeading}</h4>
        <ul>
          {errorMessages.map((msg) => (
            <li id={msg}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
