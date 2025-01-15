# sns-project

<h3>1. 프로젝트 소개 </h3>

- 해당 프로그램은 SNS기능을 구현한 프로젝트입니다.

- 서버를 실행하고 설정된 포트 4000번으로 접속하면, 로그인 페이지로 접속됩니다.

  ![login](https://github.com/user-attachments/assets/ce246719-b456-4129-a372-b0b4e8adc427)

- 회원가입 페이지에 들어가면 이메일, 사용자이름, 비밀번호를 작성하여 회원가입을 할 수 있습니다.

  ![signup](https://github.com/user-attachments/assets/fc17a535-ae12-4722-b448-83defc341241)

- 로그인을 하면, 게시글을 올릴 수 있습니다.
 
  ![afterlogin](https://github.com/user-attachments/assets/36fc343c-d367-493c-b4fb-b1e0a2edc28d)

- 포스트 생성하기를 클릭하여 사진과 글을 작성한 후, 생성하기를 누릅니다.

  ![post1](https://github.com/user-attachments/assets/010c7d17-caa5-43ba-a3c7-5520ee192ec7)

  ![post2](https://github.com/user-attachments/assets/768e256b-1441-4fb8-be2c-9809d2442bf3)

- 모든 게시글에 좋아요를 누를 수 있고, 댓글을 작성할 수 있습니다.\

  ![like](https://github.com/user-attachments/assets/65421014-d037-42de-b520-6f17ab62cede)

  ![comments](https://github.com/user-attachments/assets/6e615bd6-6d67-4b87-b30a-2b01498166c4)

- friends에 들어가면, 회원가입된 다른 사용자들을 확인할 수 있고, 친구요청을 눌러 친구를 맺을 수 있습니다.

  ![friends1](https://github.com/user-attachments/assets/f939d946-95a8-487c-9566-21aaaf5f525c)

  ![friends2](https://github.com/user-attachments/assets/09148d89-ba8b-4a79-b1d6-ef8eeb50a6b1)

  ![friends3](https://github.com/user-attachments/assets/05994999-3e90-4c71-9973-b56f8d9f9ea6)

  ![friends4](https://github.com/user-attachments/assets/c443a6c8-dccb-4572-94e6-07a1c6eb4f34)

- 친구의 게시글에 댓글과 좋아요를 누를수 있고, 본인의 댓글만 수정하거나 삭제할 수 있습니다.
  
  ![friends5](https://github.com/user-attachments/assets/5bf49dc5-12a1-46f5-ae3b-bd9a9c17a9c9)

- 사용자 본인의 이름을 클릭하면, 자신의 개인 프로필에 들어갈 수 있으며, 자신이 게시한 게시글을 확인할 수 있습니다.

  ![profile](https://github.com/user-attachments/assets/b1f06867-fc2a-464c-a00a-064c0194c06f)

- 프로필 수정하기를 클릭하여, 본인의 프로필을 수정할 수 있습니다.

  ![profile2](https://github.com/user-attachments/assets/37dde2bb-6163-4238-99f9-868501b00886)

  ![profile3](https://github.com/user-attachments/assets/116c3bb3-f7dc-4395-b866-a7a1fa084c12)

- 사용자 정보는 MongoDB 데이터로 쌓여, users에 쌓이며, 댓글은 comments에 저장됩니다.

  ![mongo1](https://github.com/user-attachments/assets/b72916c4-d183-4ef7-8e99-1c94f9347aed)

  ![mongo2](https://github.com/user-attachments/assets/3520ec96-b85b-494a-8399-e30b88f9f53f)

  <br><hr><br>

<h3>2. 기능 소개</h3>

- 각 기능에 따른 라우터 관리
  
  - 사용자 인증
    # passport와 local 전략을 사용한 사용자 로그인, 로그아웃, 회원가입 기능 구현
    # 소셜 로그인 지원

  - 게시글
    # multer를 사용한 게시글 작성 및 수정 / 삭제
    # 게시글 댓글 표시 및 좋아요 표시

  - 댓글 및 좋아요
    # 특정 게시글에 대해 댓글 생성, 수정, 삭제 기능 제공
    # 특정 게시글에 대해 좋아요/취소 기능 구현

  - 친구 관리
    # 친구 요청/ 요청취소 및 수락 기능 / 친구 삭제 기능 구현

  - 프로필
    # 프로필 조회 및 수정 기능.
    # 특정 사용자 프로필에 연결된 게시글과 정보 확인 가능.

  
- 모델 관리

  - 댓글 모델
    # 댓글 작성 시 작성자 정보를 포함하여 게시글과 연동

  - 게시글 모델
    # 게시글 스키마를 설계하여, 이미지, 댓글, 좋아요 등 SNS 필수 기능 구현.

  - 사용자 모델
    # 사용자 스키마를 설계하고, 비밀번호 암호화.

- 뷰 관리

  # 인증상태에 따라 다른 헤더메뉴 표시.
  # 부트스트랩을 사용하여 UI 표시.
  # 친구 UI는 받은요청/ 알수도 있는사람/ 친구 목록 3가지로 나누어 각 기능 구현.
  # 프로필 UI는 사용자 정보/게시글 두가지를 양 사이드로 나누어 구현.
  
