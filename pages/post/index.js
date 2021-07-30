import Layout from "../../components/layout";
import withAuth from "../../components/withAuth";
import Card from "../../components/card";
import { get, post } from "../../lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import stylePost from "./post.module.css";
import useUser from "../../lib/useUser";

function Post() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [confirm, setConfirm] = useState();
  const { user } = useUser();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await post("api/post", { user_id: user.id });
    if (res) setPosts(res);
  };

  const handleClickPost = (e, item) => {
    e.preventDefault();
    router.push({
      pathname: "/post/[id]",
      query: { id: item.id },
    });
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/post/create",
    });
  };

  const handleEditPost = (e, item) => {
    e.stopPropagation();
    router.push({
      pathname: "/post/edit/[id]",
      query: { id: item.id },
    });
  };

  const handleConfirmDeletePost = (e, item) => {
    e.stopPropagation();
    setConfirm(item.id);
  };

  const handleCancelPost = (e) => {
    e.stopPropagation();
    setConfirm(null);
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();
    await post("api/post/delete", { id: confirm });
    setConfirm(null);
    fetchData();
  };

  return (
    <Layout>
      <div className={stylePost.cards}>
        <Card className={stylePost.add_card} onClick={handleAddPost}>
          <div className="plus radius"></div>
        </Card>
        {posts?.map((item, index) => (
          <Card
            className={stylePost.card}
            onClick={(e) => (!confirm ? handleClickPost(e, item) : null)}
            key={index}
          >
            {confirm !== item.id ? (
              <div>
                <h3>Code: {item.id}</h3>
                <p>Title: {item.title}</p>
                <p>Content: {item.content}</p>
                <div className={stylePost.action_card}>
                  <div onClick={(e) => handleEditPost(e, item)}>Edit</div>
                  <div onClick={(e) => handleConfirmDeletePost(e, item)}>
                    Del
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ position: "relative", height: "100%" }}>
                <p>Are you sure ?</p>
                <div className={stylePost.confirm_card}>
                  <div onClick={handleCancelPost}>Cancle</div>
                  <div onClick={(e) => handleDeletePost(e, item)}>Ok</div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default withAuth(Post, { hasSidebar: true, privateRouter: true });
