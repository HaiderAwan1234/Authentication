import React from "react";

const Show = ({ commentData }) => {
  return (
    <>
      <div className="show">
        <div className="display">
          {/* Comment Box */}
          <div className="comment-box">
            <div className="top">
              <h2>Comments</h2>

              <div className="index">Total : {commentData.length}</div>
            </div>

            {commentData.map(
              (item, index) =>
                item.comment && (
                  <div key={index} className="container">
                    {item.comment}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
