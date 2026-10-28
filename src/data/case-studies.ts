import type { CaseStudy } from '@/types/cv';

// Drafted from each project's README and docs (Projeto R:
// docs/multiplayer-architecture.md). Figures are the measured ones reported
// there, not estimates.
export const caseStudies: CaseStudy[] = [
  {
    projectId: 'projeto-r',
    problem: 'O Projeto R nasceu como um RPG de ação para um jogador. O desafio foi levá-lo para o online, com co-op de até 3 jogadores e PvP 1v1, sem reescrever o combate inteiro e sem deixar o cliente decidir o próprio dano.',
    problemEn: 'Projeto R started as a single-player action RPG. The challenge was taking it online, with co-op for up to 3 players and 1v1 PvP, without rewriting the whole combat system and without letting clients decide their own damage.',
    architecture: [
      {
        label: 'Cliente · Vercel',
        labelEn: 'Client · Vercel',
        detail: 'Phaser só renderiza e coleta o input.',
        detailEn: 'Phaser only renders and collects input.',
        via: 'comandos validados com zod',
        viaEn: 'zod-validated commands',
      },
      {
        label: 'Servidor · Render',
        labelEn: 'Server · Render',
        detail: 'Node + ws, salas por código de 4 letras.',
        detailEn: 'Node + ws, rooms joined by a 4-letter code.',
        via: 'comandos do tick',
        viaEn: 'per-tick commands',
      },
      {
        label: 'Simulação headless',
        labelEn: 'Headless simulation',
        detail: 'O mesmo GameScene do solo em Phaser headless (jsdom). A interface MatchHost separa o solo do online.',
        detailEn: 'The same single-player GameScene in headless Phaser (jsdom). A MatchHost interface keeps solo and online apart.',
        via: 'snapshot da cena a 20 Hz',
        viaEn: 'scene snapshot at 20 Hz',
      },
      {
        label: 'Diferenças por jogador',
        labelEn: 'Per-player diffs',
        detail: 'Só o que mudou vai para cada cliente, que remonta a cena e interpola o movimento.',
        detailEn: 'Each client gets only what changed, then rebuilds the scene and interpolates movement.',
      },
    ],
    decisions: [
      {
        topic: 'Autoridade',
        topicEn: 'Authority',
        choice: 'Servidor autoritativo',
        choiceEn: 'Authoritative server',
        why: 'No PvP, ninguém pode decidir o próprio dano. Também resolve a sincronização dos inimigos no co-op.',
        whyEn: 'In PvP, no one may decide their own damage. It also keeps enemies in sync during co-op.',
      },
      {
        topic: 'Simulação',
        topicEn: 'Simulation',
        choice: 'Rodar o próprio jogo em Phaser headless',
        choiceEn: 'Run the game itself in headless Phaser',
        why: 'Todas as classes funcionaram online sem reescrever as habilidades. O custo é mais CPU por sala, aceitável para o co-op.',
        whyEn: 'Every class worked online without rewriting abilities. The cost is more CPU per room, acceptable for co-op.',
      },
      {
        topic: 'Protocolo',
        topicEn: 'Protocol',
        choice: 'ws + zod no lugar do Colyseus',
        choiceEn: 'ws + zod instead of Colyseus',
        why: 'Com snapshots genéricos da cena, o schema do Colyseus não ajudava. O protocolo próprio fica tipado de ponta a ponta e o servidor recusa mensagens fora do formato.',
        whyEn: 'With generic scene snapshots, the Colyseus schema added nothing. A custom protocol stays typed end to end, and the server rejects malformed messages.',
      },
      {
        topic: 'Hospedagem',
        topicEn: 'Hosting',
        choice: 'Cliente na Vercel, servidor no Render',
        choiceEn: 'Client on Vercel, server on Render',
        why: 'A Vercel não segura conexões WebSocket longas. O servidor precisa de um processo sempre ligado.',
        whyEn: 'Vercel does not hold long-lived WebSocket connections. The server needs an always-on process.',
      },
    ],
    results: [
      { value: '60 FPS', label: 'no servidor com 2 jogadores', labelEn: 'on the server with 2 players' },
      { value: '~0,35 ms', valueEn: '~0.35 ms', label: 'para capturar cada snapshot', labelEn: 'to capture each snapshot' },
      { value: '35–60 KB/s', label: 'de banda total por sala', labelEn: 'total bandwidth per room' },
      { value: '20 Hz', label: 'de atualização do estado', labelEn: 'state update rate' },
    ],
    learnings: [
      'Reaproveitar o motor no servidor foi o atalho que destravou o co-op. A reescrita para uma simulação pura continua no roadmap, mas só é necessária para o PvP com predição.',
      'Logs JSON por sala e métricas de tick desde o primeiro dia transformaram as discussões de performance em números.',
      'Uma interface pequena (MatchHost) entre o fluxo da partida e o transporte permite migrar aos poucos, sem um big bang.',
    ],
    learningsEn: [
      'Reusing the engine on the server was the shortcut that unlocked co-op. A rewrite into a pure simulation stays on the roadmap, but only PvP with prediction needs it.',
      'Per-room JSON logs and tick metrics from day one turned performance debates into numbers.',
      'A small interface (MatchHost) between match flow and transport makes gradual migration possible, with no big bang.',
    ],
    gallery: [
      { src: '/projects/projeto-r/heroes.jpg', alt: 'Arte com os heróis do Projeto R', altEn: 'Artwork of the Projeto R heroes' },
      { src: '/projects/projeto-r/tyrant.jpg', alt: 'Retrato da classe Tyrant', altEn: 'Tyrant class portrait' },
      { src: '/projects/projeto-r/reaper.jpg', alt: 'Retrato da classe Reaper', altEn: 'Reaper class portrait' },
      { src: '/projects/projeto-r/cryomancer.jpg', alt: 'Retrato da classe Cryomancer', altEn: 'Cryomancer class portrait' },
    ],
  },
  {
    projectId: 'obs-interactive',
    problem: 'Um streamer amigo queria que os espectadores interagissem com a live em tempo real, desenhando e posicionando textos, imagens e vídeos por cima da transmissão. Tudo isso sem instalar nada e sem dar acesso ao OBS dele.',
    problemEn: 'A streamer friend wanted viewers to interact with the live stream in real time, drawing and placing text, images, and videos on top of it. All of that without installing anything and without access to the streamer\'s OBS.',
    architecture: [
      {
        label: 'Login com Twitch',
        labelEn: 'Twitch login',
        detail: 'OAuth. Só entra quem está na whitelist do streamer.',
        detailEn: 'OAuth. Only users on the streamer\'s whitelist get in.',
        via: 'sessão autenticada',
        viaEn: 'authenticated session',
      },
      {
        label: 'Editor do espectador',
        labelEn: 'Viewer editor',
        detail: 'Módulos JavaScript com EventBus para desenhar e posicionar elementos.',
        detailEn: 'JavaScript modules with an EventBus to draw and place elements.',
        via: 'eventos tipados (Socket.io)',
        viaEn: 'typed events (Socket.io)',
      },
      {
        label: 'Servidor · Express 5',
        labelEn: 'Server · Express 5',
        detail: 'Uma sala por streamer. Rotas, controllers, services e repositories; MongoDB guarda salas e whitelist.',
        detailEn: 'One room per streamer. Routes, controllers, services, and repositories; MongoDB stores rooms and the whitelist.',
        via: 'broadcast para a sala',
        viaEn: 'room broadcast',
      },
      {
        label: 'Overlay no OBS',
        labelEn: 'OBS overlay',
        detail: 'Fonte de navegador que recebe o estado inicial ao conectar e as mudanças em tempo real.',
        detailEn: 'A browser source that gets the initial state on connect and every change in real time.',
      },
    ],
    decisions: [
      {
        topic: 'Transporte',
        topicEn: 'Transport',
        choice: 'Socket.io com eventos tipados',
        choiceEn: 'Socket.io with typed events',
        why: 'Salas e reconexão vêm prontas. As interfaces de eventos em TypeScript pegam payloads errados em tempo de compilação.',
        whyEn: 'Rooms and reconnection come built in. TypeScript event interfaces catch wrong payloads at compile time.',
      },
      {
        topic: 'Acesso',
        topicEn: 'Access',
        choice: 'Twitch OAuth + whitelist no MongoDB',
        choiceEn: 'Twitch OAuth + whitelist in MongoDB',
        why: 'O streamer decide quem pode mexer na tela, sem senhas para gerenciar.',
        whyEn: 'The streamer decides who can touch the screen, with no passwords to manage.',
      },
      {
        topic: 'Estado',
        topicEn: 'State',
        choice: 'O servidor guarda os elementos da sala',
        choiceEn: 'The server keeps each room\'s elements',
        why: 'A fonte do OBS pode recarregar a qualquer momento e precisa voltar com a tela como estava.',
        whyEn: 'The OBS source can reload at any time and must come back with the screen as it was.',
      },
      {
        topic: 'Back-end',
        topicEn: 'Back-end',
        choice: 'Camadas: rotas, controllers, services, repositories',
        choiceEn: 'Layers: routes, controllers, services, repositories',
        why: 'As regras de negócio ficam testáveis sem HTTP nem banco.',
        whyEn: 'Business rules stay testable without HTTP or a database.',
      },
    ],
    results: [
      { value: '12', label: 'eventos tipados em tempo real', labelEn: 'typed real-time events' },
      { value: '1', label: 'sala isolada por streamer', labelEn: 'isolated room per streamer' },
      { value: '0', label: 'instalações para o espectador', labelEn: 'installs for viewers' },
    ],
    learnings: [
      'Construir para um usuário real definiu as prioridades, como ocultar um elemento sem apagá-lo.',
      'Guardar o estado no servidor, e não só repassar eventos, foi o que deixou o overlay confiável na live.',
      'Tipar os eventos do Socket.io dos dois lados evita a classe mais comum de bug em sistemas de tempo real: o contrato quebrado.',
    ],
    learningsEn: [
      'Building for a real user set the priorities, such as hiding an element without deleting it.',
      'Keeping state on the server, not just relaying events, is what made the overlay reliable on stream.',
      'Typing Socket.io events on both sides prevents the most common bug in real-time systems: a broken contract.',
    ],
    gallery: [],
  },
];

export function findCaseStudy(projectId: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.projectId === projectId);
}
