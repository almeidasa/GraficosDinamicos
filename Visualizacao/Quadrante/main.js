window.onload = function()
{
    var lista = {
    "LimitesX": [1, 1.9, 2.5, 3.3, 4],
    "LimitesY": [1, 2, 2.5, 3, 4],
    "TituloEixoX": "Metas (Eixo X)",
    "TituloEixoY": "Competências (Eixo Y)",
    "Valores": 
    [
      {
        "NotaX": 1,
        "NotaY": 4,
        "Descricao": "Auto",
        "Cor": "#6CC4ED"
      },
      {
        "NotaX": 1,
        "NotaY": 1,
        "Descricao": "Gestor",
        "Cor": "#6AB78F"
        },
        {
            "NotaX": 4,
            "NotaY": 4,
            "Descricao": "Auto",
            "Cor": "#E45750"
        },
        {
        "NotaX": 4,
        "NotaY": 1,
        "Descricao": "Gestor",
            "Cor": "#33CC00"
        },
        {
            "NotaX": 2.5,
            "NotaY": 2.5,
            "Descricao": "Auto",
            "Cor": "#B3EE3A"
        },
        {
        "NotaX": 1.9,
        "NotaY": 3.3,
        "Descricao": "Gestor",
        "Cor": "#4682B4"
        },
        {
            "NotaX": 2.5,
            "NotaY": 3.9,
            "Descricao": "Gestor",
            "Cor": "#E9007B"
        },
        {
            "NotaX": 2.2,
            "NotaY": 1.6,
            "Descricao": "Gestor",
            "Cor": "#B24808"
        },
        {
            "NotaX": 3.9,
            "NotaY": 2.3,
            "Descricao": "Gestor",
            "Cor": "#FFFF00"
        }
    ]
};

  crieGraficoQuadrante(lista);
};

function crieGraficoQuadrante(lista) {
    var grafico = $(".grafico-quadrante");
    grafico.append("<div class='legenda-eixoy'></div>");
    var legenda = $(".legenda-eixoy");

    var limitesX = lista.LimitesX;
    var limitesY = lista.LimitesY;

    var valorMaximoX = limitesX[limitesX.length - 1];
    var valorMinimoX = limitesX[0];
    var valorMaximoY = limitesY[limitesY.length - 1];
    var valorMinimoY = limitesY[0];

    var conteiner = $(".grafico-quadrante-container");
    conteiner.attr("data-titulo-eixo-x", lista.TituloEixoX);
    conteiner.attr("data-titulo-eixo-y", lista.TituloEixoY);

    var porcentagemPreenchidaY = 0;

    for (var y = limitesY.length; y > 1; y--) {
        var idEixoX = "eixox" + (y - 1);
        var tamanhoEixoY = obtenhaTamanhoDoBlocoY(limitesY[y - 2], valorMinimoY, porcentagemPreenchidaY, valorMaximoY);
        porcentagemPreenchidaY += tamanhoEixoY;

        grafico.append("<div style='height:" + tamanhoEixoY + "%' data-valory='" + limitesY[y-1].toFixed(2) + "' class='grafico-quadrante-linha' id='" + idEixoX + "'>" +
            "</div>");

        legenda.append("<div class='item-legenda-eixoy' style='height:" + tamanhoEixoY + "%'>" + limitesY[y - 1].toFixed(2) + "</div>");

        if (y == 2) {
            $("#" + idEixoX).append("<div class='item-legenda-eixox' style='height: 25%'>" + limitesX[0].toFixed(2) + "</div>");
        }

        var porcentagemPreenchidaX = 0;
        for (var x = 1; x < limitesX.length; x++) {
            var tamanhoEixoX = obtenhaTamanhoDoBlocoX(limitesX[x], valorMaximoX, porcentagemPreenchidaX, valorMinimoX);
            porcentagemPreenchidaX += tamanhoEixoX;
            $("#" + idEixoX).append(blocoGraficoQuadrante(x, y - 1, limitesX[x], limitesY[y - 1], tamanhoEixoX));

            if (y == 2) {
                $("#" + idEixoX).append("<div class='item-legenda-eixox' style='height: 25%'>" + limitesX[x].toFixed(2) + "</div>");
            }
        }
    }

    legenda.append("<div class='item-legenda-eixoy' style='height:" + (100 / (limitesY.length - 1)) + "%'>" + limitesY[0].toFixed(2) + "</div>");

    var valores = lista.Valores;

    for (var i = 0; i < valores.length; i++) {
        var classe = "grafico-valor";

        var posicaoX = (obtenhaTamanhoDoBlocoX(valores[i].NotaX, limitesX[limitesX.length - 1], 0, limitesX[0]) - 3);
        var posicaoY = (obtenhaTamanhoDoBlocoX(valores[i].NotaY, limitesY[limitesY.length - 1], 0, limitesY[0]) - 3);

        grafico.append("<div class='" + classe + "' data-descricao='" + valores[i].Descricao + "' data-nota-y='" + valores[i].NotaY + "' data-nota-x='" + valores[i].NotaX + "'" +
            "style='left:" + posicaoX + "%; bottom:" + posicaoY + "%; background-color:" + valores[i].Cor + ";'></div>");
    }
}

function blocoGraficoQuadrante(x, y, valorx, valory, larguraBloco) {
   var id = x.toString() + y.toString()

   return "<div class='bloco-quadrante' data-bloco='" + id + "' data-eixox='" + x + "' data-eixoy='" + y + "' data-valory='" +
            valory + "' data-valorx='" + valorx + "' data-clicado='false' style='width: " + larguraBloco + "%' id='bl" + id + "'></div>";
};

function obtenhaTamanhoDoBlocoX(valorAtual, valorMaximo, porcentagemPreenchida, valorMinimo) {
    if (valorAtual == valorMaximo) {
        return Math.ceil(Math.abs(100 - porcentagemPreenchida));
    }

    var porcentagemAtual = Math.abs(Math.abs(valorAtual - valorMinimo) / Math.abs(valorMaximo - valorMinimo)) * 100;

    return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}

function obtenhaTamanhoDoBlocoY(valorAtual, valorMaximo, porcentagemPreenchida, valorMinimo) {
    if (valorAtual == valorMaximo) {
        return Math.ceil(Math.abs(100 - porcentagemPreenchida));
    }

    var porcentagemAtual = Math.abs(Math.abs(valorAtual - valorMinimo) / Math.abs(valorMaximo - valorMinimo)) * 100;

    return Math.ceil(Math.abs(porcentagemAtual - porcentagemPreenchida));
}
