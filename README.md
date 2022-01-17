# Smart Mask: 
Uma biblioteca de Mascaras de dados em JavaScript

# O que é
Está é uma biblitoca bem simples com o intuito de fornecer multiplas mascaras de dados para diversos tipos que possam ser usados com frequencia em um projeto. O Projeto é constituido por duas classes, uma que aplica as mascaras e outra que monitora elementos HTML para manter a mascara aplicada.

# Como funciona
## ApplyMask
A Classe apply mask possui apenas métodos estaticos que estão prontos para serem chamados mediante passagem de parametros conforme exemplo abaixo

```
ApplyMask.toCPF('88888888888')
// output '888.888.888-88'

ApplyMask.toPhone('051983326945')
// output '(05) 19833-2694'

ApplyMask.charactersOnly('qwerty12345')
// output 'qwerty'
```