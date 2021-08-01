import { useRouter } from "next/router";
import { post } from "../../lib/api";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import withAuth from "../../components/withAuth";
import { DBPosts, DBPost } from "../../lib/data/post";

function PostById({ data }) {
  const router = useRouter();
  const { title, content, user_id } = data;
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const test = await post(`api/user/${user_id}`);
    console.log(test);
    setUserPost(test);
  };

  return (
    <Layout>
      <div>
        <h4>{title}</h4>
        <h5>{content}</h5>
        <h5>{userPost?.email}</h5>
        <input type="button" onClick={() => router.back()} value="Back" />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await DBPosts();
  const paths = data.map((item) => ({ params: { id: item.id.toString() } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await DBPost({ id: params.id });
  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
}

export default withAuth(PostById, { hasSidebar: true });
