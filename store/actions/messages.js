import Message from "../../models/message";
import Reaction from "../../models/reaction";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGE = "SET_MESSAGE";
export const ADD_REACTION = "ADD_REACTION";
export const UPDATE_LIKES = "UPDATE_LIKES";
export const UPDATE_DISLIKES = "UPDATE_DISLIKES";

export const fetchMessages = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/messages.json"
    );
    const resData = await response.json();
    const loadedMessages = [];
    for (const key in resData) {
      loadedMessages.push(
        new Message(
          key,
          resData[key].userId,
          resData[key].text,
          resData[key].time,
          resData[key].date,
          resData[key].likes,
          resData[key].dislikes,
          resData[key].reactions
        )
      );
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

export const updateLikes = (id, likes, add) => {
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
      type: UPDATE_LIKES,
      message: {
        id: id,
        likes: likes,
      },
    });
  };
};

export const updateDislikes = (id, dislikes, add) => {
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
      type: UPDATE_DISLIKES,
      message: {
        id: id,
        dislikes: dislikes,
      },
    });
  };
};
