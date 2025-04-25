/**
 * 背景效果模块 - 包含星空、流星和漂浮爱心
 */

// 全局变量
let isMobile = window.innerWidth < 768;

/**
 * 初始化星空背景
 */
function initStars() {
    const starsCanvas = document.getElementById('stars');
    const ctx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = isMobile ? 100 : 200;
    
    // 创建随机的星星
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 0.05
        });
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        ctx.fillStyle = 'white';
        
        stars.forEach(star => {
            // 闪烁效果
            star.alpha += star.direction * star.speed;
            
            if (star.alpha <= 0.1) {
                star.direction = 1;
            } else if (star.alpha >= 1) {
                star.direction = -1;
            }
            
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
}

/**
 * 初始化流星效果
 */
function initMeteors() {
    const meteorContainer = document.getElementById('meteor-container');
    
    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        
        // 随机大小和位置
        const size = Math.random() * 150 + 50;
        const top = Math.random() * window.innerHeight;
        const left = Math.random() * window.innerWidth;
        
        meteor.style.width = `${size}px`;
        meteor.style.top = `${top}px`;
        meteor.style.left = `${left}px`;
        meteor.style.transform = `rotate(${Math.random() * 60 + 20}deg)`;
        
        // 随机颜色
        const hue = Math.random() > 0.7 ? '330' : '210';
        meteor.style.background = `linear-gradient(to right, transparent, hsl(${hue}, 100%, 70%))`;
        
        meteorContainer.appendChild(meteor);
        
        // 动画
        const duration = Math.random() * 2 + 1;
        const distance = window.innerWidth + size;
        
        meteor.animate([
            { transform: `translateX(0) rotate(${Math.random() * 60 + 20}deg)`, opacity: 1 },
            { transform: `translateX(${distance}px) rotate(${Math.random() * 60 + 20}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear',
            fill: 'forwards'
        });
        
        // 动画结束后移除
        setTimeout(() => {
            meteor.remove();
            if (document.body.contains(meteorContainer)) {
                createMeteor();
            }
        }, duration * 1000);
    }
    
    // 创建初始流星
    const initialMeteors = isMobile ? 3 : 5;
    for (let i = 0; i < initialMeteors; i++) {
        setTimeout(createMeteor, Math.random() * 2000);
    }
}

/**
 * 创建漂浮的心形
 */
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const colors = ['#ff6b81', '#ff4757', '#ff7979', '#ff6b8b', '#fd79a8'];
    const heartCount = isMobile ? 10 : 15;
    
    // 清除现有的心形
    heartsContainer.innerHTML = '';
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        
        // 随机大小
        const size = Math.random() * 20 + 10;
        
        // 随机颜色
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机位置
        const left = Math.random() * 100;
        
        // 随机动画时间
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        
        heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
        
        // 应用样式
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
    }
}

/**
 * 窗口大小调整处理
 */
function handleResize() {
    window.addEventListener('resize', function() {
        const starsCanvas = document.getElementById('stars');
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        
        // 重新检测设备类型
        const newIsMobile = window.innerWidth < 768;
        if (isMobile !== newIsMobile) {
            isMobile = newIsMobile;
            // 重建背景效果
            initStars();
            initMeteors();
            createFloatingHearts();
        }
    });
}

// 初始化背景效果
document.addEventListener('DOMContentLoaded', function() {
    initStars();
    initMeteors();
    createFloatingHearts();
    handleResize();
});