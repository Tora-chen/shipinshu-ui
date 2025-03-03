<template>
  <button
      @click="toggleCollection"
      class="collection-btn"
      :class="{ 'is-collected': isCollected }"
      :disabled="isLoading"
  >
    <span v-if="isLoading" class="loading-icon">
      <!-- Spinner SVG -->
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor"/>
      </svg>
    </span>
    <span v-else>
      <!-- Bookmark Filled SVG (for collected state) -->
      <svg v-if="isCollected" class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <!-- Bookmark Plus SVG (for uncollected state) -->
      <svg v-else class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 7V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 10H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {{ isCollected ? '收藏课程' : '已收藏课程' }}
    </span>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'
import {API_URLS} from '@/config/api';

export default {
  name: 'CollectionButton',
  props: {
    lectureId: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['collection-changed'],
  setup(props, { emit }) {
    const isCollected = ref(false)
    const isLoading = ref(false)
    const collectedCourses = ref([])

    const fetchCollectedCourses = async () => {
      try {
        const response = await fetch(API_URLS.getUserCollection,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        if (response.ok) {
          collectedCourses.value = await response.json()
          checkIfCollected()
        } else {
          console.error('Failed to fetch collected courses')
        }
      } catch (error) {
        console.error('Error fetching collected courses:', error)
      }
    }

    const checkIfCollected = () => {
      isCollected.value = collectedCourses.value.some(course => course.id.toString() === props.lectureId.toString())
    }

    const toggleCollection = async () => {
      if (isLoading.value) return

      isLoading.value = true

      try {
        let response;
        if (isCollected.value) {
          // Uncollect the lecture
          response = await fetch(API_URLS.userCollection + '/' + props.lectureId, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        } else {
          // Collect the lecture
          response = await fetch(API_URLS.userCollection, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              lectureId: props.lectureId.toString()
            })
          })
        }

        if (response.ok) {
          isCollected.value = !isCollected.value
          const message = await response.text()
          console.log(message) // "Lecture collected successfully!" or "Lecture uncollected successfully!"

          // Update the collectedCourses array
          if (isCollected.value) {
            // Add the course to collectedCourses if it's not already there
            if (!collectedCourses.value.some(course => course.id.toString() === props.lectureId.toString())) {
              collectedCourses.value.push({ id: props.lectureId })
            }
          } else {
            // Remove the course from collectedCourses
            collectedCourses.value = collectedCourses.value.filter(course => course.id.toString() !== props.lectureId.toString())
          }

          // Emit event to parent component
          emit('collection-changed', {
            lectureId: props.lectureId,
            isCollected: isCollected.value
          })
        } else {
          console.error(`Failed to ${isCollected.value ? 'uncollect' : 'collect'} the lecture`)
        }
      } catch (error) {
        console.error('Error toggling collection:', error)
      } finally {
        isLoading.value = false
      }
    }

    onMounted(fetchCollectedCourses)

    return {
      isCollected,
      isLoading,
      toggleCollection
    }
  }
}
</script>

<style scoped>
.collection-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.collection-btn:hover {
  background-color: #e5e7eb;
}

.collection-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.collection-btn.is-collected {
  background-color: #dbeafe;
  border-color: #bfdbfe;
  color: #1d4ed8;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.loading-icon {
  display: inline-flex;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>