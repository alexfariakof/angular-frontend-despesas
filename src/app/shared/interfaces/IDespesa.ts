import { Dayjs } from "dayjs";

export interface IDespesa {
  id: number | null;
  idUsuario: number;
  idCategoria: number | string;
  categoria: string;
  data: Dayjs | string | null;
  descricao: string;
  valor: number ;
  dataVencimento: Dayjs | string | null;
}
