window.onload = function()
{
    var lista = {
        "LimitesZ": [1, 1.9, 2.5, 3.5, 4],
        "TituloEixoZ": "Metas e competências (Eixo Z)",
        "ValoresZ": [
            {
                "Valor": 1.9,
                "Descricao": "Auto",
                "Cor": "#6CC4ED"
            },
            {
                "Valor": 1,
                "Descricao": "Gestor",
                "Cor": "#6AB78F"
            },
            {
                "Valor": 4,
                "Descricao": "Pares",
                "Cor": "#F9F28C"
            }
        ]
    };

    crieGraficoLinear(lista);
};

function crieGraficoLinear(lista)
{
    var grafico = $(".grafico-linear");
    var conteiner = $(".grafico-linear-container");
    conteiner.attr("data-titulo-eixo-y", lista.TituloEixoZ);

    var limitesZ = lista.LimitesZ;
    var valoresZ = lista.ValoresZ;

    var valorMaximo = limitesZ[limitesZ.length - 1];
    var valorMinimo = limitesZ[0];
    var porcentagemPreenchida = 0;

    grafico.append(blocoGraficoLinear(0, 0, valorMinimo));

    for (var i = 1; i < limitesZ.length; i++) {
        var tamanho = obtenhaTamanhoDoBloco(limitesZ[i], valorMaximo, porcentagemPreenchida, valorMinimo);
        porcentagemPreenchida += tamanho;
        grafico.append(blocoGraficoLinear(i, tamanho, limitesZ[i]));
    }

    for (var i = 0; i < valoresZ.length; i++) {
        var posicao = (obtenhaTamanhoDoBloco(valoresZ[i].Valor, valorMaximo, 0, valorMinimo)-2);
        grafico.append("<div class='grafico-valor' data-descricao='" + valoresZ[i].Descricao + "' data-valor='" + valoresZ[i].Valor + "'" +
            "style='left:" + posicao + "%; background-color:" + valoresZ[i].Cor + ";'></div>");
    }
}

function blocoGraficoLinear(id, larguraBloco, valorz) { 
  return "<div class='bloco-linear' data-bloco='" + id + "' data-valorz='" + valorz + "' data-clicado='false'" +
      "style='width: " + larguraBloco + "%;" + (id == 0 ? " border: none;'" : "'") + 
         "id='bl" + id + "'><div class='grafico-linear-legenda'>" + valorz.toFixed(2) + "</div></div>";
};

function obtenhaTamanhoDoBloco(valorAtual, valorMaximo, porcentagemPreenchida, valorMinimo) {
  if(valorAtual == valorMaximo) {
    return Math.ceil(Math.abs(100 - porcentagemPreenchida));
  }

  var porcentagemAtual = Math.abs(Math.abs(valorAtual - valorMinimo) / Math.abs(valorMaximo - valorMinimo)) * 100;

  return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}

