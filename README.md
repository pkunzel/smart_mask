# Smart Mask: 
Uma biblioteca de Mascaras de dados em JavaScript

# O que é
Está é uma biblitoca bem simples com o intuito de fornecer multiplas mascaras de dados para diversos tipos que possam ser usados com frequencia em um projeto. O Projeto é constituido por duas classes, uma que aplica as mascaras e outra que monitora elementos HTML para manter a mascara aplicada.

# Como funciona
## Classe ApplyMask
A Classe apply mask possui apenas métodos estaticos que estão prontos para serem chamados mediante passagem de parametros conforme exemplo abaixo

```
ApplyMask.toCPF('88888888888')
// output '888.888.888-88'

ApplyMask.toPhone('051983326945')
// output '(05) 19833-2694'

ApplyMask.charactersOnly('qwerty12345')
// output 'qwerty'
```

## Classe CustomMask
Gera eventos para os elementos com o atributos data-custom-mask="mascara", onde mascara é o nome do tipo de mascara a seer implementada. As opções são
- cpf: um CPF
- cnpj: um CNPJ
- phone: um telefone com DDD incluso
- cep: um CEP
- date: uma data seguindo o formato DD/MM/YYYY
- numbers: extrai apenas os valores numéricos
- characters: extrai apenas os caracteres
- non-special-characters: Extrai apenas os caractes não especiais

Exemplo

HTML
```
	<input type="text" data-custom-mask="cpf" value="11122233344">
```

JS
```
	// Ao iniciar a página
	window.addEventListener('load', (e) => new CustomMask());
	// Obs.: Pode ser feito inicializado em qualquer outro momento.
```

**Importante**: Qualquer valore que seja maior que o tamanho da mascara terá os ultimos caracteres removidos. ou seja, um CPF que venha com 15 carateres devido a algum erro terá os ultimos 4 characteres removidos.