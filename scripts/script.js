function gerar(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value.trim();
    if (!descricao) {
        alert("Por favor, digite uma descrição.");
        return;
    }

    const numeroAleatorio = Math.floor(Math.random() * 100000);
    const imagemURL = `https://lipsum.app/random/300x300?${numeroAleatorio}`;

    let imagens = JSON.parse(localStorage.getItem('imagens')) || [];

    imagens.push(imagemURL);

    localStorage.setItem('imagens', JSON.stringify(imagens));

    alert('Imagem gerada com sucesso! Vá até a Galeria para visualizá-la.');
}

function carregarGaleria() {
    const galeria = document.getElementById('galeria');
    if (!galeria) return;

    const imagens = JSON.parse(localStorage.getItem('imagens')) || [];

    galeria.innerHTML = '';

    imagens.forEach((url, index) => {
        const container = document.createElement('div');
        container.classList.add('imagem-container');

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Imagem gerada ${index + 1}`;
        img.classList.add('img');

        const overlay = document.createElement('div');
        overlay.classList.add('sobreposicao');

        const button = document.createElement('button');
        button.classList.add('button-download');
        button.textContent = 'Download';

        button.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = url;
            link.download = `imagem-${index + 1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        overlay.appendChild(button);
        container.appendChild(img);
        container.appendChild(overlay);
        galeria.appendChild(container);
    });
}


document.addEventListener('DOMContentLoaded', carregarGaleria);
