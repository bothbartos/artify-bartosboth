import { useState } from "react";
import NewComment from "./NewComment";

export default function Comment({ comment, userId, refreshComments}) {
  const [displayReplies, setDisplayReplies] = useState(false);
  const [displayBox, setDisplayBox] = useState(false);
  const [replies, setReplies] = useState(null);

  function handleShowReplies(ids) {
    setDisplayReplies(true);
    if (replies) return;
    const params = new URLSearchParams();
    if (ids?.length) params.append('ids', ids);
    return fetch(`/api/comments?${params}`)
    .then(res => res.json())
    .then(setReplies);
  }

  return <div className="Comment">
    <p className="commentAuthor">{comment.author.username}</p>
    <p className="commentBody">{comment.text}</p>
    {userId && <>
      <button onClick={() => setDisplayBox(true)}>Reply</button>
      {displayBox && <>
        <NewComment userId={userId} parentId={comment._id} isReply refreshComments={refreshComments}/>
      </>}
    </>}
    {(comment?.replies?.length > 0) 
    ? (displayReplies
      ? <>
        <button onClick={() => setDisplayReplies(false)}>Hide replies</button>
        <div className="replies">
          {replies && replies.map(reply => <Comment
            key={reply._id}
            comment={reply}
            userId={userId}
            refreshComments={refreshComments}/>)}
        </div>
      </>
      : <>
        <button onClick={() => handleShowReplies(comment.replies)}>Show replies</button>
      </>)
    : <p>no replies</p>}
  </div>
}