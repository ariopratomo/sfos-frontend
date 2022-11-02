import React from "react";
// use navigate
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { withRouter } from "../common/with-router";
// navigation to home page
const required = (value) =>
{
  if (!value)
  {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
}

const Login = () =>
{
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  // check if user is logged in
  React.useEffect(() =>
  {
    if (AuthService.getCurrentUser())
    {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) =>
  {
    e.preventDefault();

    setMessage("");
    setLoading(true);
    AuthService.login(username, password).then(
      (response) =>
      {
        navigate("/home");
        window.location.reload();
  
      },
      (error) =>
      {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setLoading(false);
        // console.log(resMessage);
        setMessage(resMessage === "Unauthorised." ? "Invalid username or password" : resMessage);
      }
    );

  }

  return (
    <div className="col-md-12">
      <div className="card card-container border-0">

        <form onSubmit={handleLogin}>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} validations={[required]} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" autoComplete="off" name="password" value={password} onChange={(e) => setPassword(e.target.value)} validations={[required]} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);