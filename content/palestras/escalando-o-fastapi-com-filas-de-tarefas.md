---
Title: Escalando o FastAPI com filas de tarefas
Date: 2023-10-01 10:20
Description: Otimize o desempenho do FastAPI com Dramatiq. Descarregue tarefas demoradas para processos separados, permitindo alta concorrência e configuração transparente.
Slug: escalando-o-fastapi-com-filas-de-tarefas
Duration: 45
Speakers: Lucas de Carvalho Rodrigues da Silva
Speakers_biography: Com mais de 9 anos de experiência em Python, sou formado em Bacharelado em Ciências de Computação pela USP de São Carlos e sou co-fundador do grupy-sanca, grupo de usuários Python de São Carlos - SP.
Speakers_avatar: https://pretalx.com/media/avatars/3532625_bKPuuia.jpg

---

O design assíncrono do FastAPI o torna adequado para lidar com cargas de trabalho de alta concorrência, mas ainda existem limites para o que uma única instância do FastAPI pode suportar. A ideia é mostrar como usar a fila de tarefas Dramatiq para desviar tarefas demoradas ou intensivas em recursos para processos de trabalho separados, e como configurar o FastAPI para trabalhar de forma transparente com ela.