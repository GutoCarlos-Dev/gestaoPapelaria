-- Script SQL para criar o bucket de imagens no Supabase Storage
-- Execute este script no SQL Editor do Supabase (Dashboard > SQL Editor)

-- =====================================================
-- CRIAR BUCKET PARA IMAGENS DE PRODUTOS
-- =====================================================

-- Criar o bucket 'imagens-produtos' (se não existir)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'imagens-produtos',
    'imagens-produtos',
    true, -- Público para que as imagens sejam acessíveis via URL
    5242880, -- 5MB por arquivo
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'] -- Tipos MIME permitidos
)
ON CONFLICT (id) DO NOTHING; -- Não fazer nada se já existir

-- =====================================================
-- POLÍTICAS DE SEGURANÇA PARA O BUCKET
-- =====================================================

-- Política para SELECT (visualização/leitura) - Permite acesso público
DROP POLICY IF EXISTS "imagens_produtos_select" ON storage.objects;
CREATE POLICY "imagens_produtos_select" ON storage.objects
FOR SELECT USING (bucket_id = 'imagens-produtos');

-- Política para INSERT (upload) - Apenas usuários autenticados
DROP POLICY IF EXISTS "imagens_produtos_insert" ON storage.objects;
CREATE POLICY "imagens_produtos_insert" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'imagens-produtos'
    AND auth.role() = 'authenticated'
);

-- Política para UPDATE (atualização) - Apenas usuários autenticados
DROP POLICY IF EXISTS "imagens_produtos_update" ON storage.objects;
CREATE POLICY "imagens_produtos_update" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'imagens-produtos'
    AND auth.role() = 'authenticated'
);

-- Política para DELETE (exclusão) - Apenas usuários autenticados
DROP POLICY IF EXISTS "imagens_produtos_delete" ON storage.objects;
CREATE POLICY "imagens_produtos_delete" ON storage.objects
FOR DELETE USING (
    bucket_id = 'imagens-produtos'
    AND auth.role() = 'authenticated'
);

-- =====================================================
-- VERIFICAÇÃO DA CRIAÇÃO
-- =====================================================

-- Verificar se o bucket foi criado
SELECT
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets
WHERE name = 'imagens-produtos';

-- Verificar políticas criadas
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'objects'
AND schemaname = 'storage'
ORDER BY policyname;

-- =====================================================
-- INSTRUÇÕES DE USO
-- =====================================================

/*
COMO USAR ESTE SCRIPT:

1. Acesse o Supabase Dashboard: https://supabase.com
2. Entre no seu projeto
3. No menu lateral esquerdo, clique em "SQL Editor"
4. Cole todo este script no editor
5. Clique em "Run" para executar

RESULTADO ESPERADO:
- Bucket 'imagens-produtos' será criado
- Políticas de segurança serão configuradas
- Usuários poderão fazer upload de imagens quando logados
- Imagens serão públicas e acessíveis via URL

TESTE APÓS EXECUTAR:
1. Abra produtos.html no navegador
2. Faça login no sistema
3. Clique em "Novo Produto"
4. Selecione uma imagem no campo "Foto do Produto (opcional)"
5. Preencha os outros campos obrigatórios
6. Clique em "Salvar Produto"
7. A imagem deve aparecer na card do produto!

*/
