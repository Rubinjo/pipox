class Message {
  constructor(
    id,
    userId,
    text,
    time,
    date,
    likes,
    dislikes,
    reactions,
    likeActivated,
    dislikeActivated
  ) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.time = time;
    this.date = date;
    this.likes = likes;
    this.dislikes = dislikes;
    this.reactions = reactions;
    this.likeActivated = likeActivated;
    this.dislikeActivated = dislikeActivated;
  }
}

export default Message;
