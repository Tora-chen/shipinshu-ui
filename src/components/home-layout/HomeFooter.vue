<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>

<template>
    <el-footer class="app-footer">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} My Website. All rights reserved.</p>
        <div class="social-icons">
          <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="icon">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="icon">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="icon">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </el-footer>
  </template>
  
 
  <style scoped>
  .app-footer {
    background-color: #2c3e50;
    color: #ffffff;
    text-align: center;
    padding: 20px 0;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .social-icons {
    margin-top: 10px;
  }
  
  .social-icons .icon {
    margin: 0 10px;
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5em;
  }
  
  .social-icons .icon:hover {
    color: #3498db;
  }
  </style>
  