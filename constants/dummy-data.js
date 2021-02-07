import Message from "../models/message";
import Reaction from "../models/reaction";

export const MESSAGES = [
  new Message(
    "m1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "11:58",
    "06/02/2021",
    1,
    0,
    []
  ),
  new Message(
    "m2",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "11:49",
    "06/02/2021",
    1,
    1,
    [
      new Reaction(
        "r1",
        "Lorem ipsum dolor sit amet.",
        "11:52",
        "06/02/2021",
        0,
        0
      ),
    ]
  ),
];
