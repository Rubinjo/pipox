import User from "../../models/user";

export const NEW_USER = "NEW_USER";

export const newUser = () => {
  const role = "user";
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-pipox-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
        }),
      }
    );

    const resData = await response.json();

    console.log(resData.name);

    dispatch({
      type: NEW_USER,
      user: {
        id: resData.name,
        role: role,
      },
    });
  };
};
