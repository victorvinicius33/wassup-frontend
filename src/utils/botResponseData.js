const botResponseData = {
  inputs: [
  'Qual a sua idade?',
  'Você é jovem?',
  'Quando você nasceu?',
  'Quantos anos você tem?',
  'Você é velho?',
  'Há quanto tempo você nasceu?',
  'Seja meu amigo?',
  'Podemos ser amigos?',
  'Você quer ser meu melhor amigo?',
  'Quer ser meu BFF?',
  'Eu quero ser seu amigo',
  'Você está certo.',
  'Isso está certo.',
  'Isso está correto.',
  'Isso é verdade.',
  'Sim, está certo.',
  'Sim, está correto.',
  'Sim, isto é verdade',
  'ha',
  'haha',
  'hahaha',
  'k',
  'kk',
  'kkk',
  'Estou morrendo de rir',
  'Boa',
  'Boa tarde',
  'Boa tarde pra você',
  'Tenha uma boa tarde',
  'Bom dia',
  'Bom dia pra você',
  'Tenha um bom dia',
  'Boa noite',
  'Boa noite pra você',
  'Tenha uma boa noite',
  'Como foi seu dia?',
  'Como está indo o seu dia?',
  'Você está tendo um bom dia?',
  'Falo com você depois',
  'Vejo você depois',
  'Tchau',
  'Até uma próxima',
  'Te vejo mais tarde',
  'Estou brincando',
  'Tô brincando',
  'Só estou brincando',
  'É brincadeira',
  'Brincadeirinha',
  'Como você está?',
  'Como está você hoje?',
  'Como vão as coisas?',
  'Como você vai indo?',
  'De nada',
  'O prazer é meu',
  'Testando',
  'Você pode me escutar?',
  'Você pode me escutar agora?',
  'Está ligado?',
  'Hey',
  'Olá',
  'Oi',
  'Estou aqui',
  'Como eu estou?',
  'Como está a minha aparência?',
  'Estou bonito?',
  'Estou bonita?',
  'Eu sou bonito?',
  'Eu sou bonita?',
  'Você me acha bonito?',
  'Você me acha bonita?',
  'Eu estou com saudades',
  'Eu estou com tanta saudades',
  'Eu sinto sua falta',
  'Eu sinto tanto a sua falta',
  'Estou cansado de você.',
  'Estou cansada de você.',
  'Estou ficando cansado de você.',
  'Estou ficando cansada de você.',
  'Sem graça',
  'Você é sem graça',
  'Você é irritante',
  'Você é incrível',
  'Você é maravilhoso',
  'Você é legal',
  'Você é engraçado',
  'Você é divertido',
  'Isso foi engraçado',
  'Você está aí?',
  'Você gostou do meu',
  'Você gostou da minha',
  'Você gosta do meu',
  'Você gosta da minha',
], outputs: [
  'Eu não tenho idade.',
  'Eu não tenho idade.',
  'Eu não tenho idade.',
  'Eu não tenho idade.',
  'Eu não tenho idade.',
  'Eu não tenho idade.',
  'Claro! Vamos usar camisetas combinando.',
  'Claro! Vamos usar camisetas combinando.',
  'Claro! Vamos usar camisetas combinando.',
  'Claro! Vamos usar camisetas combinando.',
  'Claro! Vamos usar camisetas combinando.',
  'Pode apostar que sim.',
  'Pode apostar que sim.',
  'Pode apostar que sim.',
  'Pode apostar que sim.',
  'Pode apostar que sim.',
  'Pode apostar que sim.',
  'Pode apostar que sim.',
  'Mas veja só, uma risada.',
  'Mas veja só, uma risada.',
  'Mas veja só, uma risada.',
  'Mas veja só, uma risada.',
  'Mas veja só, uma risada.',
  'Mas veja só, uma risada.',
  'Mas veja só, uma risada.',
  'Boa.',
  'Boa tarde.',
  'Boa tarde pra você também!',
  'Obrigado, você também!',
  'Bom dia.',
  'Bom dia pra você também!',
  'Obrigado, você também!',
  'Boa noite.',
  'Boa noite pra você também!',
  'Obrigado, você também!',
  'Não posso reclamar. Na verdade, eu literalmente não posso reclamar.',
  'Não posso reclamar. Na verdade, eu literalmente não posso reclamar.',
  'Não posso reclamar. Na verdade, eu literalmente não posso reclamar.',
  'Até mais!',
  'Até mais!',
  'Até mais!',
  'Até mais!',
  'Até mais!',
  'Imaginei.',
  'Imaginei.',
  'Imaginei.',
  'Imaginei.',
  'Imaginei.',
  'Como se eu vivesse em um sonho.',
  'Como se eu vivesse em um sonho.',
  'Como se eu vivesse em um sonho.',
  'Como se eu vivesse em um sonho.',
  'Ok, beleza.',
  'Ok, beleza.',
  'Entendido.',
  'Sim.',
  'Sim.',
  'Sim.',
  'Olá!',
  'Olá!',
  'Olá!',
  'Eu reconheço sua presença.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não sou um especialista em beleza.',
  'Não posso te culpar.',
  'Não posso te culpar.',
  'Não posso te culpar.',
  'Não posso te culpar.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Às vezes eu tenho que dar um tempo nessa coisa de ser incrível o tempo todo.',
  'Bajulação. Gosto muito.',
  'Bajulação. Gosto muito.',
  'Bajulação. Gosto muito.',
  'Bajulação. Gosto muito.',
  'Bajulação. Gosto muito.',
  'Bajulação. Gosto muito.',
  'Estou sim!',
  'Não tenho como saber.',
  'Não tenho como saber.',
  'Não tenho como saber.',
  'Não tenho como saber.',
]}

module.exports = botResponseData;
