import { useEffect, useState } from "react";
import useUser from "../../lib/useUser";
import styleSidebar from "./sidebar.module.css";
import Chat from "../../components/chat";
import fetchJson from "../../lib/fetcher";
import Tag from "../tag";
import useSWR from "swr";
import { post } from "../../lib/api";

export default function Sidebar({ children }) {
  const { user, mutateUser } = useUser();
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const { data: users } = useSWR("/api/user");

  useEffect(() => {
    setFriends(users);
  }, [users]);

  const addChat = (item) => {
    const foundUser = chats.find((ele) => item.id === ele.id);
    if (foundUser) return;
    setChats((prev) => [...prev, item].slice(-3));
  };

  const closeChat = (userId) => {
    const currentChats = chats.filter((item) => item.id !== userId);
    setChats(currentChats);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      mutateUser(
        await fetchJson("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const data = await post("api/user", { email: search });
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styleSidebar.sidebar}>
      <div>
        {children}
        <div className={styleSidebar.info}>
          <div>
            Login in as: <strong>{user.email}</strong>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <div className={styleSidebar.search}>
          <form onSubmit={handleSearch}>
            <input onChange={(e) => setSearch(e.target.value)}></input>
          </form>
        </div>
      </div>
      <div className={styleSidebar.list}>
        {friends?.length
          ? friends
              .filter((item) => user.id !== item.id)
              .map((ele) => {
                return (
                  <div
                    className={styleSidebar.tag}
                    key={ele.id}
                    onClick={() => addChat(ele)}
                  >
                    <Tag>{ele.email}</Tag>
                  </div>
                );
              })
          : null}
      </div>
      <div className={styleSidebar.chats}>
        {chats?.length
          ? chats.map((item) => {
              return (
                <Chat
                  key={item.id}
                  friend={item}
                  handleClose={() => closeChat(item.id)}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
