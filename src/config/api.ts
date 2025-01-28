const API_BASE_URL = 'http://localhost:8080/api'; // 后端地址

export const API_URLS = {
    login: `${API_BASE_URL}/login`,
    getUserCollection: `${API_BASE_URL}/user-collection/my`,
    getRecommendation: `${API_BASE_URL}/lectures/recommendedLecture`,
    getMyLectures: `${API_BASE_URL}/lectures/my`,
    getLectureVideos: (lectureId: number) => `${API_BASE_URL}/lectures/${lectureId}/videos`,
    getVideoStream: (videoId: number) => `${API_BASE_URL}/videos/${videoId}`,
};
