1. Android 또는 IOS 개발 환경이 셋팅되어 있지 않다면, 아래 React-Native 가이드를 따라서, Android Studio 또는 Xcode를 설치/셋팅 합니다.
https://reactnative.dev/docs/environment-setup?platform=android

2. "프로젝트 폴더"/src/constants.js 파일의 ID_START, ID_END 상수가 현재 노출되고 있는 작품의 auctionId의 시작과 끝이 맞는지 확인합니다.
   변동사항이 있다면, ID_START, ID_END 상수값을 업데이트합니다.

3. 프로젝트 폴더에서 npm start 명령어로 Metro Server를 실행합니다.

4. npm run android / npm run ios 명령어로 에뮬레이터 및 어플리케이션을 실행합니다.
