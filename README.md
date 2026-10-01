# KRONNOS — Construcción y Rehabilitación

Website em espanhol, responsivo e sem dependências externas de execução. HTML, CSS e JavaScript, com imagens locais. Preparado para alojamento na Vercel a partir de um repositório GitHub. Não foi publicado nem ligado a contas externas nesta entrega.

## Ver localmente

Requer Node.js 20 ou superior. Execute `npm start` e abra http://localhost:4173. Execute `npm run build` para gerar `dist/`.

## GitHub e Vercel

1. Extraia o ZIP e coloque o conteúdo desta pasta na raiz de um novo repositório GitHub.
2. Na Vercel, importe esse repositório, selecione o preset **Other** e mantenha o comando `npm run build` e o diretório de saída `dist`.
3. O ficheiro `vercel.json` já define o build e os cabeçalhos de segurança. Não há chaves nem variáveis de ambiente necessárias.
4. Alterações publicadas no repositório poderão gerar novos deploys automaticamente pela integração GitHub–Vercel.

## Completar antes da publicação comercial

- Em `site-config.js`, preencher e-mail, telefone, WhatsApp e Instagram com dados reais. Enquanto o e-mail estiver vazio, o formulário informa que o contacto ainda não está disponível; não simula envio. Com o e-mail preenchido, abre o cliente de e-mail com a consulta pronta. Não envia nem armazena dados automaticamente.
- Inserir obras reais em `projects`, com fotos locais, nome, categoria, localidade e descrição. A lista vazia mostra uma mensagem honesta de portfólio em preparação.
- Substituir a imagem conceptual da capa por uma fotografia própria se desejado. A imagem atual é identificada como visualização conceptual e não é apresentada como obra executada.
- Completar a informação legal do titular no diálogo em `index.html`, conforme os dados confirmados da empresa.
- Configurar o domínio final na Vercel; depois acrescentar o URL absoluto canónico e o sitemap. O domínio ainda não foi informado, portanto não foi inventado.

## Ficheiros

`index.html`: estrutura e textos. `styles.css`: desenho responsivo. `script.js`: menu, serviços, projetos, contacto e diálogo. `site-config.js`: contactos e obras. `assets/`: logos, favicon e imagem conceptual. `build.mjs`: exportação estática. `serve.mjs`: pré-visualização local.

As logos preta e branca são PNGs com transparência. O desenho segue a linguagem editorial da referência indicada pelo utilizador: azul profundo, branco quente, dourado discreto, títulos grandes e navegação simples. Não foram inventados projetos concluídos, equipa, prazos, certificações ou testemunhos.
