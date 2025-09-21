# penghu


### 2025/09/21

### 地圖
```
pages/
└── map/
    ├── MapLayout.vue          ← 地圖主頁面 Layout（負責狀態與邏輯控制）
    └── components/
        ├── Map.vue            ← 地圖顯示元件（縮放拖拉與顯示座標點）
        ├── Info.vue           ← 顯示地圖資訊元件（下方資訊欄）
        └── Equipment.vue      ← 顯示設備資訊元件

shared/
└── data/
    └── map/
        └── data.json      ← 所有地圖座標資料

```

### MapLayout.vue
設定 activePointsIndex 來控制要顯示的錯誤座標點 index

---