(() => {
    const $ = document.querySelector.bind(document);

    let timeRotate = 7000;
    let currentRotate = 0;
    let isRotating = false;
    const wheel = $('.wheel');
    const btnWheel = $('.btn--wheel');
    const showMsg = $('.msg');
    let listGift = [{
            text: '₹150',
            percent: 5 / 100,
        },
        {
            text: '₹200',
            percent: 5 / 100,
        },
        {
            text: '₹50',
            percent: 5 / 100,
        },
        {
            text: 'Try again',
            percent: 30 / 100,
        },
        {
            text: '₹500',
            percent: 15 / 100,
        },
        {
            text: '₹100',
            percent: 10 / 100,
        },
        {
            text: '₹1000',
            percent: 15 / 100,
        },
        {
            text: 'Try again',
            percent: 15 / 100,
        },
    ];


    const size = listGift.length;


    const rotate = 360 / size;


    const skewY = 90 - rotate;

    listGift.map((item, index) => {

        const elm = document.createElement('li');


        elm.style.transform = `rotate(${
			rotate * index
		}deg) skewY(-${skewY}deg)`;


        if (index % 2 === 0) {
            elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-1">
			<b>${item.text}</b>
		</p>`;
        } else {
            elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-2">
		<b>${item.text}</b>
		</p>`;
        }


        wheel.appendChild(elm);
    });


    const start = () => {
        showMsg.innerHTML = '';
        isRotating = true;

        const random = Math.random();


        const gift = getGift(random);


        currentRotate += 360 * 10;


        rotateWheel(currentRotate, gift.index);


        showGift(gift);
    };


    const rotateWheel = (currentRotate, index) => {
        $('.wheel').style.transform = `rotate(${
			
			currentRotate - index * rotate - rotate / 2
		}deg)`;
    };

    const getGift = randomNumber => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {

            currentPercent += item.percent;


            if (randomNumber <= currentPercent) {
                list.push({
                    ...item,
                    index
                });
            }
        });

        return list[0];
    };

    /**reward msg**/
    const showGift = gift => {
        let timer = setTimeout(() => {
            isRotating = false;
            if (gift.text === "Try again") {
                showMsg.innerHTML = "Better Luck Next Time....!";
            } else {
                showMsg.innerHTML = `Congratulations you won Gift Card worth ${gift.text}`;
                window.alert(`Congratulations you won Gift Card worth "${gift.text} Redeem now`)
            }
            clearTimeout(timer);
        }, timeRotate);
    };


    btnWheel.addEventListener('click', () => {
        !isRotating && start();
        showMsg.innerHTML = "";

    });
})();
