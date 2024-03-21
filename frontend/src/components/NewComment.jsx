import { useState } from "react";

export default function NewComment({userId, parentId, isReply=false, refreshComments}) {
  const [text, setText] = useState('');

  async function onSubmit(event) {
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
    <form className="NewComment" onSubmit={onSubmit}>
      <textarea name="text" id={`comment-${parentId}`} onChange={e => setText(e.target.value)}></textarea>
      <button type="submit">Post</button>
    </form>
  </>
}