// Variables

    /* Ciblage */

        const container = document.querySelector('.container-form');
        const form = document.querySelector('form');
        const containerInput = document.querySelector('.container-inputCouleurs');
        const inputAjoutees = document.querySelector('.container-inputAjoutees');
        const inputRange = document.querySelector('input[type=range]');
        const btnPlus = document.querySelector('.btnPlus');
        const btnMoins = document.querySelector('.btnMoins');
        const btnRandom = document.querySelector('.btnRandom');
        
        let inputsDeBase = document.querySelectorAll('.container-inputCouleurs input[type=text]');
        let tousLesInputs = document.querySelectorAll('input[type=text]');

// Changement de couleur en fonction de la valeur saisie

    tousLesInputs.forEach(input =>
    {
        input.value = couleurRandom();
        input.style.backgroundColor = input.value;
        container.style.background = backgroundReactif(inputRange.value);
    });        
    
// Événements

    /* Bouton + */

        btnPlus.addEventListener('click', (e) =>
        {
            e.preventDefault();

            if(tousLesInputs.length >= 8)
            {
                return;
            }
            else
            {  
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('maxlength', 7);
                input.value = couleurRandom();
                input.style.backgroundColor = couleurRandom();
                input.classList.add('inputAjoute');

                containerInput.appendChild(input);           

                majCouleur();
            }
        });

    /* Bouton - */

        btnMoins.addEventListener('click', (e) =>
        {
            e.preventDefault();
      
            if(tousLesInputs.length <= 2)
            {
                return;
            }
            else
            {
                tousLesInputs[tousLesInputs.length - 1].remove();
            }
            
            majCouleur();
        });

    /* Bouton Random */

        btnRandom.addEventListener('click', (e) =>
        {
            e.preventDefault();

            tousLesInputs.forEach(input =>
            {
                input.style.backgroundColor = couleurRandom();
                input.value = couleurRandom();
            });

            majCouleur();

        });

    /* Input Range */

        inputRange.addEventListener('input', () =>
        {
            container.style.background = backgroundReactif(inputRange.value);
        });

/* Fonctions */

    /* Couleur aléatoire */

        function couleurRandom() 
        {
            let composants = '0123456789ABCDEF';
            let couleur = '#';
            for (let i = 0; i < 6; i++) {
            couleur += composants[Math.floor(Math.random() * 16)];
            }
            return couleur;
        }

        function backgroundReactif(inputRange)
        {
            let debutBackground = `linear-gradient(${inputRange}deg `;
            let finBackground = `)`;
            let couleurs = "";
            
            tousLesInputs.forEach(input =>
            {
                couleurs = couleurs.concat(", ", input.value);
            });

            let background = `${debutBackground}${couleurs}${finBackground}`;

            return background;
        }

        function majCouleur()
        {
            tousLesInputs = document.querySelectorAll('input[type=text]');

            container.style.background = backgroundReactif(inputRange.value);

            tousLesInputs.forEach(input =>
            {
                input.addEventListener('input', () =>
                {
                    input.style.background = input.value;
                    container.style.background = backgroundReactif(inputRange.value);
                });

            });           
        }
