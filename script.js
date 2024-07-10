fetch('https://api-rachador-de-combustivel.vercel.app/combustiveis')
.then(response => response.json())
.then(data => {
    const combustiveisContainer = document.querySelector('.custom-options')
    data.forEach(combustivel => {
        combustiveisContainer. innerHTML += `
            <span class="custom-option" data-preco="${combustivel.preco}"><span>R$${combustivel.preco}</span><span>${combustivel.combustivel}</span></span>
        `
        const span = document.querySelector('.custom-option');
    });
})
.catch(error => console.error('Erro ao buscar APi', error))



// seleção
setTimeout(function select() {
    document.addEventListener('input', calculate);
    document.addEventListener('click', calculate);
    const customSelect = document.querySelector('.custom-select-trigger');
    const options = document.querySelectorAll('.custom-option');
    const optionsContainer = document.querySelector('.custom-options')
    let getPrice = 0;
    
    customSelect.addEventListener('click', () => {
        optionsContainer.classList.toggle('open');
        document.querySelector('.fa-chevron-down').classList.toggle('open');
    });
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (!option.classList.contains('selected')) {
                clearSelection();
                option.classList.add('selected');
                getPrice = parseFloat(option.dataset.preco);
                setTimeout(() => {
                    optionsContainer.classList.remove('open');
                    document.querySelector('.fa-chevron-down').classList.toggle('open');
                }, 100)
                customSelect.firstChild.textContent = option.lastChild.textContent
            } else {
                option.classList.remove('selected');
            }
            
            document.querySelector('.reset').addEventListener('click', () => {
                document.querySelector('form').reset();
                document.querySelector('#total-value').textContent = '00.00';
                document.querySelector('#person-value').textContent = '00.00';
                document.querySelector('.reset').classList.remove('active');
                option.classList.remove('selected');
                customSelect.firstChild.textContent = 'Selecione'

            })
        })
    });
    
    function clearSelection() {
        options.forEach(option => {
            option.classList.remove('selected');
        })
    }
    
    window.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            optionsContainer.classList.remove('open');
    }})

    // calculo
    function calculate() {
        const consumo = parseFloat(document.querySelector('#km-litro').value.replace(',','.'));
        const distance = parseFloat(document.querySelector('#distance').value.replace(',','.'));
        let numPeople = parseInt(document.querySelector('#num-people').value);

        if (isNaN(numPeople) || numPeople < 1) {
            numPeople = 1;
        }

        if (getPrice && consumo && distance && numPeople > 0) {
            const valorTotal = (distance/consumo) * getPrice;
            const valorPessoa = valorTotal/numPeople;

            document.querySelector('#total-value').textContent = valorTotal.toFixed(2);
            document.querySelector('#person-value').textContent = valorPessoa.toFixed(2);
            document.querySelector('.reset').classList.add('active');
        } else {
            document.querySelector('#total-value').textContent = '00.00';
            document.querySelector('#person-value').textContent = '00.00';
            document.querySelector('.reset').classList.remove('active');
        }
    }
}, 500)


