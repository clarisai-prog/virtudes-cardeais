/**
 * PDF Generator Module - Jornada das 3 Âncoras
 * 
 * Responsabilidade: Geração de PDF com lazy loading da biblioteca jsPDF
 * Segue o princípio de Separação de Preocupações (SoC)
 */

// Dados dos capítulos centralizados (fonte única da verdade)
const CHAPTERS_DATA = [
  {
    title: "Âncora 1: Prudência e Justiça (A Ordem da Vida)",
    versiculo: '"A Sabedoria ensina a temperança e a prudência, a justiça e a fortaleza; na vida, nada há mais útil." (Sabedoria 8, 7)',
    resumo: "A verdadeira ordem na vida espiritual nasce do amor, não da obrigação. Priorizar a oração não é uma regra a mais para te cansar, mas um ato de prudência para dar descanso ao seu coração.",
    reflexao: "Muitas vezes, tentamos rezar usando apenas as 'sobras' do nosso tempo. Quando chega a noite, e estamos exaustos, dormimos no meio da leitura e acordamos com aquele peso terrível de dever não cumprido. Livre-se dessa culpa. A Prudência é a inteligência sabendo a hora de agir, e a Justiça é dar a Deus o espaço que Lhe é devido, sem pressa.",
    acao: "Ação Prática: Pegue a agenda do seu celular e bloqueie com carinho 15 minutos do seu dia para Deus. Trate esse encontro como o seu compromisso inadiável de descanso."
  },
  {
    title: "Âncora 2: Fortaleza (A Ciência de Levantar)",
    versiculo: '"Porque sete vezes cai o justo, e se levanta." (Provérbios 24, 16)',
    resumo: "A santidade não ser impecável e nunca cair. A grande mentira do perfeccionismo é fazer você desistir no primeiro tropeço. A fortaleza é ter a coragem suave de se levantar rápido.",
    reflexao: "A Fortaleza não é a ausência de erros, é a ciência de levantar mais rápido. Deus não é um contador anotando seus débitos. Se você caiu, sorria para a sua própria humanidade, perdoe a si mesmo e lembre-se: o seu momento ideal para começar é agora. Retome o caminho sem tentar se punir amanhã.",
    acao: "Ação Prática: Se você escorregar em algum propósito hoje, não se culpe e nem tente compensar com sacrifícios pesados. Apenas recomece imediatamente com o coração leve."
  },
  {
    title: "Âncora 3: Temperança (O Domínio do Conforto)",
    versiculo: '"Todo atleta em tudo se domina; aqueles, para alcançar uma coroa corruptível; nós, porém, a incorruptível." (1 Coríntios 9, 25)',
    resumo: "Vivemos na era do excesso de informações, telas e confortos. A temperança é o freio carinhoso da alma. Pequenas pausas e pequenos 'nãos' fortalecem a liberdade do nosso espírito.",
    reflexao: "A Temperança não é uma privação triste, é o freio de mão da nossa alma. Quem não consegue dizer um simples 'não' para uma notificação de celular, dificilmente terá músculos espirituais para resistir a tentações maiores. Ensine ao seu corpo, em pequenas coisas, que quem dá as ordens é o seu espírito amparado pela graça.",
    acao: "Ação Prática: Atrase um prazer legítimo com leveza hoje. Quando for beber água, coloque o copo na mesa e espere um minuto antes de beber, usando esse tempo apenas para respirar e agradecer."
  }
];

/**
 * Carrega o script jsPDF dinamicamente (Lazy Load)
 * @returns {Promise<void>}
 */
function loadJsPDF() {
  return new Promise((resolve, reject) => {
    // Verifica se já está carregado
    if (window.jspdf || window.jsPDF) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.async = true;
    
    script.onload = () => {
      console.log('[PDF] jsPDF carregado com sucesso');
      resolve();
    };
    
    script.onerror = () => {
      console.error('[PDF] Falha ao carregar jsPDF');
      reject(new Error('Não foi possível carregar a biblioteca de PDF'));
    };

    document.head.appendChild(script);
  });
}

/**
 * Gera e faz download do PDF
 * @param {HTMLElement} btnElement - Botão que acionou o download (para feedback visual)
 */
export async function downloadPDF(btnElement = null) {
  // Feedback visual no botão
  const originalText = btnElement?.innerHTML;
  if (btnElement) {
    btnElement.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Gerando PDF...';
    btnElement.disabled = true;
  }

  try {
    // Lazy load da biblioteca
    await loadJsPDF();

    const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
    if (!jsPDF) {
      throw new Error('Biblioteca jsPDF não disponível');
    }

    const doc = new jsPDF();
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    let y = 20;

    // Cabeçalho
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("A Jornada das 3 Âncoras", margin, y);
    y += 12;

    doc.setFontSize(12);
    doc.setTextColor(115, 17, 212); // Cor primária #7311d4
    doc.text("Prudência e Justiça | Fortaleza | Temperança", margin, y);
    y += 10;

    // Introdução
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const introText = "Esta jornada não é sobre acumular regras ou criar uma lista de exigências moralistas que vão deixar você exausto. É sobre construir a base do seu edifício interior. As virtudes cardeais são ferramentas de graça. Elas não servem para acusar os seus erros, mas para dar estabilidade à sua alma, ordenar a sua rotina sem peso e ensinar você a recomeçar em paz sempre que tropeçar.";
    
    const introLines = doc.splitTextToSize(introText, maxLineWidth);
    doc.text(introLines, margin, y);
    y += introLines.length * 4.5 + 5;

    // Versículo
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    const versiculoLines = doc.splitTextToSize('"Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." (Mateus 11, 28)', maxLineWidth);
    doc.text(versiculoLines, margin, y);
    y += versiculoLines.length * 4.5 + 8;

    // Capítulos
    CHAPTERS_DATA.forEach((ch, index) => {
      // Nova página se necessário
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      // Título do capítulo
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(115, 17, 212);
      const titleLines = doc.splitTextToSize(ch.title, maxLineWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 5 + 3;

      // Versículo
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      const versLines = doc.splitTextToSize(ch.versiculo, maxLineWidth - 5);
      doc.text(versLines, margin + 3, y);
      y += versLines.length * 4 + 4;

      // Resumo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      const resumoLines = doc.splitTextToSize(ch.resumo, maxLineWidth - 5);
      doc.text(resumoLines, margin + 3, y);
      y += resumoLines.length * 4 + 3;

      // Reflexão
      doc.setFont("helvetica", "italic");
      const reflexaoLines = doc.splitTextToSize(ch.reflexao, maxLineWidth - 5);
      doc.text(reflexaoLines, margin + 3, y);
      y += reflexaoLines.length * 4 + 3;

      // Ação Prática
      doc.setFont("helvetica", "bold");
      doc.setTextColor(212, 175, 55); // Cor dourada
      const acaoLines = doc.splitTextToSize(ch.acao, maxLineWidth - 5);
      doc.text(acaoLines, margin + 3, y);
      y += acaoLines.length * 4 + 10;

      // Linha separadora (exceto no último)
      if (index < CHAPTERS_DATA.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y - 5, pageWidth - margin, y - 5);
      }
    });

    // Rodapé
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Jornada das 3 Âncoras - Página ${i} de ${totalPages}`, margin, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save("Jornada_3_Ancoras.pdf");

    if (btnElement) {
      btnElement.innerHTML = '<span class="material-symbols-outlined">check</span> PDF Baixado!';
      setTimeout(() => {
        btnElement.innerHTML = originalText;
        btnElement.disabled = false;
      }, 2000);
    }

  } catch (err) {
    console.error("[PDF] Erro:", err);
    alert("Erro ao gerar PDF: " + err.message);
    
    if (btnElement) {
      btnElement.innerHTML = originalText;
      btnElement.disabled = false;
    }
  }
}

// Exporta os dados dos capítulos para uso em outros módulos se necessário
export { CHAPTERS_DATA };
