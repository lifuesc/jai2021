# Tutorial - Instalação VsCode

1. [Instalação](#instalação)
   - [Linux (Ubuntu 20.04)](#linux)
   - [Windows 10](#windows-10)
   - [MacOs](#macos)

## Instalação

### Linux (Ubuntu)

Instalando via shellscript

Via snap:

```shellscript
$ sudo snap install --classic code
```

Via apt:

```shellscript
$ sudo apt update

$ sudo apt install software-properties-common apt-transport-https wget

$ wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add --

$ sudo add-apt-repository “deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main”

$ sudo apt install code
```

Verificando versão

```shellscript
$ code -v
```

Caso você esteja em outra distribuição acesse [esse link](https://code.visualstudio.com/download) e baixe a versão LTS para seu computador

### Windows 10

Para instalar no windows 10 acesse [esse link](https://code.visualstudio.com/download) e baixe a versão para seu computador

Em seguida execute o arquivo e siga com a instalação

### MacOs

Para instalar no windows 10 acesse [esse link](https://code.visualstudio.com/download) e baixe a versão para seu computador

Em seguida execute o arquivo e siga com a instalação
