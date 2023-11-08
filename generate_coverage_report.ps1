param(
    [switch]$w,
    [switch]$d
)

# Pasta onde o relatório será gerado
$reportPath = ".\coverage\lcov-report"

if ($w) {
  npm run test:coverage
   # Encontra o diretório mais recente se for existente
  $latestDir = Get-ChildItem -Directory -Path $reportPath | Sort-Object LastWriteTime -Descending | Select-Object -First 1

  # Verifica se encontrou um diretório e, em caso afirmativo, obtém o nome do diretório (GUID)
  if ($latestDir -ne $null) {
    # Abre a página index.html no navegador padrão do sistema operacional
    Invoke-Item $reportPath\index.html
    # Executa os testes unitários e gera Relatório Coverage em modo de observação
    npm run test:watch
  }
}
else {
  if ($d) {
    # Executa os testes unitários em modo de observação no Chrome com karma
    npm run test:debug
  }
  else {
    # Executa os testes unitários
    npm run test
  }
}
