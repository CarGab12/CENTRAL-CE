document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('solicitacaoForm');
  const lista = document.getElementById('listaSolicitacoes');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const setor = document.getElementById('setor').value.trim();
      const descricao = document.getElementById('descricao').value.trim();

      const novaSolicitacao = {
        nome,
        setor,
        descricao,
        data: new Date().toLocaleString()
      };

      const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];
      solicitacoes.push(novaSolicitacao);
      localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

      alert('Solicitação enviada com sucesso!');
      form.reset();
    });
  }

  // Listar solicitações
  if (lista) {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes')) || [];

    if (solicitacoes.length === 0) {
      lista.innerHTML = '<li class="list-group-item">Nenhuma solicitação encontrada.</li>';
    } else {
      solicitacoes.forEach((s, index) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
          <strong>${s.nome}</strong> (${s.setor})<br>
          <small>${s.data}</small><br>
          ${s.descricao}
        `;
        lista.appendChild(item);
      });
    }
  }
});
