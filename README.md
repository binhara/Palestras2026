# Palestras 2026 — Alessandro De Oliveira Binhara

Coletânea de palestras e apresentações em HTML/CSS/JS puro, publicadas como site estático no Vercel.

A raiz é uma **landing page** (`index.html`) que lista todas as palestras. Cada palestra vive em seu **próprio diretório** e é uma aplicação autocontida.

## Estrutura

```
/
├── index.html                 # landing: lista as palestras (registro em TALKS[])
├── do-software-aos-dados/     # uma palestra (autocontida)
│   ├── index.html             # a apresentação (navegação por teclado)
│   ├── styles.css
│   ├── script.js
│   ├── assets/images/         # imagens, QR codes, foto
│   ├── curriculos/            # PDFs referenciados nos slides
│   └── conteudo-palestra.txt  # roteiro / fonte do conteúdo
└── vercel.json                # config de deploy estático
```

## Rodar localmente

Qualquer servidor estático na raiz. Ex.:

```bash
python3 -m http.server 8000
# abre http://localhost:8000/                       -> landing
# abre http://localhost:8000/do-software-aos-dados/ -> palestra
```

> Use sempre via servidor HTTP (não `file://`) para que os links de PDF e os QR Codes funcionem.

## Adicionar uma nova palestra

1. Crie um diretório na raiz com um slug em kebab-case (ex.: `minha-nova-palestra/`).
2. Coloque dentro o `index.html` da apresentação e seus assets.
3. Registre a palestra na landing: edite o array `TALKS` em `/index.html` acrescentando um objeto:

```js
{
  slug: "minha-nova-palestra",
  title: "Título da Palestra",
  description: "Resumo de uma linha.",
  cover: "minha-nova-palestra/assets/images/capa.png",
  badge: "N slides",
  tags: ["Tema A", "Tema B"]
}
```

## Apresentação — controles

`→` / `espaço` avança · `←` volta · `Home`/`End` início/fim · `F` tela cheia · `#N` abre o slide N · `Ctrl/Cmd+P` exporta PDF (um slide por página).

## Deploy no Vercel

Site 100% estático, sem build. Importe o repositório no Vercel:

- **Framework Preset:** Other
- **Build Command:** *(vazio)*
- **Output Directory:** `.` (raiz)
