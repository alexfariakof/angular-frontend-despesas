export interface ILancamento {
  id: number;
  idDespesa: number;
  idReceita: number;
  data: string;
  tipoCategoria: string;
  categoria: string;
  descricao: string;
  valor: number;
}
