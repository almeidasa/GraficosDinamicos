window.onload = function()
{
  var limitesX = [20, 40, 60, 80, 100];
  var limitesY = [20, 40, 60, 80, 100];

  crieGraficoQuadrante(limitesX, limitesY);
};

function crieGraficoQuadrante(limitesX, limitesY) {
    var grafico = $(".grafico-quadrante");
    var larguraBloco = 100 / (limitesX.length - 1);
    var alturaBloco = 100 / (limitesY.length - 1);
    grafico.append("<div class='legenda-eixoy'></div>")

    for (var y = limitesY.length; y > 1; y--) {
        var idEixoX = "eixox" + y;
        grafico.append("<div style='height:" + alturaBloco + "%' data-valory='" + limitesY[y-1].toFixed(2) + "' class='grafico-quadrante-linha' id='" + idEixoX + "'>" +
            "</div>");

        for (var x = 1; x < limitesX.length; x++) {
            $("#" + idEixoX).append(blocoGraficoQuadrante(x, y-1, limitesX[x], limitesY[y-1], larguraBloco));
        }
    }
}

function blocoGraficoQuadrante(x, y, valorx, valory, larguraBloco) {
  var id = x.toString() + y.toString()

  $(".grafico-quadrante").on("click", "#bl" + id + "", function (evt) {
    if(evt.currentTarget.dataset.clicado == "true") {
        evt.currentTarget.dataset.clicado = false;
        $(evt.currentTarget).removeClass('clicado');
        $(evt.currentTarget).children("span").remove();
    } else {
        evt.currentTarget.dataset.clicado = true
        $(evt.currentTarget).addClass('clicado');
        $(evt.currentTarget).append("<span>(" + evt.currentTarget.dataset.eixox + "," + evt.currentTarget.dataset.eixoy +")</span>")
    }
  });
  
    return "<div class='bloco-quadrante' data-bloco='" + id + "' data-eixox='" + x + "' data-eixoy='" + y + "' data-valory='" +
            valory + "' data-valorx='" + valorx + "' data-clicado='false' style='width: " + larguraBloco + "%' id='bl" + id + "'></div>";
};

