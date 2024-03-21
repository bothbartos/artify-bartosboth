import Comment from "./Comment"
import NewComment from "./NewComment"

export default function Comments({ artwork, userId, refresh}) {
  return <>
    <div className="Comments">
      {userId && <NewComment userId={userId} parentId={artwork._id} refreshComments={refresh}/>}
      {artwork.comments.map(comment => <Comment 
        key={comment._id}
        comment={comment}
        userId={userId}
        refreshComments={refresh}
        />)}
    </div>
  </>
}
