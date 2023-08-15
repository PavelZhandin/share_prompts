export type Prompt = {
  _id: string | number;
  creator: string;
  prompt: string;
  tag: string;
};

export type Post = {
  creator: {
    email: string;
    image: string;
    username: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  _id: string;
};
