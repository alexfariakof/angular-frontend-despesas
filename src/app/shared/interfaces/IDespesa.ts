import { Dayjs } from "dayjs";

export interface IDespesa {
  id: number | null;
  idUsuario: number;
  idCategoria: number | string;
  data: Dayjs | string | null;
  descricao: String;
  valor: number ;
  dataVencimento: Dayjs | string | null;
}
