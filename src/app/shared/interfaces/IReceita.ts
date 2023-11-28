import { Dayjs } from "dayjs";

export interface IReceita {
  id: number | null;
  idUsuario: number;
  idCategoria: number | string;
  categoria: string;
  data: Dayjs | string | null;
  descricao: string;
  valor: number ;
}
