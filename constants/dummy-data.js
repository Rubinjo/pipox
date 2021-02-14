import Message from "../models/message";
import Reaction from "../models/reaction";

export const MESSAGES = [
  new Message(
    "m1",
    "u1",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "11:58",
    "06/02/21",
    1,
    0,
    [
      new Reaction(
        "r1",
        "u2",
        "Lorem ipsum dolor sit amet.",
        "12:52",
        "06/02/21",
        1,
        0
      ),
      new Reaction(
        "r2",
        "u3",
        "Nam aliquet tempor augue, non pharetra tellus convallis in. Praesent porta eros sed felis egestas, non auctor lectus commodo.",
        "12:54",
        "06/02/21",
        0,
        0
      ),
    ]
  ),
  new Message(
    "m2",
    "u2",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "11:49",
    "06/02/21",
    1,
    1,
    [
      new Reaction(
        "r3",
        "u3",
        "Nunc congue, eros nec fringilla porta, urna tortor lobortis purus, in facilisis risus dolor vitae libero.",
        "11:52",
        "06/02/21",
        0,
        0
      ),
    ]
  ),
  new Message(
    "m3",
    "u3",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis metus lacus, tempus vitae lectus id, lacinia pellentesque mi. Suspendisse non.",
    "10:00",
    "06/02/21",
    0,
    0,
    []
  ),
  new Message(
    "m4",
    "u4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pretium lobortis gravida. Vestibulum auctor metus id vestibulum laoreet. Nam cursus neque sit amet ipsum hendrerit, nec malesuada lectus placerat. Morbi tincidunt lacus vitae enim consectetur ultricies.",
    "08:39",
    "06/02/21",
    4,
    8,
    [
      new Reaction(
        "r4",
        "u5",
        "Pellentesque finibus libero ante, quis porttitor tortor fermentum quis. Vestibulum tincidunt fermentum dui, vel vulputate ipsum tincidunt sed.",
        "10:44",
        "06/02/21",
        6,
        0
      ),
    ]
  ),
  new Message(
    "m5",
    "u5",
    "Maecenas tristique volutpat turpis, vel efficitur quam pellentesque a. Fusce rutrum faucibus ante, egestas feugiat justo aliquet vel. Quisque scelerisque gravida lacinia.",
    "01:11",
    "06/02/21",
    20,
    1,
    [
      new Reaction("r5", "u6", "Nulla facilisi.", "03:11", "06/02/21", 10, 1),
      new Reaction(
        "r6",
        "u11",
        "Ut aliquet, magna a tristique commodo, felis massa efficitur metus, sed porttitor libero nisl eu orci.",
        "05:53",
        "06/02/21",
        10,
        1
      ),
      new Reaction(
        "r7",
        "u31",
        "Praesent vulputate ullamcorper enim ut consectetur.",
        "05:56",
        "06/02/21",
        10,
        1
      ),
      new Reaction(
        "r8",
        "u3",
        "Phasellus hendrerit magna id sem fermentum, non maximus massa molestie.",
        "16:12",
        "06/02/21",
        10,
        1
      ),
      new Reaction(
        "r9",
        "u10",
        "Proin blandit euismod massa nec condimentum. Donec scelerisque non dui et lacinia.",
        "22:22",
        "06/02/21",
        10,
        1
      ),
    ]
  ),
  new Message(
    "m6",
    "u6",
    "In auctor ex eu ex gravida aliquet. Phasellus vel lorem tempor, vulputate mi ac, consectetur nisl.",
    "21:11",
    "05/02/21",
    3,
    0,
    [
      new Reaction(
        "r10",
        "u3",
        "Curabitur tempor eros semper diam mattis, ac finibus ipsum rutrum.",
        "23:23",
        "05/02/21",
        0,
        0
      ),
    ]
  ),
  new Message(
    "m7",
    "u7",
    "Praesent fermentum ultrices diam. Vestibulum suscipit, ipsum ac sagittis ultrices, risus felis accumsan massa, a fringilla purus massa quis nisi. Donec sit amet mattis ex.",
    "18:14",
    "05/02/21",
    0,
    1,
    [
      new Reaction(
        "r11",
        "u3",
        "Quisque porta, ipsum eget dignissim vehicula, lectus magna fringilla nisi, id iaculis augue massa et metus. Etiam commodo sagittis aliquam. ",
        "11:52",
        "06/02/21",
        0,
        0
      ),
    ]
  ),
  new Message(
    "m8",
    "u8",
    "Praesent at condimentum nisi. Duis ut tellus sed velit feugiat consectetur. Nunc tincidunt mi sapien, a consectetur nunc fringilla nec. Integer tincidunt magna sit amet rhoncus mollis.",
    "10:54",
    "05/02/21",
    102,
    11,
    [
      new Reaction(
        "r12",
        "u3",
        "Quisque porta massa et dolor sagittis, in aliquam lorem ultrices. ",
        "11:52",
        "05/02/21",
        0,
        0
      ),
    ]
  ),
  new Message(
    "m9",
    "u1",
    "Vestibulum sagittis egestas commodo. Sed auctor imperdiet consequat.",
    "02:00",
    "05/02/21",
    3,
    1,
    []
  ),
];
