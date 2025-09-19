import UserCard from "./UserCard";

const UserList = ({ users, loading, error }) => {
  if (loading) {
    return <div className="loading">Searching users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (users.length === 0) {
    return (
      <div className="no-results">
        No users found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Search Results ({users.length} users found)</h2>
      <div className="users-grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
