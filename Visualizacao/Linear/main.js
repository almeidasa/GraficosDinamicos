window.onload = function()
{
  var limitesZ = [20, 40, 60, 80, 100];

  crieGraficoLinear(limitesZ);
};

function crieGraficoLinear(limitesZ)
{
    var grafico = $(".grafico-linear");    
    var larguraBloco = 100 / (limitesZ.length - 1);

    grafico.append(blocoGraficoLinear(0, 0, limitesZ[0]));

    for(var i=1; i < limitesZ.length; i++) {
        grafico.append(blocoGraficoLinear(i, larguraBloco, limitesZ[i]));
    }
}

function blocoGraficoLinear(id, larguraBloco, valorz) {
  $(".grafico-linear").on("click", "#bl" + id + "", function (evt) {
    if(evt.currentTarget.dataset.clicado == "true") {
      evt.currentTarget.dataset.clicado = false;
      $(evt.currentTarget).removeClass('clicado');
      $(evt.currentTarget).children("span").remove();
    } else {
      evt.currentTarget.dataset.clicado = true
      $(evt.currentTarget).addClass('clicado');
      $(evt.currentTarget).append("<span>("+ evt.currentTarget.dataset.bloco +")</span>")
    }
  });
  
  return "<div class='bloco-linear' data-bloco='" + id + "' data-valorz='" + valorz + "' data-clicado='false'" +
      "style='width: " + larguraBloco + "%;" + (id == 0 ? " border: none;'" : "'") + 
         "id='bl" + id + "'><div class='grafico-linear-legenda'>" + valorz.toFixed(2) + "</div></div>";
};

function obtenhaTamanhoDoBloco(valorAtual, valorMaximo, porcentagemPreenchida, iniciaComZero, valorInicial) {
  if(valorAtual == valorMaximo) {
    return Math.ceil(Math.abs(100 - porcentagemPreenchida));
  }

  if (!iniciaComZero) {
    valorAtual = valorAtual - valorInicial;
  }
    
  var porcentagemAtual = (valorAtual / (iniciaComZero ? valorMaximo : (valorMaximo + 1))) * 100;

  return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}

