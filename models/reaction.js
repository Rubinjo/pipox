class Reaction {
  constructor(id, userId, text, time, date, likes, dislikes) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.time = time;
    this.date = date;
    this.likes = likes;
    this.dislikes = dislikes;
  }
}

export default Reaction;
