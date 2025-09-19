const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} className="avatar" />
      <div className="user-info">
        <h3 className="username">{user.login}</h3>
        <p className="user-type">{user.type}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
