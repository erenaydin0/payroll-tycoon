import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'tests/e2e',use:{baseURL:'http://127.0.0.1:5173'},webServer:{command:'npm run dev',url:'http://127.0.0.1:5173',reuseExistingServer:true},projects:[{name:'desktop',use:{viewport:{width:1280,height:720}}},{name:'landscape-mobile',use:{viewport:{width:844,height:390},isMobile:true,hasTouch:true}}]});
