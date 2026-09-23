# ordinary-palette 작업 플랜

GitHub: https://github.com/hlywaterkim/ordinary-palette

이 파일만 읽고 바로 이어서 작업한다. 시맨틱 토큰, 테마, 컴포넌트 토큰은 만들지 않는다.

## 지금 상태

패키지 `ordinary-palette` 0.2.0, MIT. `prepublishOnly`가 `npm test`(빌드 포함)를 돌린다. 라이트·다크 스케일과 white/black opacity가 있다. 최신 곡선은 `main`에 푸시되어 있다. npm에는 아직 배포하지 않았다.

가족: pink, red, orange, yellow, light-green, green, cyan, light-blue, blue, purple, cool-gray, neutral-gray. (예전 이름: lime → light-green, teal → cyan, cloudy-blue → light-blue)

스텝: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

## 규칙

1. 색값은 직접 고친다. Toss, Tailwind, Open Color, LifeT hex를 복사하지 않는다. 곡선 형태만 참고한다.
2. 명도는 50이 가장 밝고 900이 가장 어둡다. 큰 하락은 500 전이고, 500 이후 간격은 더 좁다. 그래도 600–900이 뭉치지 않게 스텝마다 3.4 L 이상, 500→900은 15.5 L 이상 벌린다.
3. 50–200은 유색 가족끼리 명도를 맞춘다. 단 yellow는 50만 맞추고 100부터 더 밝다(Toss 수준 채도를 sRGB 안에 넣기 위해). 회색은 따로 더 밝게 시작한다(50은 L 97.5 이상, L 93 이상 3스텝). 표면과 테두리용이다. 400부터는 가족마다 명도가 달라도 된다. 노랑 900은 파랑 900보다 밝고, hue는 노랑 50과 15° 안이다.
4. 채도는 50에서 낮고, 400–600에서 가장 높고, 900에서 조금 내려간다. 무너뜨리지 않는다. 900 채도는 400–600 최고값의 62% 이상이다. blue·red·orange의 최고 채도는 SEED·Toss·Montage 같은 hue의 최저값 이상이다(0.198, 0.219, 0.176). 그래야 짙은 스텝이 갈색으로 모이지 않고 가족 색이 남는다.
5. light-green은 yellow와 green 사이 연두(hue 124–130), cyan은 #00ffff–teal(#008080) 계열 청록(hue 195), light-blue는 cyan과 blue 사이 하늘색(hue 232–242, 인쇄 cyan #00aeef와 같은 자리)이다. orange 500은 #ff7700 근처(hue 50)다. 전체 채도는 sRGB가 허락하는 만큼 쨍하게 둔다. light-green·light-blue는 300부터 각각 green·blue보다 밝다. orange·yellow는 500·600에서 Toss TDS 채도 이상이다(0.173, 0.154). yellow는 최고 0.155 이상, 200은 0.09 이상, 900은 0.12 이상. 옅은 orange는 살구색(hue 60) 쪽으로 기울여 채도를 확보한다.
6. neutral-gray는 채도 0이고, 같은 스케일의 cool-gray 명도를 따른다.
7. 다크는 방향이 반대다. 다크 50은 어두운 틴트 배경(L 33 이하), 다크 900은 밝은 틴트(L 90 이상)로, 스텝의 역할이 두 모드에서 같다. SEED·Toss와 같은 방식이다. 다크 50–200은 가족끼리 명도를 맞춘다. 다크 500은 라이트 500과 명도 4 안이다. 다크 최고 채도 / 라이트 최고 채도는 0.9 이상이다. 라이트 hex를 재사용하지 않는다. 가멋 밖이면 채도만 낮춘다.
8. 공개 API는 `colors`, 가족 export, `colors.json`, `--color-<family>-<step>`, `--color-dark-<family>-<step>`이다.

숫자와 오프셋의 기준은 `src/palette.ts`와 `tests/colors.test.ts`다. 이 문서에 적은 hex는 오래될 수 있으니 테스트가 우선이다.

## 고치는 곳

- `src/palette.ts` — 색과 오프셋
- `tests/colors.test.ts` — 규칙을 테스트로 고정
- `scripts/write-assets.ts` — CSS, JSON 생성
- `examples/preview` — 미리보기. 배경은 흰색. 거의 흰 무채색 칩만 옅은 회색 테두리
- `README.md` — 가족, 스텝, 곡선이 바뀌면 같이 고친다

`npm test`는 빌드 후 테스트를 돌린다. 미리보기는 `npm run preview`이고 포트는 43123이다.

## 요청이 있을 때만

아래는 시작하지 않는다. 사용자가 고르면 그 항목만 한다.

1. npm 배포. 버전을 올리고 `npm test` 후, 배포 허락이 있으면 publish한다.
2. ~~미리보기에 400·500을 버튼과 배경으로 쓰는 예시 한 블록.~~ 완료(`400 and 500 in use`).
3. 본문 후보(900 on 50, 50 on 900)의 대비를 재고, 실패 스텝만 보고한다. 팔레트를 임의로 바꾸지 않는다.
