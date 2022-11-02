import React from "react";
import { withRouter } from "../common/with-router";

const Home = () => {

  // const currentUser = AuthService.getCurrentUser();
  // const [content, setContent] = ;

  // React.useEffect(() => {
  //   AuthService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setContent(_content);
  //     }
  //   );
  // }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Home</h3>
      </header>
    </div>
  );
}

export default withRouter(Home);