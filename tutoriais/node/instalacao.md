# Tutorial - Instalação NodeJs v14

1. [Instalação](#instalação)
   - [Linux (Ubuntu 20.04)](#linux---ubuntu-20)
   - [Windows 10](#windows-10)
   - [MacOs](#macos)
2. [Instalação ReactJs](https://github.com/lifuesc/minicurso-blockchain/tree/main/Ferramentas/reactjs/instalacao.md)

## Instalação

### Linux - Ubuntu 20

Instalando versão mais recente LTS do nodejs

```shellscript
$ cd ~

$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
​
$ sudo apt-get install nodejs -y
```

Verificando versão

```shellscript
$ node -v
# v14.15.1

$ npm -v
# 6.14.8
```

Caso você esteja em outra distribuição acesse [esse link](https://nodejs.org/en/download/) e baixe a versão LTS para seu computador

Caso sua versão do node venha inferior a v14, então rode o seguinte comando

```shellscript
$ sudo npm cache clean -f

$ sudo npm install -g n

$ sudo n stable

$ sudo n latest
```

### Windows 10

Para instalar no windows 10 acesse [esse link](https://nodejs.org/en/download/) e baixe a versão LTS para seu computador

Baixe o formato`.msi`

Em seguida execute o arquivo e siga com a instalação

### MacOs

Para instalar no windows 10 acesse [esse link](https://nodejs.org/en/download/) e baixe a versão LTS para seu computador

Baixe o formato`.msi`

Em seguida execute o arquivo e siga com a instalação
