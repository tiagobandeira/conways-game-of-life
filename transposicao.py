"""
    Trasnposicionar Células
"""
def transposicionar(lista_posicoes):
    inicial = lista_posicoes[0]
    saida = "[[x,y],"
    for pos in lista_posicoes[1:]:
        i = pos[0]-inicial[0]
        j = pos[1]-inicial[1]
        if i > 0:
            i = "+" +str(i)
        elif i == 0:
            i = ""
        else:
            i = str(i)

        if j == 0:
            j = ""
        elif j > 0:
            j = "+" +str(j)
        else:
            j = str(j)
        saida += f"[x{i},y{j}],"
    saida += "]"
    return saida
