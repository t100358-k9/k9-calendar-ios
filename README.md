# K9 Calendar iOS Test

第一版 K9 Calendar iOS 測試 App 專案，使用 Capacitor 8 將目前已確認正常的 Calendar HTML 包進原生 iOS 容器。

## 已包含
- `www/index.html`：App 啟動頁，內容就是目前 K9 Calendar
- `www/calendar.html`：同一份 Calendar 備份
- `www/js/k9-db-bridge.js`：K9DB V1 bridge
- `capacitor.config.ts`
- `package.json`
- iOS App 名稱：K9 Calendar
- Bundle ID：`com.k9.calendar.test`
- App icon：`resources/icon/`

## 注意
目前 Calendar 仍以瀏覽器/ WebView 的 LocalStorage 作為 K9DB V1 的本機資料儲存，因此安裝到 iPhone 後，資料會是該 iPhone 上的獨立資料，不會自動與公司電腦同步。

Calendar 內目前引用 SheetJS CDN，因此匯入 Excel 等需要網路時仍需網路連線；核心月曆介面本身包在 App 內。

## 下一階段：iOS 雲端建置
公司 Windows 電腦不需要安裝 Xcode。可將本專案放到 GitHub，再使用支援 Capacitor iOS cloud build 的服務建立 iOS binary。實機安裝需要 Apple Developer 的簽章/Provisioning Profile；TestFlight 是後續建議的測試管道。

## 如果未來有 Mac
```bash
npm install
npx cap sync ios
npx cap open ios
```
