export default interface IGame {
  _id: string;
  user: string;
  name: string;
  description: string;
  simplyGameplay: string;
  audience: string;
  knowledgeField: string;
  requirements: string;
  minNumberPlayers: number;
  maxNumberPlayers: number;
  authors: string[];
}
