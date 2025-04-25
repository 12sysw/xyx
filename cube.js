/**
 * 立方体控制模块 - 包括旋转、交互和选择功能
 */

// 全局变量
let isRotating = true; // 是否自动旋转
let isDragging = false; // 是否正在拖拽
let activeFace = null; // 当前激活的面
let startX, startY; // 拖拽起点
let rotationX = 10, rotationY = 0; // 旋转角度
let lastRotationX = 10, lastRotationY = 0; // 上次旋转角度
let touchStartX, touchStartY; // 触摸起点

// 立方体面的信息
const facePositions = {
    'front': { rotateX: 0, rotateY: 0 },
    'back': { rotateX: 0, rotateY: 180 },
    'right': { rotateX: 0, rotateY: 90 },
    'left': { rotateX: 0, rotateY: -90 },
    'top': { rotateX: 90, rotateY: 0 },
    'bottom': { rotateX: -90, rotateY: 0 }
};

/**
 * 初始化立方体控制
 */
function initCubeControl() {
    const cube = document.getElementById('cube');
    const cubeWrapper = document.getElementById('cube-wrapper');
    const stage = document.getElementById('stage');
    const playPauseBtn = document.getElementById('play-pause-btn');
    
    // 添加自动旋转类
    if (isRotating) {
        cubeWrapper.classList.add('auto-rotate');
    }
    
    // 播放/暂停按钮
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            isRotating = !isRotating;
            
            if (isRotating) {
                cubeWrapper.classList.add('auto-rotate');
                this.textContent = '暂停旋转';
                
                // 重置选中状态
                if (activeFace) {
                    activeFace.classList.remove('active');
                    activeFace = null;
                }
            } else {
                cubeWrapper.classList.remove('auto-rotate');
                this.textContent = '继续旋转';
            }
        });
    }
    
    // 面的点击事件 - 选择特定面
    const faces = cube.querySelectorAll('.cube-face');
    faces.forEach(face => {
        face.addEventListener('click', function(e) {
            // 仅当不是拖拽结束时才处理点击
            if (!isDragging) {
                e.stopPropagation();
                
                // 移除自动旋转
                isRotating = false;
                cubeWrapper.classList.remove('auto-rotate');
                if (playPauseBtn) {
                    playPauseBtn.textContent = '继续旋转';
                }
                
                // 移除之前的激活状态
                if (activeFace) {
                    activeFace.classList.remove('active');
                }
                
                // 设置新的激活面
                this.classList.add('active');
                activeFace = this;
                
                // 获取面的位置信息
                const faceName = this.getAttribute('data-face');
                const position = facePositions[faceName];
                
                // 旋转到选中的面
                rotateToFace(position.rotateX, position.rotateY);
                
                // 触发视频选择
                const videoInput = document.getElementById('video-input');
                if (videoInput) {
                    videoInput.setAttribute('data-target-face', this.id);
                    videoInput.click();
                }
                
                // 让立方体展开
                cube.classList.add('explode');
                
                // 5秒后自动恢复
                setTimeout(() => {
                    // 恢复立方体
                    cube.classList.remove('explode');
                    // 恢复旋转
                    isRotating = true;
                    cubeWrapper.classList.add('auto-rotate');
                    if (playPauseBtn) {
                        playPauseBtn.textContent = '暂停旋转';
                    }
                }, 5000);
            }
        });
    });
    
    // 鼠标拖拽旋转功能
    stage.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    
    // 触摸屏幕拖拽旋转功能
    stage.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    // 初始化立方体面的预览内容
    updateCubeFaces();
}

/**
 * 旋转到指定面
 */
function rotateToFace(rotateX, rotateY) {
    const cubeWrapper = document.getElementById('cube-wrapper');
    
    // 保存当前旋转角度
    lastRotationX = rotateX;
    lastRotationY = rotateY;
    rotationX = rotateX;
    rotationY = rotateY;
    
    // 应用旋转动画
    cubeWrapper.style.transition = 'transform 0.8s ease';
    cubeWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // 动画结束后移除过渡效果
    setTimeout(() => {
        cubeWrapper.style.transition = '';
    }, 800);
}

/**
 * 处理拖拽开始
 */
function handleDragStart(e) {
    if (isRotating) return;
    
    isDragging = true;
    
    // 获取起始坐标
    if (e.type === 'mousedown') {
        startX = e.clientX;
        startY = e.clientY;
    }
    
    // 停止自动旋转
    const cubeWrapper = document.getElementById('cube-wrapper');
    cubeWrapper.classList.remove('auto-rotate');
    
    // 清除过渡效果，以实现平滑拖拽
    cubeWrapper.style.transition = '';
    
    // 阻止默认行为和冒泡
    e.preventDefault();
}

/**
 * 处理拖拽移动
 */
function handleDragMove(e) {
    if (!isDragging) return;
    
    // 计算拖拽距离
    const deltaX = (e.clientX - startX) * 0.5;
    const deltaY = (e.clientY - startY) * 0.5;
    
    // 更新旋转角度
    rotationX = lastRotationX - deltaY;
    rotationY = lastRotationY + deltaX;
    
    // 限制X轴旋转范围
    rotationX = Math.max(-90, Math.min(90, rotationX));
    
    // 应用旋转
    const cubeWrapper = document.getElementById('cube-wrapper');
    cubeWrapper.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

/**
 * 处理拖拽结束
 */
function handleDragEnd() {
    // 短时间内认为是点击而非拖拽
    setTimeout(() => {
        isDragging = false;
    }, 10);
    
    // 保存结束时的旋转角度
    lastRotationX = rotationX;
    lastRotationY = rotationY;
}

/**
 * 处理触摸开始
 */
function handleTouchStart(e) {
    if (isRotating) return;
    
    if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        // 停止自动旋转
        const cubeWrapper = document.getElementById('cube-wrapper');
        cubeWrapper.classList.remove('auto-rotate');
        cubeWrapper.style.transition = '';
    }
    
    // 阻止默认滚动行为
    e.preventDefault();
}

/**
 * 处理触摸移动
 */
function handleTouchMove(e) {
    if (!isDragging) return;
    
    if (e.touches.length === 1) {
        // 计算触摸距离
        const deltaX = (e.touches[0].clientX - touchStartX) * 0.5;
        const deltaY = (e.touches[0].clientY - touchStartY) * 0.5;
        
        // 更新旋转角度
        rotationX = lastRotationX - deltaY;
        rotationY = lastRotationY + deltaX;
        
        // 限制X轴旋转范围
        rotationX = Math.max(-90, Math.min(90, rotationX));
        
        // 应用旋转
        const cubeWrapper = document.getElementById('cube-wrapper');
        cubeWrapper.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
    
    // 阻止默认滚动行为
    e.preventDefault();
}

/**
 * 处理触摸结束
 */
function handleTouchEnd() {
    // 短时间内认为是点击而非拖拽
    setTimeout(() => {
        isDragging = false;
    }, 10);
    
    // 保存结束时的旋转角度
    lastRotationX = rotationX;
    lastRotationY = rotationY;
}

/**
 * 更新立方体面的显示
 */
function updateCubeFaces() {
    const cube = document.getElementById('cube');
    const faces = cube.querySelectorAll('.cube-face');
    
    faces.forEach(face => {
        // 获取面的名称
        const faceName = face.getAttribute('data-face');
        
        // 检查该面是否有视频
        const videoData = getVideoForFace(faceName);
        
        if (videoData) {
            // 有视频数据，创建视频元素
            face.innerHTML = '';
            
            if (videoData.videoUrl) {
                // 从视频URL创建视频
                const video = document.createElement('video');
                video.className = 'cube-video';
                video.loop = true;
                video.muted = true;
                video.autoplay = true;
                video.playsInline = true;
                video.src = videoData.videoUrl;
                face.appendChild(video);
                
                // 尝试播放视频
                video.play().catch(e => console.log('视频自动播放失败:', e));
            } else {
                // 显示需要重新上传的提示
                face.innerHTML = `
                    <div class="face-placeholder">
                        <div>此面有保存的视频<br>请点击重新上传</div>
                    </div>
                `;
            }
        } else {
            // 没有视频，显示提示
            face.innerHTML = `
                <div class="face-placeholder">
                    <div>点击添加视频</div>
                </div>
            `;
        }
    });
}

/**
 * 加载视频到立方体面
 */
function loadVideoFromFolder(fileName, face) {
    if (!face) return;
    
    // 视频文件路径
    const videoUrl = `video/${fileName}`;
    
    // 创建视频元素
    const video = document.createElement('video');
    video.className = 'cube-video';
    video.controls = true;
    video.playsInline = true;
    video.muted = false;
    video.autoplay = false;
    video.loop = true;
    video.src = videoUrl;
    
    // 清除面的当前内容
    face.innerHTML = '';
    
    // 添加视频到面
    face.appendChild(video);
    
    console.log(`视频已加载到面: ${face.id}, 源: ${videoUrl}`);
    
    return true;
}

// 导出必要的函数和变量
const cubeControl = {
    init: initCubeControl,
    updateCubeFaces: updateCubeFaces,
    rotateToFace: rotateToFace,
    loadVideoFromFolder: loadVideoFromFolder
};

// 初始化函数，由app.js调用
function initCube() {
    initCubeControl();
}

// 导出模块
export { initCube, cubeControl }; 