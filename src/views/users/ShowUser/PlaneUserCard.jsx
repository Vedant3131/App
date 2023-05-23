import userLogo from "../../../assets/images/user-logo.png";

export function PlaneUserCard({ id, gender, username }) {
  return (
    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            className="rounded-circle"
            alt="Profile-Image"
            width={150}
            src={`https://xsgames.co/randomusers/avatar.php?g=${gender}&id=${id}`}
            onError={(e) => {
              e.target.src = userLogo;
            }}
          />

          <div className="mt-3">
            <h4>{username}</h4>
            <p className="text-secondary mb-1" style={{ margin: "10px" }}>
              Alpha Blogger
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
