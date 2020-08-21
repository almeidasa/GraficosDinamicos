window.onload = function()
{
  var limitesZ = [1, 1.9, 2.5, 3.5, 4];

  crieGraficoLinear(limitesZ);
};

function crieGraficoLinear(limitesZ)
{
    var grafico = $(".grafico-linear");    
    var valorMaximo = limitesZ[limitesZ.length-1];
    var iniciaComZero = limitesZ[0] == 0;
    var porcentagemPreenchida = 0;

    grafico.append(blocoGraficoLinear(0, 0, limitesZ[0]));

    for(var i=1; i < limitesZ.length; i++) {
      var tamanho = obtenhaTamanhoDoBloco(limitesZ[i], valorMaximo, porcentagemPreenchida, iniciaComZero);
      porcentagemPreenchida += tamanho;
      grafico.append(blocoGraficoLinear(i, tamanho, limitesZ[i]));
    }
}

function blocoGraficoLinear(id, tamanho, valory) {
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
  
  var retorno = "<div class='bloco-linear' data-bloco='" + id + "' data-valory='" + valory + "' data-clicado='false'" +
          "style='width: " + tamanho + "%;" + (id == 0 ? " border: none;'" : "'") + 
          "id='bl" + id + "'><div class='grafico-linear-legenda'>" + valory.toFixed(2) + "</div></div>";
          return retorno;
};

function obtenhaTamanhoDoBloco(valorAtual, valorMaximo, porcentagemPreenchida, iniciaComZero) {
  if(valorAtual == valorMaximo) {
    return Math.ceil(Math.abs(100 - porcentagemPreenchida));
  }
  
  var porcentagemAtual = (valorAtual / (iniciaComZero ? valorMaximo : (valorMaximo + 1))) * 100;

  return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}

