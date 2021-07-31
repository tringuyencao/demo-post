import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { getRandomArbitrary } from "../../functions/utils/random";
import { post } from "../../lib/api";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [shadow, setShadow] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirm) {
      const result = await post("api/user/create", { email, password });
      if (result) router.push({ pathname: "/signin" });
      else alert("faild!");
    } else alert("Confirm is incorrect!");
    setLoading(false);
  };

  useEffect(() => {
    setShadow({
      filter: `drop-shadow(${getRandomArbitrary(20, 80)}vw ${getRandomArbitrary(
        -25,
        45
      )}vh 0px black)`,
    });
  }, []);

  return (
    <Layout signin>
      <div style={shadow}>
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div>Email</div>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>Password</div>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>Confirm</div>
          <input
            required
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <p>
            <input disabled={loading} type="submit" value="Sign up" />
          </p>
        </form>
        <p>
          <Link href={"/signin"}>
            <a>⟵ Back to sign in</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
