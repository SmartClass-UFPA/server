# Server

[![Build Status](https://travis-ci.org/SmartClass-UFPA/server.svg?branch=master)](https://travis-ci.org/SmartClass-UFPA/server)

## Rodando o Servidor e o BD:

Método 1 (RECOMENDADO - usando o Docker-Compose) => executar ```docker-compose -p sc up```

Método 2 (sem usa o docker-compose, precisa estar no linux e ter o docker instalado) => rodar o script "run", exemplo ```./run```, caso queira remover os container pode ser usado o script ```./remove_container```.


[Install Docker](https://docs.docker.com/engine/installation/)


[Install Docker-Compose](https://docs.docker.com/compose/install/)

## Contribuindo com o projeto:
Para criar as tabelas, o arquivo a ser alterado é o ```/models/database.js```

Para criar novas funções para API deverá ser alterado os arquivos disponíveis em ```/controllers```, depois as funções devem ser chamadas no arquivo ```routes/index.js```

Links:

>[Tabelas e API's do projeto](https://docs.google.com/document/d/1tZFYow6YZkTRbI-7Q_iDdCb9ZVi6M5PozqPvdh6Kkfg/edit?usp=sharing)

>[Trabalho escrito](https://docs.google.com/document/d/16MD0B4HUccbCzumPCDYh--bWKtoz4yhvRBslDhMaFbI/edit?usp=sharing)

Editem o trabalho escrito com seus respectivos dados, se possível nomes abreviados e depois decidimos como será a divisão dos tópicos pra cada um.
