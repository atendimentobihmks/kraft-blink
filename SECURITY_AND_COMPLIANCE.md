# Segurança, Privacidade e Conformidade (LGPD) - KRAFT

Este documento descreve as diretrizes de segurança, privacidade e conformidade aplicadas ao projeto de página de multi-links da **KRAFT**, em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil.

## 1. Visão Geral do Projeto
A página foi construída com foco em altíssima performance utilizando HTML5 semântico, CSS3 puro e JavaScript baunilha (Vanilla), compilados via Vite. Como um projeto voltado à conversão e direcionamento de tráfego, a segurança e a transparência no tratamento de dados dos visitantes são pilares fundamentais.

## 2. Tratamento e Coleta de Dados Pessoais
* **Coleta Direta:** O site, em sua versão atual, **não coleta ou armazena** dados pessoais dos usuários de forma direta (não há formulários de contato nativos ou bancos de dados internos gravando cadastros).
* **Redirecionamento:** O site direciona o tráfego de maneira segura para canais proprietários externos da marca (como o WhatsApp Oficial de Atendimento e Produção, além das redes sociais Instagram, Facebook e Pinterest). 

## 3. Segurança do Lado do Cliente (Client-Side Security)
Para mitigar potenciais vetores de ataque cibernéticos na interface construída, aplicamos as seguintes proteções padrão:
* **Segurança de Links (`target="_blank"`):** Todos os links externos abertos em novas abas utilizam a diretiva de segurança `rel="noopener noreferrer"`. Isso evita ataques do tipo *Tabnabbing* (onde um site malicioso de destino poderia manipular a aba de origem através do objeto `window.opener`).
* **Segurança contra Injeção (XSS):** O código JavaScript foi estruturado para evitar a inserção dinâmica de HTML não higienizado (`innerHTML`). A manipulação do DOM e a criação do carrossel são realizadas de forma totalmente estruturada com `createElement` e manipulação segura de atributos textuais.
* **SVG Otimizado e Higienizado:** Os ícones foram carregados diretamente via SVG inline no HTML, prevenindo a importação de scripts maliciosos injetados por CDNs externas instáveis ou arquivos XML corrompidos.

## 4. Política de Cookies e Rastreamento (Conformidade LGPD)
* **Status Atual:** A interface não realiza o disparo de cookies ou scripts de rastreamento (como Meta Pixel ou Google Analytics) de forma intrusiva antes da ativação consciente de termos de aceite pelo usuário.
* **Integração de Pixels (Recomendação de Deploy):** Em caso de implantação de ferramentas de observabilidade e marketing em tráfego pago, a BMK recomenda a integração de uma ferramenta de consentimento ativo (Banner de Cookies), bloqueando o carregamento dos scripts analíticos até a manifestação formal de consentimento pelo visitante.

## 5. Governança de Credenciais
* Nenhuma chave de API, credencial de servidor ou token de Pixel foi escrito diretamente no código-fonte (*hardcoded*).
* A arquitetura Vite está configurada para suportar a injeção dessas chaves em tempo de build através de variáveis de ambiente (`.env`), que se encontram excluídas do controle de versão pelo `.gitignore`.
