import { useEffect, useRef, useState } from "react";
import { db } from "../../lib/firebase";
import useUser from "../../lib/useUser";
import styleChat from "./chat.module.css";

export default function Chat({ friend, handleClose }) {
  const { user } = useUser();
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [chatCode, setChatCode] = useState("");

  useEffect(() => {
    if (user?.id && friend?.id)
      setChatCode(setOneToOneChat(friend.id, user.id));
  }, []);

  useEffect(() => {
    const ele = document.getElementById(chatCode);
    ele?.lastChild?.scrollIntoView();
  }, [chats]);

  useEffect(() => {
    if (!chatCode) return;
    setReadError(null);
    try {
      db.ref(`chats/${chatCode}`).on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats);
      });
    } catch (error) {
      setReadError(error.message);
    }
  }, [chatCode]);

  const setOneToOneChat = (uid1, uid2) => {
    //Check if user1’s id is less than user2's
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWriteError(null);
    if (!content) return;
    try {
      const currentElement =
        event.currentTarget.querySelector("span") || event.currentTarget;
      currentElement.innerHTML = "";
      await db.ref(`chats/${chatCode}`).push({
        content: content,
        timestamp: Date.now(),
        uid: user.id,
      });
      // console.log(currentElement.parentNode.parentNode.parentNode.firstChild);
      // currentElement.parentNode.firstChild.lastChild.scrollIntoView(true);
      setContent("");
    } catch (error) {
      setWriteError(error.message);
    }
  };
  const handleChange = (e) => {
    setContent(e.currentTarget.textContent);
  };

  return (
    <div className={styleChat.chat_box}>
      <div className={styleChat.chat_title}>
        <span>{friend.email}</span>
        <button onClick={handleClose}>x</button>
      </div>
      <div className={styleChat.form_chat}>
          <div id={chatCode} className={styleChat.chats}>
            {chats.map((chat) => {
              return (
                <p
                  className={`
                ${
                  chat.uid === user.id
                    ? styleChat.message_right
                    : styleChat.message_left
                } ${styleChat.message}
              `}
                  key={chat.timestamp}
                >
                  {chat.content}
                </p>
              );
            })}
          </div>
        <div style={{    flexShrink: 0,
    flexBasis: "42px"}}>
          <form
            onKeyDown={(e) => {
              if (e.which === 13 && !e.shiftKey) return handleSubmit(e);
            }}
            onSubmit={handleSubmit}
          >
            <div className={styleChat.form_input}>
              <span
                contentEditable
                className={styleChat.textarea}
                rows="1"
                onInput={handleChange}
                onBlur={handleChange}
              ></span>
              <button type="submit">Send</button>
            </div>
            {writeError ? <p>{writeError}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}
