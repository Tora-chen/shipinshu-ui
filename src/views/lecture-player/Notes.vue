<template>
  <div class="notes">
    <div v-if="loading">加载中...</div>
    <div v-if="notes.length === 0">这个视频暂时还没有生成笔记哦~</div>
    <ul v-else>
      <li v-for="note in notes" :key="note.id" class="note-item">
        <img :src=imagePathToUrl(note.imagePath) alt="截图" class="note-image" />
        <div class="note-content">
          <p class="timestamp">{{ formatTimestamp(note.timestamp) }}</p>
          <p class="description">{{ note.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {API_URLS, BASE_URL} from '@/config/api';


const notes = ref([]);
const loading = ref(true);

const props = defineProps({
  videoId: {
    type: Number,
    required: true
  }
})

const fetchNotes = async () => {
  try {
    const response = await axios.get(
        API_URLS.getNotes(props.videoId), {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    notes.value = response.data;

  } catch (error) {
    console.error('Error fetching notes:', error);
  } finally {
    loading.value = false;
  }
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toISOString().substr(11, 8);
};

// 将notes中的路径改为url
const imagePathToUrl = (imagePath) => {
  return BASE_URL + imagePath;
};

onMounted(fetchNotes);
</script>


<style scoped>
.notes {
  padding: 10px;
}

.note-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.note-image {
  width: 180px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
}

.note-content {
  display: flex;
  flex-direction: column;
}

.timestamp {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.description {
  font-size: 16px;
  color: #333;
}
</style>
