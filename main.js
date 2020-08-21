window.onload = function()
{
  var listaDeItensLinear = [
    {
      valory: 2.83,
      cor: '#6CC4ED'
    }
  ];

  var LimitesZ = [1, 1.9, 2.5, 3.5, 4];

  crieGraficoLinear(LimitesZ);
};

function crieGraficoLinear(LimitesZ)
{
    var grafico = $(".grafico-linear");    
    var valorMaximo = LimitesZ[LimitesZ.length-1];
    var iniciaComZero = LimitesZ[0] == 0;
    var porcentagemPreenchida = 0;

    grafico.append(blocoQuadranteLinear(0, 0, LimitesZ[0]));

    for(var i=1; i < LimitesZ.length; i++) {
      var tamanho = ObtenhaTamanhoDoBloco(LimitesZ[i], valorMaximo, porcentagemPreenchida, iniciaComZero);
      porcentagemPreenchida += tamanho;
      grafico.append(blocoQuadranteLinear(i, tamanho, LimitesZ[i]));
    }
}

var blocoQuadranteLinear = function (id, tamanho, valory) {
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
  
  var retorno = "<div class='bloco-quadrante' data-bloco='" + id + "' data-valory='" + valory + "' data-clicado='false'" +
          "style='width: " + tamanho + "%;" + (id == 0 ? " border: none;'" : "'") + 
          "id='bl" + id + "'><div class='grafico-linear-legenda'>" + valory.toFixed(2) + "</div></div>";
          return retorno;
};

function ObtenhaTamanhoDoBloco(valorAtual, valorMaximo, porcentagemPreenchida, iniciaComZero) {
  if(valorAtual == valorMaximo) {
    return Math.ceil(Math.abs(100 - porcentagemPreenchida));
  }
  
  var porcentagemAtual = (valorAtual / (iniciaComZero ? valorMaximo : (valorMaximo + 1))) * 100;

    return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}