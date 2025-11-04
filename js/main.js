// Arquivo JavaScript principal para funcionalidades comuns do site Leka Artes

// Função para inicializar o site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacao();
    inicializarModais();
    inicializarFormularios();
    inicializarTooltips();
});

// Função para inicializar navegação ativa
function inicializarNavegacao() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Função para inicializar modais
function inicializarModais() {
    // Fechar modal ao clicar no overlay
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            fecharModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });
}

// Função para inicializar formulários
function inicializarFormularios() {
    // Adicionar validação em tempo real
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validarCampo(this);
            });
        });
    });
}

// Função para inicializar tooltips
function inicializarTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', mostrarTooltip);
        element.addEventListener('mouseleave', esconderTooltip);
    });
}

// Função para mostrar tooltip
function mostrarTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

// Função para esconder tooltip
function esconderTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Função para validar campo
function validarCampo(campo) {
    const valor = campo.value.trim();
    const tipo = campo.type;
    let valido = true;
    let mensagem = '';

    // Remover mensagens de erro anteriores
    removerMensagemErro(campo);

    // Validações específicas por tipo
    switch (tipo) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor && !emailRegex.test(valor)) {
                valido = false;
                mensagem = 'Email inválido';
            }
            break;
        case 'tel':
            const telRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (valor && !telRegex.test(valor)) {
                valido = false;
                mensagem = 'Telefone deve estar no formato (11) 99999-9999';
            }
            break;
        default:
            if (campo.hasAttribute('required') && !valor) {
                valido = false;
                mensagem = 'Este campo é obrigatório';
            }
            break;
    }

    // Validação de tamanho mínimo
    if (campo.hasAttribute('minlength')) {
        const minLength = parseInt(campo.getAttribute('minlength'));
        if (valor.length < minLength) {
            valido = false;
            mensagem = `Mínimo de ${minLength} caracteres`;
        }
    }

    // Mostrar erro se inválido
    if (!valido) {
        mostrarMensagemErro(campo, mensagem);
        campo.classList.add('is-invalid');
    } else {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    }

    return valido;
}

// Função para mostrar mensagem de erro
function mostrarMensagemErro(campo, mensagem) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensagem;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';

    campo.parentNode.insertBefore(errorDiv, campo.nextSibling);
}

// Função para remover mensagem de erro
function removerMensagemErro(campo) {
    const errorMessage = campo.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    campo.classList.remove('is-invalid', 'is-valid');
}

// Função para abrir modal
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar modal
function fecharModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Função para alternar abas
function alternarAba(abaId, containerId) {
    // Esconder todas as abas
    const abas = document.querySelectorAll(`#${containerId} .tab-content`);
    abas.forEach(aba => aba.classList.remove('active'));

    // Remover classe active de todos os botões
    const botoes = document.querySelectorAll(`#${containerId} .tab`);
    botoes.forEach(botao => botao.classList.remove('active'));

    // Mostrar aba selecionada
    const abaAtiva = document.getElementById(abaId);
    if (abaAtiva) {
        abaAtiva.classList.add('active');
    }

    // Adicionar classe active no botão clicado
    event.target.classList.add('active');
}

// Função para formatar moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Função para formatar data
function formatarData(data) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
}

// Função para formatar telefone
function formatarTelefone(telefone) {
    const numero = telefone.replace(/\D/g, '');
    if (numero.length === 11) {
        return `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
    }
    return telefone;
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `alert alert-${tipo}`;
    notificacao.textContent = mensagem;
    notificacao.style.position = 'fixed';
    notificacao.style.top = '20px';
    notificacao.style.right = '20px';
    notificacao.style.zIndex = '3000';
    notificacao.style.minWidth = '300px';

    // Adicionar ao body
    document.body.appendChild(notificacao);

    // Remover automaticamente
    setTimeout(() => {
        notificacao.remove();
    }, duracao);
}

// Função para confirmar ação
function confirmarAcao(mensagem, callback) {
    if (confirm(mensagem)) {
        callback();
    }
}

// Função para copiar para clipboard
function copiarParaClipboard(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarNotificacao('Copiado para a área de transferência!', 'success');
    }).catch(() => {
        mostrarNotificacao('Erro ao copiar', 'danger');
    });
}

// Função para validar formulário
function validarFormulario(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input, select, textarea');
    let valido = true;

    inputs.forEach(input => {
        if (!validarCampo(input)) {
            valido = false;
        }
    });

    return valido;
}

// Função para limpar formulário
function limparFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            removerMensagemErro(input);
            input.classList.remove('is-invalid', 'is-valid');
        });
    }
}

// Função para mostrar loading
function mostrarLoading(elemento) {
    elemento.innerHTML = '<i class="loading-spinner"></i> Carregando...';
    elemento.disabled = true;
}

// Função para esconder loading
function esconderLoading(elemento, textoOriginal) {
    elemento.innerHTML = textoOriginal;
    elemento.disabled = false;
}

// Função para debounce (evitar múltiplas chamadas)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para throttle (limitar frequência de chamadas)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Exportar funções para uso global
window.LekaArtes = {
    abrirModal,
    fecharModal,
    alternarAba,
    validarFormulario,
    limparFormulario,
    mostrarNotificacao,
    confirmarAcao,
    copiarParaClipboard,
    formatarMoeda,
    formatarData,
    formatarTelefone,
    mostrarLoading,
    esconderLoading
};
