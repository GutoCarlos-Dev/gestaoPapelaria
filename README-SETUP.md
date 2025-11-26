# 📦 Configuração do Sistema de Gestão de Papelaria

Este guia explica como configurar completamente o sistema de gestão de papelaria, incluindo o bucket de armazenamento para imagens.

## 🚀 Configuração Rápida

### 1. Instalar Dependências
```bash
npm install
```

### 2. Criar Bucket de Imagens
```bash
npm run create-bucket
```

Ou executar diretamente:
```bash
node create-bucket.js
```

## 📋 O que o Script Faz

O script `create-bucket.js` cria automaticamente o bucket `imagens-produtos` no Supabase Storage com as seguintes configurações:

- ✅ **Nome:** `imagens-produtos`
- ✅ **Público:** Sim (imagens acessíveis via URL)
- ✅ **Tipos MIME:** JPEG, PNG, GIF, WebP
- ✅ **Limite:** 5MB por arquivo

## 🔐 Configuração de Segurança (Importante!)

Após executar o script, você precisa configurar as políticas de segurança no Supabase:

### Passo 1: Acesse o Painel do Supabase
1. Vá para [supabase.com](https://supabase.com)
2. Entre no seu projeto
3. No menu lateral: **Storage** → **imagens-produtos** → **Policies**

### Passo 2: Criar Políticas

#### Política de Leitura (SELECT)
```sql
-- Permite que qualquer pessoa veja as imagens
bucket_id = 'imagens-produtos'
```

#### Política de Upload (INSERT)
```sql
-- Permite apenas usuários logados fazerem upload
bucket_id = 'imagens-produtos'
AND auth.role() = 'authenticated'
```

## 🧪 Teste do Sistema

Após a configuração:

1. **Abra** `produtos.html` no navegador
2. **Faça login** no sistema
3. **Clique** em "Novo Produto"
4. **Selecione uma imagem** no campo "Foto do Produto"
5. **Preencha** os outros campos
6. **Clique** em "Salvar Produto"

A imagem deve ser enviada para o Supabase Storage e aparecer automaticamente na card do produto!

## 📁 Estrutura do Projeto

```
gestao-papelaria/
├── create-bucket.js      # Script de criação do bucket
├── package.json          # Dependências do Node.js
├── produtos.html         # Página de produtos (com upload)
├── pedidos.html          # Página de pedidos
├── clientes.html         # Página de clientes
├── financeiro.html       # Página financeira
├── dashboard.html        # Dashboard principal
├── login.html           # Página de login
├── index.html           # Página inicial
├── css/
│   └── styles.css       # Estilos globais
├── js/
│   └── main.js          # Scripts principais
└── imagens/             # Pasta para imagens locais
```

## 🔧 Solução de Problemas

### Erro: "Bucket already exists"
- ✅ Isso é normal! O script verifica se o bucket já existe.

### Erro: "Permission denied"
- ❌ Você precisa de permissões de admin no Supabase
- 💡 Peça ao administrador do projeto para executar o script

### Erro: "Network error"
- ❌ Verifique sua conexão com a internet
- ❌ Confirme se as credenciais do Supabase estão corretas

### Upload não funciona
- ❌ Verifique se as políticas de segurança foram configuradas
- ❌ Confirme se o usuário está logado no sistema

## 🎯 Funcionalidades do Sistema

- ✅ **Autenticação** de usuários
- ✅ **CRUD completo** de produtos, pedidos e clientes
- ✅ **Upload de imagens** para produtos
- ✅ **Controle de estoque** automático
- ✅ **Dashboard** com estatísticas
- ✅ **Interface moderna** e responsiva

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Confirme se todas as etapas foram seguidas
3. Verifique as configurações do Supabase

**O sistema está pronto para uso!** 🎉
