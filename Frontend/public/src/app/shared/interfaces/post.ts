export interface PostModel {
  title: string;
  description: string;
  images: string[];
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: string[];
  comments: CommentModel[];
}

export interface CommentModel {
  id: string;
  text: string;
  commentedAt: Date;
  replies: ReplyModel[];
}

export interface ReplyModel {
  id: string;
  text: string;
  repliedAt: Date;
  replies: ReplyModel[];
}
