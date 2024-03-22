import { useState } from "react";

export default function NewComment({userId, parentId, isReply=false, refreshComments, onCancel}) {
  const [text, setText] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const url = isReply
    ? `/api/comments/${parentId}/reply`
    : `/api/artworks/${parentId}/comment`;
    await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        userId,
        parentId,
        text,
      }),
    });
    refreshComments();
  }
  return <>
    <form className="NewComment" onSubmit={handleSubmit}>
      <textarea name="text" id={`comment-${parentId}`} onChange={e => setText(e.target.value)}></textarea>
      <div className="buttons">
        <button type="submit">Post</button>
        {isReply && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  </>
}