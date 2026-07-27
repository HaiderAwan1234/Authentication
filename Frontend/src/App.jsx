import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import Show from "./Show";

const App = () => {
  const [commentData, setCommentData] = useState([]);

  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const sendHandler = () => {
    setCommentData([
      ...commentData,
      {
        comment: comment,
      },
    ]);

    setComment("");
  };

  useEffect(() => {
    console.log(commentData);
  }, [commentData]);

  return (
    <>
      <div className="MAIN">
        <div className="main">
          <div className="div">HELLO WELCOME TO REACT</div>

          <div className="input-main">
            <input
              name="comment"
              value={comment}
              onChange={handleChange}
              placeholder="Write comment..."
              className="input"
            />

            <button disabled={!comment} className="send" onClick={sendHandler}>
              <IoSend />
            </button>
          </div>
        </div>

        <Show commentData={commentData} />
      </div>
    </>
  );
};

export default App;
