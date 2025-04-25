/**
 * 媒体处理模块 - 处理视频选择和播放
 */

// 全局变量
const faceIndexMap = {
    'front': 0,
    'back': 1,
    'right': 2,
    'left': 3,
    'top': 4,
    'bottom': 5
};
const faceNameMap = ['front', 'back', 'right', 'left', 'top', 'bottom'];

// 导入立方体控制模块
import { cubeControl } from './cube.js';

// 在DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取视频输入元素
    const videoInput = document.getElementById('video-input');
    
    // 添加视频选择事件处理
    if (videoInput) {
        videoInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            // 获取目标面ID
            const targetFaceId = videoInput.getAttribute('data-target-face');
            const targetFace = document.getElementById(targetFaceId);
            
            if (!targetFace) {
                showError('找不到目标面，无法添加视频');
                return;
            }
            
            // 检查文件类型
            if (!isVideoFile(file)) {
                showError('请选择有效的视频文件');
                return;
            }
            
            // 处理视频文件
            handleVideoFile(file, targetFace);
            
            // 清除文件输入，以便下次选择同一文件也能触发事件
            videoInput.value = '';
        });
    }
    
    // 检查文件是否为视频
    function isVideoFile(file) {
        const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        return validTypes.includes(file.type);
    }
    
    // 处理视频文件
    function handleVideoFile(file, face) {
        // 显示加载消息
        showMessage('正在处理视频...', 'loading');
        
        // 将视频添加到立方体面
        if (cubeControl) {
            // 保存视频到video文件夹
            saveVideoToFolder(file, face);
        } else {
            showError('无法访问立方体控制模块');
        }
    }
    
    // 保存视频到文件夹
    function saveVideoToFolder(file, face) {
        // 创建一个FormData对象模拟文件上传
        const formData = new FormData();
        formData.append('video', file);
        
        // 显示视频正在保存的消息
        showMessage('正在保存视频...', 'loading');
        
        try {
            // 创建唯一的文件名 - 使用时间戳和面ID
            const timestamp = Date.now();
            const fileName = `video_${timestamp}_${face.id}.mp4`;
            
            // 视频文件路径 - 在真实应用中，这里会涉及服务器端处理
            const videoPath = `video/${fileName}`;
            
            // 创建视频URL - 在真实应用中，这会是服务器端文件的URL
            // 这里使用Blob URL作为演示
            const videoURL = URL.createObjectURL(file);
            
            console.log(`视频已保存: ${fileName}, URL: ${videoURL}`);
            
            // 添加视频到面
            if (cubeControl) {
                cubeControl.loadVideoFromFolder(fileName, face);
                
                // 创建视频数据对象以保存到localStorage
                const videoData = {
                    faceId: face.id,
                    fileName: fileName,
                    videoUrl: videoPath,
                    originalName: file.name,
                    timestamp: timestamp,
                    size: file.size,
                    type: file.type
                };
                
                // 保存视频数据
                if (window.storage) {
                    window.storage.saveVideo(videoData);
                    showSuccess('视频已成功添加和永久保存');
                } else {
                    showError('无法保存视频数据');
                }
            }
        } catch (error) {
            console.error('保存视频失败:', error);
            showError('视频保存失败');
        }
    }
    
    // 显示成功消息
    function showSuccess(message) {
        showMessage(message, 'success');
    }
    
    // 显示错误消息
    function showError(message) {
        showMessage(message, 'error');
    }
    
    // 显示消息
    function showMessage(text, type) {
        let messageEl;
        
        if (type === 'success') {
            messageEl = document.getElementById('success-message');
        } else if (type === 'error') {
            messageEl = document.getElementById('error-message');
        } else {
            // 如果没有匹配的类型，创建一个临时消息
            messageEl = document.createElement('div');
            messageEl.className = `message ${type}-message`;
            document.body.appendChild(messageEl);
        }
        
        if (messageEl) {
            messageEl.textContent = text;
            messageEl.style.display = 'block';
            
            // 3秒后隐藏消息
            if (type !== 'loading') {
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 3000);
            }
        }
    }
}); 