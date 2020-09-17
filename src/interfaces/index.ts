export interface IToastMessage {
  id: string;
  type: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

export interface IInvitation {
  id: string;
  emailTo: string;
  projectId: string;
  userId: string;
  acceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  inviter?: IUser;
  project?: IProject;
}

export interface IFiile {
  id: string;
  name: string;
  type: 'IMAGE' | 'VIDEO' | 'PDF' | 'DOC' | 'ANY';
  url: string;
  userId: string;
}

export interface IPhoto {
  id: string;
  filename: string;
  url: string;
  userId: string;
}

export interface IUser {
  id: string;
  name?: string;
  email: string;
  password?: string;
  updatedAt?: string;
  photo?: IPhoto;
}

export interface IParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: IPhoto;
}

export interface IProject {
  id: string;
  name: string;
  owner?: Omit<Omit<IUser, 'password'>, 'updatedAt'>;
  participants?: IParticipant[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  startedAt: string;
  formatedStartedAt?: string;
  deadlineAt?: string;
  formatedDeadlineAt?: string;
  completedAt?: string;
  formatedCompletedAt?: string;
  updatedAt: string;
  createdAt: string;
  status: string;
  projectId: string;
  userId: string;
  order: number;
  ownerId: string;
  owner: Omit<Omit<IUser, 'password'>, 'updatedAt'>;
  fiiles: IFiile[];
}

export interface IListTask {
  id: string;
  title: string;
  creatable: boolean;
  cards: ITask[];
}

export interface IStep {
  id: string;
  title: string;
  description: string;
  startedAt: string;
  completedAt?: string;
  updatedAt: string;
  createdAt: string;
  taskId: string;
  userId: string;
  order: number;
  ownerId: string;
}
