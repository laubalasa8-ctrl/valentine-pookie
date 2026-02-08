document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    let noClickCount = 0;
    const maxClicks = 10;

    const noMessages = [
        "Nej? 🤨",
        "Verkligen? 👀",
        "Tänk på det... 🥺",
        "Du kan ändra dig! 😉",
        "Kom igen! 🙌",
        "Nästan där! 🎯",
        "Du vet du vill! 😘",
        "ALLVARLIGT? 😱",
        "Sista chansen! ⚠️",
        "BARA JA KVAR! 🎉"
    ];

    noBtn.addEventListener('click', function() {
        addScreenShake();
        
        if (noClickCount < maxClicks) {
            noBtn.textContent = noMessages[noClickCount];
            yesBtn.style.padding = `${15 + (noClickCount * 3)}px ${30 + (noClickCount * 8)}px`;
            yesBtn.style.fontSize = `${1.1 + (noClickCount * 0.3)}em`;
            noBtn.style.transform = `translateX(${Math.random() * 30 - 15}px) translateY(${Math.random() * 30 - 15}px)`;
            noClickCount++;
        } else {
            noBtn.style.opacity = '0';
            noBtn.style.pointerEvents = 'none';
        }
    });

    yesBtn.addEventListener('click', function() {
        addScreenShake();
        addScreenFlash();
        createFallingHearts();
        showSuccess();
        createConfetti();
    });
});

function showSuccess() {
    document.querySelector('.buttons-container').style.display = 'none';
    
    const heading = document.querySelector('h1');
    if (heading) {
        heading.style.display = 'none';
    }
    
    const oldVideo = document.querySelector('.video-header');
    if (oldVideo) {
        oldVideo.style.display = 'none';
    }
    
    const videoElement = document.createElement('video');
    videoElement.className = 'success-video';
    videoElement.style.width = '100%';
    videoElement.style.height = 'auto';
    videoElement.style.minHeight = '250px';
    videoElement.style.borderRadius = '15px';
    videoElement.style.marginBottom = '20px';
    videoElement.style.backgroundColor = '#000';
    videoElement.style.display = 'block';
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;
    
    const source = document.createElement('source');
    source.src = 'Piki.MP4';
    source.type = 'video/mp4';
    videoElement.appendChild(source);
    
    // Fallback text
    videoElement.textContent = 'Din webbläsare stöder inte videouppspelning';
    
    document.querySelector('.card').appendChild(videoElement);
    
    // Försök att spela videon
    videoElement.play().catch(function(error) {
        console.log('Videouppspelning misslyckades:', error);
    });
    
    const arrowContainer = document.createElement('div');
    arrowContainer.className = 'arrow-container';
    arrowContainer.innerHTML = '<span class="arrow-text">det här är vi btw</span><span class="arrow">↑</span>';
    arrowContainer.style.marginBottom = '20px';
    document.querySelector('.card').appendChild(arrowContainer);
    
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.style.display = 'block';
    successMsg.innerHTML = '💕 Jag visste att du skulle klicka på ja, min pookie patochie, jag älskar dig mest 💕';
    document.querySelector('.card').appendChild(successMsg);
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = Math.random() > 0.5 ? '#f5576c' : '#f093fb';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

function addScreenShake() {
    const card = document.querySelector('.card');
    if (!card) return;
    card.classList.remove('screen-shake');
    void card.offsetWidth;
    card.classList.add('screen-shake');
}

function addScreenFlash() {
    const body = document.body;
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    flash.style.pointerEvents = 'none';
    flash.style.animation = 'screenFlash 0.3s ease-out forwards';
    body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 300);
}

function createFallingHearts() {
    const heartCount = 100;
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-hearts';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3500);
        }, i * 30);
    }
}
