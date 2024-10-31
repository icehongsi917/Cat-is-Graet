let hasSpawnedYellow = false; // 노란색 이미지가 생성되었는지 확인하는 변수

function createWanderingImage() {
    const img = new Image();
    img.src = '도넛.gif'; // 일반 도넛 이미지 URL
    img.classList.add('wandering-image');

    // 20% 확률로 노란색 필터 적용
    if (!hasSpawnedYellow && Math.random() < 0.2) {
        img.style.filter = 'hue-rotate(60deg)'; // 노란색 효과
        hasSpawnedYellow = true; // 노란색 이미지 생성되었음을 기록

        // 노란색 이미지 클릭 시 이동할 URL
        img.addEventListener('click', function() {
            window.location.href = 'tack a look.html'; // 원하는 URL로 변경
        });
    }

    // Set initial position
    img.style.position = 'absolute';
    img.style.left = `${Math.random() * window.innerWidth}px`;
    img.style.top = `${Math.random() * window.innerHeight}px`;

    // Set initial rotation
    img.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Append the image to the body
    document.body.appendChild(img);

    // Enable dragging and prevent copying
    makeDraggable(img);

    // Start automatic wandering with random timing
    startWandering(img);
}

function makeDraggable(img) {
    let offsetX, offsetY;
    let rotation = 0;

    // Set initial cursor style
    img.style.cursor = 'grab';

    img.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Prevent default dragging behavior

        offsetX = e.clientX - img.getBoundingClientRect().left;
        offsetY = e.clientY - img.getBoundingClientRect().top;

        // Change cursor to grabbing
        img.style.cursor = 'grabbing';

        // Add mousemove listener
        document.addEventListener('mousemove', mouseMoveHandler);
        // Add mouseup listener
        document.addEventListener('mouseup', mouseUpHandler);
    });

    function mouseMoveHandler(e) {
        // Calculate new position
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        // Update position
        img.style.transition = 'none'; // Disable transition during drag
        img.style.left = `${newX}px`;
        img.style.top = `${newY}px`;

        // Update rotation
        rotation += 5; // Adjust rotation speed
        img.style.transform = `rotate(${rotation}deg)`;
    }

    function mouseUpHandler() {
        // Reset cursor style
        img.style.cursor = 'grab';

        // Enable transition back
        img.style.transition = 'left 0.2s ease, top 0.2s ease, transform 0.2s ease';

        // Remove mousemove listener
        document.removeEventListener('mousemove', mouseMoveHandler);
        // Remove mouseup listener
        document.removeEventListener('mouseup', mouseUpHandler);
    }

    // Prevent image copying (right-click context menu)
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Prevent the context menu from appearing
    });

    // Play sound on image click
    img.addEventListener('click', function() {
        const audio = new Audio('도나츠.mp3'); // Change to your audio file path
        audio.volume = 1.0; // Set volume to maximum
        audio.play();
    });
}

function startWandering(img) {
    const randomDelay = Math.random() * 3000 + 2000; // Random delay between 2 to 5 seconds

    setInterval(() => {
        const newX = Math.random() * window.innerWidth;
        const newY = Math.random() * window.innerHeight;

        // Animate the image to the new position
        img.style.transition = 'left 2s ease, top 2s ease';
        img.style.left = `${newX}px`;
        img.style.top = `${newY}px`;
    }, randomDelay);
}

// Create multiple wandering images periodically
setInterval(createWanderingImage, 6000);
