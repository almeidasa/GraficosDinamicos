window.onload = function()
{
    var limitesZ = [1, 1.9, 2.5, 3.3, 4];
    var lim = [20, 40, 60, 80, 100];

    crieGraficoLinear(limitesZ);
};

function crieGraficoLinear(limitesZ)
{
    var grafico = $(".grafico-linear");    
    var valorMaximo = limitesZ[limitesZ.length - 1];
    var porcentagemPreenchida = 0;

    grafico.append(blocoGraficoLinear(0, 0, limitesZ[0]));

    for (var i = 1; i < limitesZ.length; i++) {
        var tamanho = obtenhaTamanhoDoBloco(limitesZ[i], valorMaximo, porcentagemPreenchida, limitesZ[0]);
        porcentagemPreenchida += tamanho;
        grafico.append(blocoGraficoLinear(i, tamanho, limitesZ[i]));
    }
}

function blocoGraficoLinear(id, larguraBloco, valorz) { 
  return "<div class='bloco-linear' data-bloco='" + id + "' data-valorz='" + valorz + "' data-clicado='false'" +
      "style='width: " + larguraBloco + "%;" + (id == 0 ? " border: none;'" : "'") + 
         "id='bl" + id + "'><div class='grafico-linear-legenda'>" + valorz.toFixed(2) + "</div></div>";
};

function obtenhaTamanhoDoBloco(valorAtual, valorMaximo, porcentagemPreenchida, valorInicial) {
  if(valorAtual == valorMaximo) {
    return Math.ceil(Math.abs(100 - porcentagemPreenchida));
  }

  var porcentagemAtual = Math.abs(Math.abs(valorAtual - valorInicial) / Math.abs(valorMaximo - valorInicial)) * 100;

  return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}

