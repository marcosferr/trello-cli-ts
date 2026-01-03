export interface Board {
  id: string;
  name: string;
  desc?: string;
  url: string;
  closed?: boolean;
}

export interface TrelloList {
  id: string;
  name: string;
  idBoard: string;
  closed?: boolean;
  pos?: number;
}

export interface Card {
  id: string;
  name: string;
  desc?: string;
  idList: string;
  idBoard: string;
  due?: string | null;
  dueComplete?: boolean;
  url?: string;
  labels?: Label[];
  idMembers?: string[];
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  date: string;
  data: {
    text: string;
  };
  memberCreator: {
    id: string;
    fullName: string;
    username: string;
  };
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  bytes?: number;
  date: string;
  mimeType?: string;
  isUpload: boolean;
}

export interface Member {
  id: string;
  fullName: string;
  username: string;
}
