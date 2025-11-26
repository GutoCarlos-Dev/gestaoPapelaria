// Script para criar o bucket de imagens no Supabase Storage
// Execute este script uma vez para configurar o bucket necessário para upload de imagens

const { createClient } = require('@supabase/supabase-js');

// Configurações do Supabase (mesmas do seu projeto)
const SUPABASE_URL = 'https://akzaqssyvmdbubdlymnl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFremFxc3N5dm1kYnViZGx5bW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzA2NTEsImV4cCI6MjA3OTc0NjY1MX0.k3kut3jsHVtp8XRjUnnyj09-LmBZ-AvZd1H4qVc0WhY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function createImageBucket() {
    try {
        console.log('🔄 Criando bucket "imagens-produtos"...');

        // Criar o bucket
        const { data, error } = await supabase.storage.createBucket('imagens-produtos', {
            public: true, // Permite acesso público às imagens
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            fileSizeLimit: 5242880 // 5MB por arquivo
        });

        if (error) {
            if (error.message.includes('already exists')) {
                console.log('✅ Bucket "imagens-produtos" já existe!');
                return;
            }
            throw error;
        }

        console.log('✅ Bucket "imagens-produtos" criado com sucesso!');
        console.log('📋 Configurações aplicadas:');
        console.log('   - Público: Sim');
        console.log('   - Tipos MIME permitidos: JPEG, PNG, GIF, WebP');
        console.log('   - Limite de tamanho: 5MB por arquivo');

        // Verificar se o bucket foi criado
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();

        if (listError) {
            console.warn('⚠️ Não foi possível verificar a criação do bucket:', listError.message);
        } else {
            const bucketExists = buckets.some(bucket => bucket.name === 'imagens-produtos');
            if (bucketExists) {
                console.log('✅ Verificação: Bucket criado e listado com sucesso!');
            }
        }

        console.log('\n🎯 Próximos passos:');
        console.log('1. No painel do Supabase, vá para Storage > imagens-produtos > Policies');
        console.log('2. Adicione estas políticas de segurança:');
        console.log('');
        console.log('   Para SELECT (leitura):');
        console.log('   bucket_id = \'imagens-produtos\'');
        console.log('');
        console.log('   Para INSERT (upload):');
        console.log('   bucket_id = \'imagens-produtos\'');
        console.log('   AND auth.role() = \'authenticated\'');
        console.log('');
        console.log('3. Teste o upload de imagens na página de produtos!');

    } catch (error) {
        console.error('❌ Erro ao criar bucket:', error.message);

        if (error.message.includes('permission')) {
            console.log('\n💡 Dica: Você precisa de permissões de admin no Supabase para criar buckets.');
            console.log('   Peça ao administrador do projeto para executar este script.');
        }

        process.exit(1);
    }
}

// Executar a função
createImageBucket();
