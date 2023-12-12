import { Dayjs } from "dayjs";

export interface IDespesa {
  id: number | null;
  idCategoria: number | string;
  categoria: string;
  data: Dayjs | string | null;
  descricao: string;
  valor: number;
  dataVencimento: Dayjs | string | null;
}
