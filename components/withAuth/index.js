import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import Layout from "../layout";
import Sidebar from "../sidebar";

const withAuth = (Component, { hasSidebar, privateRouter } = {}) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { user } = useUser(privateRouter ? { redirectTo: "/" } : {});
    const router = useRouter();

    // If user is not logged in, return login component
    if (privateRouter && (!user || user.isLoggedIn === false)) {
      return <Layout>Loading...</Layout>;
    }

    // If user is logged in, return original component
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Component {...props} />
        {hasSidebar ? (
          user?.isLoggedIn ? (
            <Sidebar></Sidebar>
          ) : (
            <div style={{ position: "fixed", right: 0, margin: "30px" }}>
              <button onClick={() => router.push("/signin")}>login</button>
            </div>
          )
        ) : null}
      </div>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
