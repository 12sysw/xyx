/**
 * 存储模块 - 处理视频、音频和自定义文本的本地存储和文件管理
 */

// 存储键定义
const VIDEO_STORAGE_KEY = 'cubeVideos';
const AUDIO_STORAGE_KEY = 'cubeAudio';
const TEXT_STORAGE_KEY = 'cubeTexts';

// 面名数组
const faceNames = ['front', 'back', 'right', 'left', 'top', 'bottom'];

/**
 * 加载视频存储
 * @returns {Object} 所有已保存的视频数据
 */
function loadVideoStorage() {
    try {
        // 从本地存储获取视频数据
        const data = localStorage.getItem(VIDEO_STORAGE_KEY);
        
        // 检查是否有数据
        if (data) {
            return JSON.parse(data);
        }
        
        // 无数据则返回空对象
        return {};
    } catch (error) {
        console.error('加载视频存储失败:', error);
        return {};
    }
}

/**
 * 加载音频存储
 * @returns {Object} 所有已保存的音频数据
 */
function loadAudioStorage() {
    try {
        // 从本地存储获取音频数据
        const data = localStorage.getItem(AUDIO_STORAGE_KEY);
        
        // 检查是否有数据
        if (data) {
            return JSON.parse(data);
        }
        
        // 无数据则返回空对象
        return {};
    } catch (error) {
        console.error('加载音频存储失败:', error);
        return {};
    }
}

/**
 * 加载文本存储
 * @returns {Object} 所有已保存的文本数据
 */
function loadTextStorage() {
    try {
        // 从本地存储获取文本数据
        const data = localStorage.getItem(TEXT_STORAGE_KEY);
        
        // 检查是否有数据
        if (data) {
            return JSON.parse(data);
        }
        
        // 无数据则返回空对象
        return {};
    } catch (error) {
        console.error('加载文本存储失败:', error);
        return {};
    }
}

/**
 * 获取特定面的视频数据
 * @param {string} faceName - 面名称
 * @returns {Object|null} 视频数据或null
 */
function getVideoForFace(faceName) {
    try {
        // 加载存储数据
        const videoData = loadVideoStorage();
        
        // 返回指定面的数据
        return videoData[faceName] || null;
    } catch (error) {
        console.error(`获取面 ${faceName} 的视频数据失败:`, error);
        return null;
    }
}

/**
 * 获取特定面的音频数据
 * @param {string} faceName - 面名称
 * @returns {Object|null} 音频数据或null
 */
function getAudioForFace(faceName) {
    try {
        // 加载存储数据
        const audioData = loadAudioStorage();
        
        // 返回指定面的数据
        return audioData[faceName] || null;
    } catch (error) {
        console.error(`获取面 ${faceName} 的音频数据失败:`, error);
        return null;
    }
}

/**
 * 获取特定面的文本数据
 * @param {string} faceName - 面名称
 * @returns {string} 文本数据或空字符串
 */
function getTextForFace(faceName) {
    try {
        // 加载存储数据
        const textData = loadTextStorage();
        
        // 返回指定面的数据
        return textData[faceName] || '';
    } catch (error) {
        console.error(`获取面 ${faceName} 的文本数据失败:`, error);
        return '';
    }
}

/**
 * 保存视频数据
 * @param {string} faceName - 面名称
 * @param {Object} videoData - 视频数据对象
 */
function saveVideoData(faceName, videoData) {
    try {
        // 加载当前存储
        const currentData = loadVideoStorage();
        
        // 更新数据
        currentData[faceName] = videoData;
        
        // 保存回本地存储
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(currentData));
        
        console.log(`视频数据已保存到面 ${faceName}:`, videoData);
        return true;
    } catch (error) {
        console.error(`保存面 ${faceName} 的视频数据失败:`, error);
        return false;
    }
}

/**
 * 保存音频数据
 * @param {string} faceName - 面名称
 * @param {Object} audioData - 音频数据对象
 */
function saveAudioData(faceName, audioData) {
    try {
        // 加载当前存储
        const currentData = loadAudioStorage();
        
        // 更新数据
        currentData[faceName] = audioData;
        
        // 保存回本地存储
        localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(currentData));
        
        console.log(`音频数据已保存到面 ${faceName}:`, audioData);
        return true;
    } catch (error) {
        console.error(`保存面 ${faceName} 的音频数据失败:`, error);
        return false;
    }
}

/**
 * 保存文本数据
 * @param {string} faceName - 面名称
 * @param {string} text - 文本数据
 */
function saveTextData(faceName, text) {
    try {
        // 加载当前存储
        const currentData = loadTextStorage();
        
        // 更新数据
        currentData[faceName] = text;
        
        // 保存回本地存储
        localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(currentData));
        
        console.log(`文本数据已保存到面 ${faceName}:`, text);
        return true;
    } catch (error) {
        console.error(`保存面 ${faceName} 的文本数据失败:`, error);
        return false;
    }
}

/**
 * 保存文件到指定文件夹
 * @param {File} file - 文件对象
 * @param {string} folderPath - 文件夹路径
 * @returns {Promise<string>} 返回文件路径的Promise
 */
function saveFileToFolder(file, folderPath) {
    return new Promise((resolve, reject) => {
        try {
            // 创建唯一文件名
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
            const filePath = `${folderPath}/${fileName}`;
            
            // 创建文件URL
            const fileURL = URL.createObjectURL(file);
            
            // 假设这是异步操作，实际应用中这里会有真实的文件保存逻辑
            // 在应用中这可能使用服务器端API
            setTimeout(() => {
                console.log(`文件已保存到: ${filePath}`);
                
                // 在实际应用中，这里会返回真实的文件路径
                // 对于前端模拟，我们返回Blob URL
                resolve(fileURL);
            }, 100);
        } catch (error) {
            console.error('保存文件失败:', error);
            reject(error);
        }
    });
}

/**
 * 处理视频选择
 * @param {Event} event - 输入事件
 * @param {string} faceName - 目标面名称
 */
function handleVideoSelection(event, faceName) {
    try {
        // 获取选择的文件
        const file = event.target.files[0];
        
        // 检查是否选择了文件
        if (!file) {
            console.log('未选择文件');
            return;
        }
        
        // 检查文件类型
        if (!file.type.startsWith('video/')) {
            showError('请选择有效的视频文件');
            return;
        }
        
        // 保存到video文件夹
        saveFileToFolder(file, 'video')
            .then(filePath => {
                // 创建视频数据对象
                const videoData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    filePath: filePath,
                    timestamp: Date.now()
                };
                
                // 保存视频数据
                if (saveVideoData(faceName, videoData)) {
                    // 在界面上更新视频
                    if (typeof loadVideoToFace === 'function') {
                        loadVideoToFace(faceName, videoData);
                    }
                    
                    showSuccess('视频已添加');
                } else {
                    showError('视频保存失败');
                }
            })
            .catch(error => {
                showError('视频保存失败: ' + error.message);
            });
    } catch (error) {
        console.error('处理视频选择失败:', error);
        showError('视频选择失败: ' + error.message);
    }
}

/**
 * 处理音频选择
 * @param {Event} event - 输入事件
 */
function handleAudioSelection(event) {
    try {
        // 获取选择的文件
        const file = event.target.files[0];
        
        // 检查是否选择了文件
        if (!file) {
            console.log('未选择文件');
            return;
        }
        
        // 检查文件类型
        if (!file.type.startsWith('audio/')) {
            showError('请选择有效的音频文件');
            return;
        }
        
        // 保存到video文件夹
        saveFileToFolder(file, 'video')
            .then(filePath => {
                // 创建音频数据对象
                const audioData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    filePath: filePath,
                    timestamp: Date.now()
                };
                
                // 保存音频数据 (音频是全局的，不是面特定的)
                if (saveAudioData('global', audioData)) {
                    // 在界面上更新音频
                    if (typeof loadAudio === 'function') {
                        loadAudio(audioData);
                    }
                    
                    showSuccess('音乐已添加');
                } else {
                    showError('音乐保存失败');
                }
            })
            .catch(error => {
                showError('音乐保存失败: ' + error.message);
            });
    } catch (error) {
        console.error('处理音频选择失败:', error);
        showError('音乐选择失败: ' + error.message);
    }
}

/**
 * 清除所有存储的数据
 */
function clearAllStorageData() {
    try {
        // 清除所有存储
        localStorage.removeItem(VIDEO_STORAGE_KEY);
        localStorage.removeItem(AUDIO_STORAGE_KEY);
        localStorage.removeItem(TEXT_STORAGE_KEY);
        
        console.log('所有存储数据已清除');
        return true;
    } catch (error) {
        console.error('清除存储数据失败:', error);
        return false;
    }
}

/**
 * 显示成功消息
 * @param {string} message - 消息文本
 */
function showSuccess(message) {
    if (typeof window.showSuccess === 'function') {
        window.showSuccess(message);
    } else {
        const successEl = document.getElementById('success-message');
        if (successEl) {
            successEl.textContent = message;
            successEl.style.display = 'block';
            setTimeout(() => {
                successEl.style.display = 'none';
            }, 3000);
        } else {
            console.log('SUCCESS:', message);
        }
    }
}

/**
 * 显示错误消息
 * @param {string} message - 消息文本
 */
function showError(message) {
    if (typeof window.showError === 'function') {
        window.showError(message);
    } else {
        const errorEl = document.getElementById('error-message');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            setTimeout(() => {
                errorEl.style.display = 'none';
            }, 3000);
        } else {
            console.error('ERROR:', message);
        }
    }
}

/**
 * 保存视频数据到永久存储
 * @param {Object} videoData - 视频数据对象
 */
function saveVideo(videoData) {
    if (!videoData || !videoData.faceId) {
        console.error('无效的视频数据');
        return false;
    }
    
    try {
        // 获取面ID
        const faceId = videoData.faceId;
        
        // 视频文件名是存储在video文件夹中的
        const fileName = videoData.fileName || `video_${Date.now()}.mp4`;
        const videoPath = `video/${fileName}`;
        
        // 更新数据对象，确保包含正确的视频路径
        videoData.videoUrl = videoPath;
        
        // 获取面名称（从ID中提取）
        const faceName = faceId.replace('face-', '');
        
        console.log(`保存视频到面 ${faceName}，路径: ${videoPath}`);
        
        // 保存视频数据到面
        return saveVideoData(faceName, videoData);
    } catch (error) {
        console.error('保存视频数据失败:', error);
        return false;
    }
}

// 创建全局存储对象，供其他模块使用
window.storage = {
    saveVideo,
    saveVideoData,
    saveTextData,
    saveAudioData,
    getVideoForFace,
    getTextForFace,
    getAudioForFace,
    clearAllStorageData
}; 