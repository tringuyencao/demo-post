import { useRouter } from "next/router";
import { get, post } from "../../lib/api";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import withAuth from "../../components/withAuth";

function PostById({ data }) {
  const router = useRouter();
  const { title, content, user_id } = data;
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await post(`api/user/${user_id}`);
    setUserPost(data);
  }

  return (
    <Layout>
      <div>
        <h4>{title}</h4>
        <h5>{content}</h5>
        <h5>{userPost.email}</h5>
        <input
          type="button"
          onClick={() => router.back()}
          value="Back"
        />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await get("api/post");
  const paths = data.map((item) => ({ params: { id: item.id.toString() } }));
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await post(`api/post/${params.id}`);
  return {
    props: {
      data: data,
    },
  };
}

export default withAuth(PostById, {hasSidebar: true})