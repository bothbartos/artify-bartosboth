import { useState } from "react";
import NewComment from "./NewComment";

export default function Comment({ comment, userId, refreshComments}) {
  const [displayBox, setDisplayBox] = useState(false);
  const [replies, setReplies] = useState(null);
  const [isExpanded, setExpanded] = useState(false);

  function handleShowReplies(ids) {
    setExpanded(true);
    if (replies) return;
    const params = new URLSearchParams();
    if (ids?.length) params.append('ids', ids);
    return fetch(`/api/comments?${params}`)
    .then(res => res.json())
    .then(setReplies);
  }

  return <div className="Comment">
    <div className="header">
      <p className="author">{comment.author.username}</p>
    </div>
    <div className="body">
      <p>{comment.text}</p>
      {userId && <>
        <button onClick={() => setDisplayBox(true)}>Reply</button>
        {displayBox && <>
          <NewComment userId={userId} parentId={comment._id} isReply refreshComments={refreshComments}/>
        </>}
      </>}
    </div>
    <div className="footer">
      {(comment?.replies?.length > 0) 
      ? (isExpanded
        ? <>
          <button onClick={() => setExpanded(false)}></button>
          <div className="replies">
            {replies && replies.map(reply => <Comment
              key={reply._id}
              comment={reply}
              userId={userId}
              refreshComments={refreshComments}
              />)}
          </div>
        </>
        : <>
          <button onClick={() => handleShowReplies(comment.replies)}>Show replies</button>
        </>)
      : <p>no replies</p>}
    </div>
  </div>
}