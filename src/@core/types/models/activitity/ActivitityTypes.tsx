
export type Activity = {
  id: number;
  idTask: number;
  idUser: number;
  createdDate: string;

}

export type GetActivityDto = {
  id: number;
  idUser: number;
  createdDate: string;
  content: string
  type: string
}
