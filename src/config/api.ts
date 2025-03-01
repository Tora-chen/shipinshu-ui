export const BASE_URL = 'http://localhost:8080';

const API_BASE_URL = 'http://localhost:8080/api'; // 后端地址

export const API_URLS = {
    base: API_BASE_URL,
    login: `${API_BASE_URL}/login`,
    getUserCollection: `${API_BASE_URL}/user-collection/my`,
    userCollection: `${API_BASE_URL}/user-collection`,
    getRecommendation: `${API_BASE_URL}/lectures/recommendedLecture`,
    getMyLectures: `${API_BASE_URL}/lectures/my`,
    createLecture: `${API_BASE_URL}/lectures`,
    getNotes: (videoId: number) => `${API_BASE_URL}/notes/videoNotes/${videoId}`,
    getLectureVideos: (lectureId: number) => `${API_BASE_URL}/lectures/${lectureId}/videos`,
    getVideoStream: (videoId: number) => `${API_BASE_URL}/videos/${videoId}`,
};
