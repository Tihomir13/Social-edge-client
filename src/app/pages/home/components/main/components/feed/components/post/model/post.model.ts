export interface AuthorModel {
  id: string;
  username: string;
}

export interface CommentsModel {
  author: AuthorModel;
  likes: string[];
  replies: any;
  text: string;
}

export interface imagePostModel {
  src: string;
  contentType: string;
}

export interface PostModel {
  author: AuthorModel;
  title: string;
  text: string;
  images: imagePostModel[];
  tags: string[];
  comments: CommentsModel[];
  createdAt: string;
  updatedAt: string;
}
