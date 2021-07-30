import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout";
import withAuth from "../../components/withAuth";
import { post } from "../../lib/api";
import useUser from "../../lib/useUser";

function CreatePost() {
  const [postForm, setPostForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onChangeForm = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await post("api/post/create", {
      ...postForm,
      userId: user.id,
    });
    if (!result) setLoading(false);
    router.push({ pathname: "/post" });
  };
  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <div>Title</div>
          <input
            required
            name="title"
            value={postForm.title}
            onChange={onChangeForm}
          />
          <div>Content</div>
          <textarea
            required
            name="content"
            cols={100}
            rows={30}
            value={postForm.content}
            onChange={onChangeForm}
          />
          <p>
            <input
              disabled={loading}
              type="button"
              onClick={() => router.push({ pathname: "/post" })}
              value="Cancel"
            />
            <input disabled={loading} type="submit" value="Add" />
          </p>
        </form>
      </div>
    </Layout>
  );
}

export default withAuth(CreatePost, { hasSidebar: true, privateRouter: true });
