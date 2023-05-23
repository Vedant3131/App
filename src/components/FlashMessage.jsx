export function FlashMessage({ type, msg }) {
  if (!(type || msg)) {
    return <></>;
  }

  return (
    <>
      <div
        className={`alert alert-${type} alert-dismissible fade show`}
        role="alert"
        style={{ textAlign: "center" }}
        key={msg}
      >
        <strong></strong>
        {msg}
      </div>
    </>
  );
}
