import { Dayjs } from "dayjs";

export interface IDespesa {
  id:number;
  idUsuario: number;
  idCategoria: number;
  data: Dayjs | null;
  descricao: String;
  valor: number;
  dataVencimento: Dayjs | null;
}
