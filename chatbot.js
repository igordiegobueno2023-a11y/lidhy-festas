'use strict';
(() => {
  const dialog = document.getElementById('lidhy-chat');
  const launcher = document.querySelector('.chat-launcher');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  const normalizeText = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const answer = question => {
    const q = normalizeText(question);
    if (/capacidade|quantas pessoas|quantos convidados|lotacao/.test(q)) return 'Para confirmar a capacidade do espaço e a melhor organização para seus convidados, fale com nossa equipe no WhatsApp: (12) 98125-6800.';
    if (/endereco|localiza|onde fica|como chegar|rua/.test(q)) return 'O Espaço Lidhy fica na Rua Minas Gerais, 418, Bairro Industrial, Lorena/SP. Na seção Chácara / Espaço, você encontra o link para abrir a localização no mapa. Agende sua visita pelo WhatsApp.';
    if (/disponiv|reserv|agenda|vaga|amanha|hoje|data|sabado|domingo/.test(q)) return 'Nossa equipe confirma as datas pelo WhatsApp. Informe o dia da festa, o tema e se você deseja um kit, decoração completa ou locação do espaço. A reserva precisa ser combinada com a equipe.';
    if (/(espaco|chacara|salao|piscina)/.test(q) && /(valor|preco|custa|aluguel|quanto)/.test(q)) return 'A locação do Espaço Lidhy é sob consulta. Você pode contratar somente o espaço ou incluir a decoração. Envie a data e os detalhes da festa pelo WhatsApp para receber seu orçamento.';
    if (/valor|preco|custa|orcamento|quanto/.test(q)) return 'Os kits Pegue e Monte são a partir de R$ 120 e as decorações com balões, a partir de R$ 400. O valor final depende do tema, da data e dos itens escolhidos. A locação do espaço é sob consulta.';
    if (/espaco|chacara|salao|piscina|estrutura|churras|cozinha|wifi|wi-fi|mesa/.test(q)) return 'O Espaço Lidhy tem piscina, salão amplo, churrasqueira, cozinha completa, geladeira e freezer, 10 jogos de mesa, som e Wi-Fi. Você pode alugar somente o espaço ou incluir nossa decoração. Veja as fotos na seção Chácara / Espaço!';
    const theme = Array.from(document.querySelectorAll('#catalogo-temas h3')).find(el => q.includes(normalizeText(el.textContent)));
    if (theme) return `Temos uma referência de ${theme.textContent} no catálogo. Consulte com a equipe os itens, as opções de montagem e a disponibilidade para sua data. Você pode mencionar esse tema ao pedir o orçamento pelo WhatsApp.`;
    if (/tema|catalogo|modelo|personagem/.test(q)) return 'Na seção Temas você pode buscar pelo nome e ver as fotos das montagens. Para saber quais itens estão disponíveis em Pegue e Monte ou decoração completa, consulte a equipe pelo WhatsApp.';
    if (/pegue|monte|kit|retir|devol|montar/.test(q)) return 'No Pegue e Monte, você escolhe o tema, combina a data e retira os itens separados e organizados. Depois, monta no seu espaço e devolve no dia combinado. Confirme os itens e os horários de retirada e devolução com a equipe.';
    if (/decoracao|baloes|montagem/.test(q)) return 'Na decoração completa, nossa equipe realiza a montagem. As opções com balões partem de R$ 400. Conte o tema, a data e o local da festa no WhatsApp para combinar os detalhes e receber o orçamento.';
    if (/contato|telefone|whatsapp|atendente|pessoa|equipe/.test(q)) return 'Fale com a equipe pelo WhatsApp (12) 98125-6800. Use o botão abaixo para abrir a conversa e tirar suas dúvidas.';
    if (/^(oi|ola|bom dia|boa tarde|boa noite|obrigad[oa])[!.\s]*$/.test(q.trim())) return 'Olá! Estou por aqui para ajudar. Você quer saber sobre kits, decoração, temas ou o espaço?';
    return 'Ainda não tenho essa informação. Nossa equipe pode te ajudar e confirmar os detalhes pelo WhatsApp. Use o botão abaixo para falar com a Lidhy Festas.';
  };
  const addMessage = (text, who) => {
    const p = document.createElement('p');
    p.className = `chat-message ${who}`;
    p.textContent = text;
    messages.append(p);
  };
  const submitQuestion = question => {
    const text = question.trim();
    if (!text) return;
    addMessage(text, 'user');
    addMessage(answer(text), 'bot');
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    input.focus();
  };
  launcher.hidden = false;
  launcher.addEventListener('click', () => { dialog.showModal(); input.focus(); });
  document.querySelector('.chat-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => launcher.focus());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  document.getElementById('chat-form').addEventListener('submit', event => { event.preventDefault(); submitQuestion(input.value); });
  document.querySelectorAll('[data-question]').forEach(button => button.addEventListener('click', () => submitQuestion(button.dataset.question)));
})();