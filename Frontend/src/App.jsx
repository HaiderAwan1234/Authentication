import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoSend } from "react-icons/io5";
import Show from "./Show";
import { serviceComment } from "./features/post/postSlice";

const App = () => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const commentData = {
    comment,
  };

  const sendHandler = () => {
    dispatch(serviceComment(commentData));
  };

  return (
    <>
      <div className="MAIN">
        <div className="main">
          <div className="div">HELLO WELCOME TO REACT</div>

          <div className="input-main">
            <input
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write comment..."
              className="input"
            />

            <button disabled={!comment} className="send" onClick={sendHandler}>
              <IoSend />
            </button>
          </div>
        </div>

        {/* <Show commentData={commentData} /> */}
      </div>
    </>
  );
};

export default App;
