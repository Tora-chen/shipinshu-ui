<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <nav class="tabs-nav">
        <button v-for="tab in tabs" :key="tab.id" @click="selectTab(tab.id)" class="tab-button"
          :class="{ 'tab-button-active': currentTab === tab.id }">
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <div class="tab-content">
      <slot :name="currentTab"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  currentTab: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:currentTab'])

const selectTab = (tabId) => {
  emit('update:currentTab', tabId)
}
</script>

<style scoped>
.tabs-container {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.tabs-header {
  border-bottom: 1px solid #e5e7eb;
}

.tabs-nav {
  display: flex;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.tab-button:hover {
  color: #374151;
}

.tab-button-active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}

.tab-content {
  padding: 1.5rem;
}
</style>