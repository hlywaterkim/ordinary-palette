# ordinary-palette 작업 플랜

GitHub: https://github.com/hlywaterkim/ordinary-palette

이 파일만 읽고 바로 이어서 작업한다. 시맨틱 토큰, 테마, 컴포넌트 토큰은 만들지 않는다.

## 지금 상태

패키지 `ordinary-palette` 0.2.0, MIT. `prepublishOnly`가 `npm test`(빌드 포함)를 돌린다. 라이트·다크 스케일과 white/black opacity가 있다. 최신 곡선은 `main`에 푸시되어 있다. npm에는 아직 배포하지 않았다.

가족: pink, red, orange, yellow, light-green, green, cyan, light-blue, blue, purple, brown, cool-gray, neutral-gray. (예전 이름: lime → light-green, teal → cyan, cloudy-blue → light-blue)

스텝: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

## 규칙

1. 색값은 직접 고친다. Toss, Tailwind, Open Color, LifeT hex를 복사하지 않는다. 곡선 형태만 참고한다.
2. 명도는 50이 가장 밝고 900이 가장 어둡다. 큰 하락은 500 전이다. 한 가족 안에서 700–900이 뭉치지 않게, blue 기준 600 이후 스텝마다 6.5 L 이상 떨어지고 blue 900은 L 35 이하다(500 이후 약 7.5 L 간격). yellow와 회색을 뺀 유색 가족은 200–900 인접 스텝이 라이트·다크 모두 ΔE OK 0.065–0.105 사이다(스텝 하나 = 비슷한 시각 차이). 50–200은 배경용이라 더 촘촘하다.
3. 50–200은 유색 가족끼리 명도와 채도를 맞춘다(라이트 0.017, 0.036, 0.070 / 다크 0.040, 0.062, 0.085, sRGB가 못 담으면 한계까지. brown은 더 낮게). 단 yellow는 50만 맞추고 100부터 더 밝다(Toss 수준 채도를 sRGB 안에 넣기 위해). 회색은 따로 더 밝게 시작한다(50은 L 97.5 이상, L 93 이상 3스텝). 표면과 테두리용이다. yellow와 회색을 뺀 유색 가족은 전 스텝에서 blue 명도와 1.3 L 안이다(orange만 300은 +1.5 L, 400부터 +3 L 위에서 ±1.3. 주황은 밝아야 SEED carrot 수준 채도 0.19가 나온다)(Toss TDS 2025처럼 명도 곡선 하나를 공유해서 같은 스텝이 같은 밝기로 보인다). 그 대가로 같은 스텝끼리는 색각 이상에서 헷갈리는 조합이 늘어나니, README 가이드에 라벨·스텝 섞기를 안내한다. 노랑 900은 파랑 900보다 8 이상 밝고, hue는 노랑 50과 15° 안이다. 노랑 600–900은 빠르게 내려가서 900이 흰 배경과 yellow 100 위에서 글자(4.5:1 이상)로 읽힌다.
4. 채도는 50에서 낮고, 400–600에서 가장 높고, 900에서 조금 내려간다. 무너뜨리지 않는다. 900 채도는 400–600 최고값의 50% 이상이다. 단 그 명도·hue에서 sRGB가 담을 수 있는 채도가 그보다 낮으면 sRGB 한계까지다(cyan). 500이 메인 스텝으로 보이도록 600 채도는 500을 넘지 않는다. yellow를 뺀 모든 유색 가족은 700 위 흰 글자가 4.5:1 이상, 100 위 800 글자가 4.5:1 이상이다. 또 yellow를 뺀 모든 유색 가족은 600이 흰 배경 위 글자이자 흰 글자 채움색이다(4.5:1 이상). 그래서 light-green·green·cyan 600은 blue 600 명도에 맞춘다. 다크 500 위 어두운 글자(다크 cool-gray 50)도 4.5:1 이상이다(red는 다크 500을 0.4 L 올린다). yellow는 900이 그 역할을 한다. pink는 hue 356(진짜 분홍)으로 red와 500에서 ΔE 0.1 이상 떨어진다. blue·red·orange의 최고 채도는 SEED·Toss·Montage 같은 hue의 최저값 이상이다(0.198, 0.219, 0.17). 그래야 짙은 스텝이 갈색으로 모이지 않고 가족 색이 남는다.
5. light-green은 yellow와 green 사이 연두(hue 124–133, 600–900은 올리브로 보이지 않게 초록 쪽), cyan은 #00ffff–teal(#008080) 계열 청록(hue 195), light-blue는 cyan과 blue 사이 하늘색(hue 232–242, 인쇄 cyan #00aeef와 같은 자리)이다. orange 500은 채도 0.19의 쨍한 주황(hue 44)이고, 300–900 hue는 53, 47, 44, 43, 42, 42, 42로 짙을수록 붉다. red는 3° 더 붉게(hue 약 27) 두어 orange와 500에서 ΔE 0.07 이상 떨어진다. purple은 hue 288로 indigo보다 살짝 보라 쪽이다. brown은 orange와 회색 사이의 따뜻한 갈색(hue 56–64)으로, 채도는 최고 0.11 이하로 낮게 두고 orange 500과 ΔE 0.1 이상 떨어진다. 명도가 같으므로 채도와 hue로만 떨어진다. 전체 채도는 sRGB가 허락하는 만큼 쨍하게 둔다. orange·yellow는 500에서 Toss TDS 채도 이상이다(0.173, 0.154). yellow는 최고 0.155 이상, 200은 0.09 이상, 900은 0.10 이상(L 53에서 sRGB 한계). 옅은 orange는 살구색(hue 60) 쪽이다.
6. neutral-gray는 채도 0이고, 같은 스케일의 cool-gray 명도를 따른다.
7. 다크는 방향이 반대다. 다크 50은 어두운 틴트 배경(L 33 이하), 다크 900은 밝은 틴트(L 90 이상)로, 스텝의 역할이 두 모드에서 같다. SEED·Toss와 같은 방식이다. 다크 50–200은 가족끼리 명도를 맞춘다. 다크 500은 라이트 500과 명도 4 안이다. 다크 최고 채도 / 라이트 최고 채도는 0.9 이상이다. 라이트 hex를 재사용하지 않는다. 가멋 밖이면 채도만 낮춘다.
8. 시각 보정: 명도는 공유 곡선을 지키고, 눈으로 어긋나는 건 채도·hue로만 고친다(명도를 바꾸면 같은 스텝의 대비가 달라진다). purple 700–900 채도 비율은 blue 이하, 다크 blue·purple 300은 채도 0.115, 400은 0.155 이하(H-K 효과). 확인은 미리보기의 "같은 스텝 비교"로 한다.
9. 공개 API는 `colors`, 가족 export, `colors.json`, `--color-<family>-<step>`, `--color-dark-<family>-<step>`이다.

숫자와 오프셋의 기준은 `src/palette.ts`와 `tests/colors.test.ts`다. 이 문서에 적은 hex는 오래될 수 있으니 테스트가 우선이다.

## 고치는 곳

- `src/palette.ts` — 색과 오프셋
- `tests/colors.test.ts` — 규칙을 테스트로 고정
- `scripts/write-assets.ts` — CSS, JSON 생성
- `examples/preview` — 미리보기. 배경은 흰색. 거의 흰 무채색 칩만 옅은 회색 테두리
- `README.md`(한국어, 기본), `README.en.md`(영어) — 가족, 스텝, 곡선이 바뀌면 둘 다 같이 고친다. 상단은 커버, 태그라인, 언어 링크 순서다. 영어판은 가이드 표 대신 요약과 한국어 링크를 둔다
- `scripts/write-swatches.ts` — README 색 이미지(`docs/palette-*.svg`, `docs/families/*.svg`, `docs/color-vision.svg`, 명도 곡선 `docs/curve-*-lightness.svg`)를 만든다. `npm run build`가 함께 돌린다
- `design/cover.html` — ORDINARY 시리즈 커버(`docs/cover.jpg`, 소셜 프리뷰 `docs/social-preview.jpg`). Figma에서 받은 `design/bg.svg`(파란 방사형 그라디언트)와 `design/logo.svg`(흰 워드마크, 2560 프레임 기준 크기로 가운데 정렬) 위에 글로우, 할레이션(로고 둘레 주황 번짐 + 밝은 곳의 따뜻한 넓은 글로우), 렌즈 색수차, 필름 그레인, Bayer 디더를 이 순서로 올린다. 고정 시드라 같은 파일은 늘 같은 이미지다. 캔버스가 자기 픽셀을 읽으므로 `design/`을 http로 띄워서 `.cover`를 1280×640에서 `body[data-ready]` 뒤에 렌더링한다. 커버는 device scale 2·JPEG 90, 소셜 프리뷰는 scale 1·JPEG 92(1MB 이하)
- `scripts/usage-table.ts` — README "스텝 사용 가이드"의 표와 수치(유색 가족, 쓸 때 알아둘 점, 색각 이상 시뮬레이션, 실제 화면 예시)를 만든다. 색이 바뀌면 다시 돌려 README 표를 바꾼다(`npm test`가 어긋나면 실패)

`npm test`는 빌드 후 테스트를 돌린다. 미리보기는 `npm run preview`이고 포트는 43123이다.

## 요청이 있을 때만

아래는 시작하지 않는다. 사용자가 고르면 그 항목만 한다.

1. npm 배포. 버전을 올리고 `npm test` 후, 배포 허락이 있으면 publish한다.
2. ~~미리보기에 400·500을 버튼과 배경으로 쓰는 예시 한 블록.~~ 완료(`400 and 500 in use`).
3. 본문 후보(900 on 50, 50 on 900)의 대비를 재고, 실패 스텝만 보고한다. 팔레트를 임의로 바꾸지 않는다.
