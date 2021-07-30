import Layout from "../components/layout";
import Card from "../components/card";
import { get } from "../lib/api";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import withAuth from "../components/withAuth";

function Home({ data }) {
  const router = useRouter();
  const { user } = useUser();

  const handleClickPost = (e, item) => {
    e.preventDefault();
    router.push({
      pathname: "/post/[id]",
      query: { id: item.id },
    });
  };
  return (
    <Layout>
      <div className={"cards"}>
        {data?.map((item, index) => (
          <Card
            className={"card"}
            onClick={(e) => handleClickPost(e, item)}
            key={index}
          >
            <p>Title: {item.title}</p>
            <p>Content: {item.content}</p>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const posts = await get("api/post");
  return {
    props: { data: posts },
  };
}

export default withAuth(Home, {hasSidebar: true});
