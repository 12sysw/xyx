/**
 * 主应用模块 - 初始化和协调各个功能模块
 */

// 使app.js也使用ES模块
import { initCube, cubeControl } from './cube.js';

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('3D相册初始化中...');
    
    // 检测设备类型
    updateDeviceType();
    
    // 初始化视频文件夹
    initializeVideoFolder();
    
    // 初始化立方体
    initializeCube();
    
    // 添加页面可见性变化监听器
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    console.log('3D相册初始化完成');
});

/**
 * 更新设备类型
 */
function updateDeviceType() {
    window.isMobile = window.innerWidth < 768;
    
    // 更新META视口，优化移动设备体验
    if (window.isMobile) {
        // 对移动设备添加额外处理
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
        
        // 移动设备可能需要调整一些视觉效果
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
}

/**
 * 初始化视频文件夹
 */
function initializeVideoFolder() {
    // 确保video文件夹存在
    console.log('初始化视频文件夹...');
    
    // 这只是模拟，实际创建文件夹需要服务器端支持
    // 检查是否已经初始化
    if (!localStorage.getItem('videoFolderInitialized')) {
        // 在localStorage中记录文件夹已初始化
        localStorage.setItem('videoFolderInitialized', 'true');
        localStorage.setItem('videoFolderCreatedAt', new Date().toISOString());
        console.log('视频文件夹初始化完成');
    } else {
        console.log('视频文件夹已存在');
    }
}

/**
 * 初始化立方体
 */
function initializeCube() {
    try {
        // 使用导入的initCube函数
        initCube();
        
        // 将cubeControl挂载到全局对象，以便其他非ES模块脚本使用
        window.cubeControl = cubeControl;
        
        console.log('立方体初始化完成');
    } catch (error) {
        console.error('初始化立方体失败:', error);
    }
}

/**
 * 处理页面可见性变化
 * 当页面在后台时暂停某些效果，恢复时继续
 */
function handleVisibilityChange() {
    if (document.hidden) {
        // 页面不可见，暂停耗费资源的动画
        pauseHeavyAnimations();
    } else {
        // 页面可见，恢复动画
        resumeAnimations();
    }
}

/**
 * 暂停耗费资源的动画
 */
function pauseHeavyAnimations() {
    // 暂停视频播放
    const videos = document.querySelectorAll('.cube-video');
    videos.forEach(video => {
        if (!video.paused) {
            video.pause();
            video.dataset.wasPlaying = 'true';
        }
    });
    
    // 暂停自动旋转
    if (typeof pauseAutoRotate === 'function') {
        pauseAutoRotate();
    }
}

/**
 * 恢复动画
 */
function resumeAnimations() {
    // 恢复之前播放的视频
    const videos = document.querySelectorAll('.cube-video');
    videos.forEach(video => {
        if (video.dataset.wasPlaying === 'true') {
            video.play().catch(e => console.log('视频恢复播放失败:', e));
            delete video.dataset.wasPlaying;
        }
    });
    
    // 恢复自动旋转
    if (typeof resumeAutoRotate === 'function') {
        resumeAutoRotate();
    }
}

/**
 * 显示错误消息
 */
function showError(message) {
    console.error('错误:', message);
    
    const errorDiv = document.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = message;
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    } else {
        alert(message);
    }
}

// 添加全局错误处理
window.addEventListener('error', function(e) {
    console.error('全局错误:', e.message);
    
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = '发生错误: ' + e.message;
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}); 