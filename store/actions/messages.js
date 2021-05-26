import Message from "../../models/message";
import Reaction from "../../models/reaction";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGE = "SET_MESSAGE";
export const ADD_REACTION = "ADD_REACTION";
export const UPDATE_LIKES_MESSAGE = "UPDATE_LIKES_MESSAGE";
export const UPDATE_DISLIKES_MESSAGE = "UPDATE_DISLIKES_MESSAGE";
export const UPDATE_LIKES_REACTION = "UPDATE_LIKES_REACTION";
export const UPDATE_DISLIKES_REACTION = "UPDATE_DISLIKES_REACTION";

export const fetchMessagesFirst = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages.json"
    );
    const resData = await response.json();
    const loadedMessages = [];
    let loadedReactions = [];
    for (const key in resData) {
      for (const reaction in resData[key].reactions) {
        loadedReactions.push(
          new Reaction(
            reaction,
            resData[key].reactions[reaction].userId,
            resData[key].reactions[reaction].text,
            resData[key].reactions[reaction].time,
            resData[key].reactions[reaction].date,
            resData[key].reactions[reaction].likes,
            resData[key].reactions[reaction].dislikes,
            false,
            false
          )
        );
      }
      loadedMessages.push(
        new Message(
          key,
          resData[key].userId,
          resData[key].text,
          resData[key].time,
          resData[key].date,
          resData[key].likes,
          resData[key].dislikes,
          loadedReactions,
          false,
          false
        )
      );
      loadedReactions = [];
    }

    dispatch({ type: SET_MESSAGE, messages: loadedMessages });
  };
};

export const fetchMessages = (messages) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages.json"
    );
    const resData = await response.json();
    const loadedMessages = [];
    let loadedReactions = [];
    let likeActivatedReaction = false;
    let dislikeActivatedReaction = false;
    let likeActivatedMessage = false;
    let dislikeActivatedMessage = false;
    for (const key in resData) {
      const messageIndex = messages.findIndex((message) => message.id === key);
      for (const reactionKey in resData[key].reactions) {
        console.log(key);
        try {
          const reactionIndex = messages[messageIndex].reactions.findIndex(
            (reaction) => reaction.id === reactionKey
          );
          likeActivatedReaction =
            messages[messageIndex].reactions[reactionIndex].likeActivated;
          dislikeActivatedReaction =
            messages[messageIndex].reactions[reactionIndex].likeActivated;
        } catch {
          likeActivatedReaction = false;
          dislikeActivatedReaction = false;
        }
        loadedReactions.push(
          new Reaction(
            reactionKey,
            resData[key].reactions[reactionKey].userId,
            resData[key].reactions[reactionKey].text,
            resData[key].reactions[reactionKey].time,
            resData[key].reactions[reactionKey].date,
            resData[key].reactions[reactionKey].likes,
            resData[key].reactions[reactionKey].dislikes,
            likeActivatedReaction,
            dislikeActivatedReaction
          )
        );
      }
      try {
        likeActivatedMessage = messages[messageIndex].likeActivated;
        dislikeActivatedMessage = messages[messageIndex].dislikeActivated;
      } catch {
        likeActivatedMessage = false;
        dislikeActivatedMessage = false;
      }
      loadedMessages.push(
        new Message(
          key,
          resData[key].userId,
          resData[key].text,
          resData[key].time,
          resData[key].date,
          resData[key].likes,
          resData[key].dislikes,
          loadedReactions,
          likeActivatedMessage,
          dislikeActivatedMessage
        )
      );
      loadedReactions = [];
    }

    dispatch({ type: SET_MESSAGE, messages: loadedMessages });
  };
};

export const addMessage = (userId, text) => {
  const today = new Date();
  const min = String(today.getMinutes()).padStart(2, "0");
  const hh = String(today.getHours()).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
  const yyyy = today.getFullYear();
  const time = hh + ":" + min;
  const date = dd + "/" + mm + "/" + yyyy;
  const likes = 0;
  const dislikes = 0;
  const reactions = [];

  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          text,
          time,
          date,
          likes,
          dislikes,
          reactions,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: ADD_MESSAGE,
      message: {
        id: resData.name,
        userId: userId,
        text: text,
        time: time,
        date: date,
        likes: likes,
        dislikes: dislikes,
        reactions: reactions,
      },
    });
  };
};

export const addReaction = (id, userId, text) => {
  const today = new Date();
  const min = String(today.getMinutes()).padStart(2, "0");
  const hh = String(today.getHours()).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
  const yyyy = today.getFullYear();
  const time = hh + ":" + min;
  const date = dd + "/" + mm + "/" + yyyy;
  const likes = 0;
  const dislikes = 0;

  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages/" +
        id +
        "/reactions.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          text,
          time,
          date,
          likes,
          dislikes,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: ADD_REACTION,
      reaction: {
        messageId: id,
        id: resData.name,
        userId: userId,
        text: text,
        time: time,
        date: date,
        likes: likes,
        dislikes: dislikes,
      },
    });
  };
};

export const updateLikesMessage = (id, likes, add) => {
  if (add === true) {
    likes += 1;
  } else {
    likes -= 1;
  }
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages/" +
        id +
        ".json",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: UPDATE_LIKES_MESSAGE,
      message: {
        id: id,
        likes: likes,
        likeActivated: add,
      },
    });
  };
};

export const updateDislikesMessage = (id, dislikes, add) => {
  if (add === true) {
    dislikes += 1;
  } else {
    dislikes -= 1;
  }
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages/" +
        id +
        ".json",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dislikes,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: UPDATE_DISLIKES_MESSAGE,
      message: {
        id: id,
        dislikes: dislikes,
        dislikeActivated: add,
      },
    });
  };
};

export const updateLikesReaction = (messageId, id, likes, add) => {
  if (add === true) {
    likes += 1;
  } else {
    likes -= 1;
  }
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages/" +
        messageId +
        "/reactions/" +
        id +
        ".json",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: UPDATE_LIKES_REACTION,
      reaction: {
        messageId: messageId,
        id: id,
        likes: likes,
        likeActivated: add,
      },
    });
  };
};

export const updateDislikesReaction = (messageId, id, dislikes, add) => {
  if (add === true) {
    dislikes += 1;
  } else {
    dislikes -= 1;
  }
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages/" +
        messageId +
        "/reactions/" +
        id +
        ".json",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dislikes,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: UPDATE_DISLIKES_REACTION,
      reaction: {
        messageId: messageId,
        id: id,
        dislikes: dislikes,
        dislikeActivated: add,
      },
    });
  };
};
