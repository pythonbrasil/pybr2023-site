---
Title: Deploy e release contínuos em Django
Date: 2023-10-01 10:20
Description: Para fazer deploys menores e ter menos risco de introduzir erros, é importante fazermos deploys frequentes. Esse tutorial mostra como com migrations incrementais e feature flags.
Slug: deploy-e-release-continuos-em-django
Duration: 180
Speakers: Vinicius Mendes
Speakers_biography: Tech Lead e Senior Backend Engineer na Loadsmart. Já empreendeu, foi professor, líder técnico no G1 e gerente de projetos na Dataprev. Na Python Brasil desde 2009 também em Caxias do Sul.
Speakers_avatar: https://pretalx.com/media/avatars/profile-picture-sq_BptCsQU.jpeg

---

Este tutorial demonstra uma estratégia para evoluir aplicações Django em produção sem impactar o software em funcionamento. Como podemos desacoplar o deploy e o lançamento de uma funcionalidade nova? Como podemos evoluir um modelo de dados sem fazer um big bang que gera indisponibilidade para o usuário? Vou apresentar como refatorar e evoluir modelos sem gerar indisponibilidade utilizando migrations incrementais e também como desacoplar o deploy e o lançamento de uma funcionalidade nova utilizando feature flags com a biblioteca django-waffle.