import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getRandomArbitrary } from "../../functions/utils/random";
import useUser from "../../lib/useUser";
import { post } from "../../lib/api";
import { useRouter } from "next/router";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [shadow, setShadow] = useState({});
  const router = useRouter();
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  useEffect(() => {
    setShadow({
      filter: `drop-shadow(${getRandomArbitrary(20, 80)}vw ${getRandomArbitrary(
        -30,
        50
      )}vh 0px black)`,
    });
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const params = {
      email,
      password,
    };
    mutateUser(await post("api/auth/login", params));
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Layout signin>
      <div style={shadow}>
        <h2>SIGN IN</h2>
        <form onSubmit={handleSignin}>
          <div>
            <div>Email</div>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div>Password</div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            No account?{" "}
            <Link href={"/signup"}>
              <a>Create one!</a>
            </Link>
          </p>
          <input
            disabled={loading}
            type="button"
            onClick={() => router.push("/")}
            value="Back to home"
          />
          <input disabled={loading} type="submit" value="Sign in" />
        </form>
      </div>
    </Layout>
  );
}
