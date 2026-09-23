# Ordinary Palette

A natural color palette for ordinary interface work: backgrounds, text, and borders. Thirteen families run from step 50 to step 900. Lightness falls the whole way: step 50 stays the lightest, the large drop lands before step 500, and the steps after 500 sit closer together while staying clearly apart, about 5 L each. Chroma starts low, is highest around steps 400–600 (step 600 never exceeds 500, so 500 reads as the main step), then eases without collapsing, so 600–900 keep each family's color. Blue, red, and orange reach the lowest peak chroma found in SEED, Toss TDS, and Montage for the same hue. The other families stay a little quieter. Color families share one lightness on steps 50–200, except yellow, which shares only step 50 so it can carry Toss TDS-level chroma. Gray starts lighter, at L 98, and keeps three steps at L 93 or above for surfaces and borders. From step 400, yellow stays lighter than blue, and yellow 900 is a deep gold that carries text on white and on yellow 100, within 15° of step 50's hue. Cool-gray still ends at a dark 900. Neutral-gray is cool-gray's lightness at chroma 0. The dark scale runs the other way, so each step keeps its role in both modes: dark 50 is a tinted dark surface, dark 500 sits at about the lightness of light 500, and dark 900 is a pale tint for text. It does not reuse the light hex values. White and black ship as opacity scales. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

## Install

```bash
npm install ordinary-palette
```

## JavaScript

```ts
import { blue, colors, darkBlue, whiteOpacity } from "ordinary-palette";

colors.blue[500];
colors["light-blue"][500];
darkBlue[500];
whiteOpacity["40"];
```

Each light family is also a named export: `pink`, `red`, `orange`, `yellow`, `lightGreen`, `green`, `cyan`, `lightBlue`, `blue`, `purple`, `brown`, `coolGray`, and `neutralGray`. Dark families export as `darkPink`, `darkRed`, `darkOrange`, `darkYellow`, `darkLightGreen`, `darkGreen`, `darkCyan`, `darkLightBlue`, `darkBlue`, `darkPurple`, `darkBrown`, `darkCoolGray`, and `darkNeutralGray`, and together as `darkColors`. Opacity scales export as `whiteOpacity` and `blackOpacity`. `yellowLightnessOffset` and `darkLightness` export the documented lightness numbers.

## CSS

```css
@import "ordinary-palette/colors.css";

.notice {
  background: var(--color-blue-500);
  color: var(--color-white-opacity-100);
}

.notice-dark {
  background: var(--color-dark-blue-500);
}
```

Custom properties are named `--color-<family>-<step>` on the light scale and `--color-dark-<family>-<step>` on the dark scale. That includes `--color-cool-gray-500`, `--color-neutral-gray-500`, `--color-dark-cool-gray-500`, `--color-light-blue-500`, `--color-white-opacity-40`, and `--color-black-opacity-05`.

## JSON

```ts
import palette from "ordinary-palette/colors.json" with { type: "json" };

palette.cyan["500"];
palette.dark.blue["500"];
```

## Families

| Family | Light 500 | Dark 500 |
| --- | --- | --- |
| pink | `#e7388d` | `#eb3c90` |
| red | `#ee3828` | `#f23c2b` |
| orange | `#f87500` | `#fc780b` |
| yellow | `#feb700` | `#f2ae00` |
| light-green | `#88b700` | `#8bba0d` |
| green | `#26a95e` | `#2bac61` |
| cyan | `#00bcbc` | `#0fbfbf` |
| light-blue | `#00abee` | `#07aef2` |
| blue | `#2b84ff` | `#3388ff` |
| purple | `#8163f1` | `#8466f4` |
| brown | `#985f34` | `#9b6237` |
| cool-gray | `#838a91` | `#797e83` |
| neutral-gray | `#898989` | `#7d7d7d` |

Steps on every color family, light and dark: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

Light yellow matches blue on step 50. From step 100 it is lighter than blue by this OKLCH L offset: 100 +1.9, 200 +5.8, 300 +11.3, 400 +16.4, 500 +19.5, 600 +19.7, 700 +18.5, 800 +16.1, 900 +10.9.9, 200 +5.8, 300 +11.3, 400 +16.4, 500 +19.6, 600 +21.5, 700 +23, 800 +24.1, 900 +24.4.9, 400 +11.3, 500 +14.3, 600 +16.4, 700 +17.9, 800 +18.8, 900 +19.2. Orange sits near #ff7700 at step 500 (hue 50) and reaches Toss TDS chroma, as does yellow. Pale orange leans toward apricot to carry more chroma. Light-green is a yellow-green (hue 124–130) lighter than green. Brown (hue 52–62) is a low-chroma warm brown between orange and gray. Cyan (hue 195) runs from an aqua like #00ffff to a teal like #008080, and sits lighter than the other families so it can hold its chroma. Light-blue is a sky blue (hue 232–242) that stays lighter than blue from step 300.

Neutral-gray uses chroma 0 at cool-gray's lightness. `#666666` is only an example of that character, not a step in the scale.

Dark cool-gray lightness rises: 50 = 22, 100 = 27, 200 = 33, 300 = 40, 400 = 49, 500 = 59, 600 = 70, 700 = 81, 800 = 90, 900 = 97. Dark chromatic steps 50–200 share L 29, 34, and 40. Dark 500 sits about 1 L above light 500, and dark 900 is a pale tint near L 93. Dark chroma peaks at 500 and is at least 90% of the light peak.

Opacity steps, for both `white-opacity` and `black-opacity`: 00, 05, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.

## 스텝 사용 가이드

이 팔레트에는 primary, surface 같은 의미 역할(토큰)이 없고, 앞으로도 만들지 않습니다. 아래 내용은 규칙이 아니라 실제로 측정해 본 출발점입니다. 숫자는 WCAG 2 대비입니다. 글자는 4.5:1, 아이콘과 입력창 테두리는 3:1이 기준입니다.

### 회색

**라이트:** 페이지·카드 배경은 50과 100, 구분선은 200, 눈에 보이는 테두리는 300입니다. 입력창처럼 반드시 보여야 하는 테두리는 500(3.5:1), 보조 글자는 600(5.7:1), 본문은 800–900입니다.

**다크:** 배경은 다크 50–200, 입력창 테두리는 다크 500(4.2:1), 보조 글자는 다크 600(6.5:1), 본문은 다크 800–900입니다.

### 유색 가족

각 칸은 기준을 처음 통과하는 스텝입니다. "500 채움색에 맞는 글자"는 500 위에서 더 잘 읽히는 글자색과 그 대비입니다. 어두운 글자는 cool-gray 900이고, 다크 스케일에서는 다크 cool-gray 50입니다.

| 가족 | 흰 배경 위 글자 | 흰 글자를 올리는 채움색 | 500 채움색에 맞는 글자 | 100 틴트 위 뱃지 글자 | 흰 배경 위 아이콘 |
| --- | --- | --- | --- | --- | --- |
| pink | 600 | 600 | 어두운 글자 4.2:1 | 700 | 500 |
| red | 600 | 600 | 어두운 글자 4.1:1 | 700 | 400 |
| orange | 700 | 700 | 어두운 글자 5.9:1 | 800 | 600 |
| yellow | 900 | 900 | 어두운 글자 9.4:1 | 900 | 800 |
| light-green | 700 | 700 | 어두운 글자 6.9:1 | 800 | 600 |
| green | 700 | 700 | 어두운 글자 5.4:1 | 800 | 500 |
| cyan | 700 | 700 | 어두운 글자 7.0:1 | 800 | 600 |
| light-blue | 700 | 700 | 어두운 글자 6.3:1 | 800 | 600 |
| blue | 600 | 600 | 어두운 글자 4.6:1 | 700 | 500 |
| purple | 600 | 600 | 흰 글자 4.2:1 | 700 | 400 |
| brown | 500 | 500 | 흰 글자 5.2:1 | 600 | 400 |

다크 스케일 (다크 cool-gray 50 배경):

| 가족 | 다크 50 위 글자 | 500 채움색에 맞는 글자 | 다크 100 틴트 위 뱃지 글자 |
| --- | --- | --- | --- |
| pink | 500 | 어두운 글자 4.6:1 | 700 |
| red | 500 | 어두운 글자 4.5:1 | 700 |
| orange | 400 | 어두운 글자 6.5:1 | 500 |
| yellow | 400 | 어두운 글자 8.9:1 | 500 |
| light-green | 400 | 어두운 글자 7.5:1 | 500 |
| green | 500 | 어두운 글자 5.9:1 | 600 |
| cyan | 400 | 어두운 글자 7.6:1 | 500 |
| light-blue | 400 | 어두운 글자 6.9:1 | 500 |
| blue | 500 | 어두운 글자 5.0:1 | 700 |
| purple | 600 | 어두운 글자 4.3:1 | 700 |
| brown | 600 | 흰 글자 5.0:1 | 700 |

### 쓸 때 알아둘 점

**1. 밝은 가족의 500 채움색에는 어두운 글자를 올립니다.** 어두운 글자는 cool-gray 900입니다.

| 채움색 | 어두운 글자 | 흰 글자 |
| --- | --- | --- |
| orange 500 `#f87500` | ✅ 어두운 글자 5.9:1 | ❌ 흰 글자 2.8:1 |
| yellow 500 `#feb700` | ✅ 어두운 글자 9.4:1 | ❌ 흰 글자 1.8:1 |
| light-green 500 `#88b700` | ✅ 어두운 글자 6.9:1 | ❌ 흰 글자 2.4:1 |
| cyan 500 `#00bcbc` | ✅ 어두운 글자 7.0:1 | ❌ 흰 글자 2.4:1 |
| light-blue 500 `#00abee` | ✅ 어두운 글자 6.3:1 | ❌ 흰 글자 2.6:1 |

**2. pink·red·purple의 흰 글자 버튼은 600부터 씁니다.** 500은 크고 굵은 글자(3:1)에만 씁니다.

| 가족 | 500 | 600 |
| --- | --- | --- |
| pink | ⚠️ 500 `#e7388d` + 흰 글자 3.9:1 | ✅ 600 `#d01f7b` + 흰 글자 5.0:1 |
| red | ⚠️ 500 `#ee3828` + 흰 글자 4.0:1 | ✅ 600 `#d81d0f` + 흰 글자 5.1:1 |
| purple | ⚠️ 500 `#8163f1` + 흰 글자 4.2:1 | ✅ 600 `#6f50dc` + 흰 글자 5.4:1 |

**3. 흰 배경 위 단독 아이콘은 600 이상을 씁니다.** 아이콘은 3:1이 기준입니다.

| 가족 | 500 아이콘 | 600 아이콘 |
| --- | --- | --- |
| orange | ❌ 500 2.8:1 | ✅ 600 3.6:1 |
| light-green | ❌ 500 2.4:1 | ✅ 600 3.3:1 |
| cyan | ❌ 500 2.4:1 | ✅ 600 3.3:1 |
| light-blue | ❌ 500 2.6:1 | ✅ 600 3.5:1 |

**4. yellow를 글자로 쓸 때는 900만 씁니다.**

| 글자 | 흰 배경 위 | yellow 100 위 |
| --- | --- | --- |
| yellow 500 `#feb700` | ❌ 1.8:1 | ❌ 1.5:1 |
| yellow 700 `#d28f00` | ❌ 2.7:1 | ❌ 2.3:1 |
| yellow 800 `#b57a00` | ❌ 3.7:1 | ❌ 3.1:1 |
| yellow 900 `#916000` | ✅ 5.4:1 | ✅ 4.6:1 |

**5. 50·100 틴트만으로 카테고리를 구분하지 않습니다.** 옅은 틴트는 가족끼리 거의 같아 보입니다(ΔE 0.03 미만). 틴트 위에 700–800 글자나 아이콘을 함께 올립니다.

| 가족 | 틴트 | 채움색 |
| --- | --- | --- |
| pink/red | 100끼리 ΔE 0.023 | 500끼리 ΔE 0.127 |
| light-blue/blue | 100끼리 ΔE 0.013 | 500끼리 ΔE 0.111 |
| cyan/light-blue | 100끼리 ΔE 0.031 | 500끼리 ΔE 0.100 |

**6. hover와 pressed 상태는 라이트에서 한 단계 어둡게(600 → 700), 다크에서 한 단계 밝게 씁니다.**

### 색각 이상 시뮬레이션

적색약·녹색약·청색약을 Machado(2009) 모델로 시뮬레이션해서, 500끼리 거의 같아 보이는 조합을 찾았습니다. 정상 시각에서 이웃 가족끼리는 모두 ΔE 0.10 이상 떨어집니다.

| 시뮬레이션 | 500에서 헷갈리는 조합 (ΔE OK 0.07 미만) |
| --- | --- |
| 정상 시각 | 없음 |
| 적색약 (protan) | red/brown 0.013, yellow/light-green 0.050, blue/purple 0.058 |
| 녹색약 (deutan) | pink/green 0.059, red/green 0.063, orange/light-green 0.010, blue/purple 0.026 |
| 청색약 (tritan) | pink/red 0.043, pink/orange 0.067, green/blue 0.053, cyan/light-blue 0.023 |

차트처럼 색만으로 구분해야 할 때 쓰기 좋은 500 순서: blue → orange → brown → yellow → cyan → pink. 앞에서부터 고르면 정상 시각과 세 가지 시뮬레이션 모두에서 서로 떨어진 최소 거리가 4색 ΔE 0.117, 5색 0.094, 6색 0.067입니다. 0.07보다 작아지는 개수부터는 색 외에 모양이나 라벨을 함께 씁니다.

- **성공과 오류를 red와 green만으로 구분하지 않습니다.** 녹색약(남성의 약 5%)에게는 red 500과 green 500이 거의 같아 보입니다. 아이콘(✓, !)이나 문구를 함께 씁니다.
- 적색약에게는 red와 brown, 녹색약에게는 blue와 purple, 청색약에게는 cyan과 light-blue가 거의 같아 보입니다. 이 쌍을 나란히 쓸 때는 명도를 두 단계 이상 벌리거나(예: red 500과 brown 800) 라벨을 붙입니다.

### 실제 화면 적용 예시

카드, 폼, 알림이 있는 흔한 화면에 스텝을 대입해 본 예시입니다. 토큰이 아니라 "이 요소에는 이 스텝이 맞았다"는 기록입니다. 괄호 안은 카드 배경(라이트 cool-gray 50, 다크 cool-gray 100)과의 대비이고, 뱃지와 배너는 배경색과 글자색 사이의 대비입니다.

| 요소 | 라이트 (카드 배경 대비) | 다크 (카드 배경 대비) |
| --- | --- | --- |
| 페이지 배경 | white `#ffffff` | dark cool-gray 50 `#161b20` |
| 카드 배경 | cool-gray 50 `#f7f8fa` | dark cool-gray 100 `#22272c` |
| 카드 테두리 | cool-gray 200 `#e7eaed` (1.1:1) | dark cool-gray 200 `#31363b` (1.2:1) |
| 제목 | cool-gray 900 `#1c2023` (15.4:1) | dark cool-gray 900 `#f4f5f6` (13.8:1) |
| 본문 | cool-gray 700 `#454b51` (8.3:1) | dark cool-gray 800 `#dcdee0` (11.2:1) |
| 보조 글자 | cool-gray 600 `#61686f` (5.3:1) | dark cool-gray 700 `#bec1c5` (8.3:1) |
| 입력창 테두리 | cool-gray 500 `#838a91` (3.3:1) | dark cool-gray 500 `#797e83` (3.7:1) |
| 링크 | blue 700 `#0861cf` (5.5:1) | dark blue 700 `#81b9ff` (7.4:1) |
| 오류 문구 | red 600 `#d81d0f` (4.8:1) | dark red 700 `#ff9282` (6.9:1) |
| 기본 버튼 | blue 600 + 흰 글자 (4.6:1) | dark blue 500 + 어두운 글자 (5.0:1) |
| 성공 뱃지 | green 100 + green 800 (5.0:1) | dark green 100 + dark green 700 (6.2:1) |
| 경고 배너 | yellow 100 + yellow 900 (4.6:1) | dark yellow 100 + dark yellow 700 (7.9:1) |
| 오류 배너 | red 100 + red 800 (6.3:1) | dark red 100 + dark red 700 (5.6:1) |

- 링크는 카드 배경 위에서 blue 600이 4.3:1로 모자라서 700을 씁니다. 흰 배경 위라면 600(4.6:1)도 됩니다.
- 카드 테두리(1.1–1.2:1)는 장식용 구분선입니다. 카드 배경과 페이지 배경의 차이가 작으므로, 카드 구분이 꼭 필요하면 테두리를 300으로 올리거나 그림자를 함께 씁니다.

위의 표와 수치는 모두 `scripts/usage-table.ts`가 팔레트에서 계산합니다. 색이 바뀌어 표가 어긋나면 `npm test`가 실패합니다. 다시 만들 때는 `node --experimental-strip-types scripts/usage-table.ts`를 실행합니다.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks steps 50–900, `#RRGGBB` solids, lightness falling from 50 to 900 with the larger drop before 500, steps after 500 at least 3.4 L apart with 900 keeping 62% of peak chroma, a dark scale that rises from a tinted dark 50 to a pale 900, shared lightness on color steps 50–200, a dense pale gray end, blue, red, and orange at reference peak chroma, blue chroma higher at 500 than at 50 and 900, yellow 900 within 15° of yellow 50 and clearly lighter than blue 900, dark peak chroma at least 0.9× light peak chroma, neutral-gray at chroma 0, and chroma-only gamut mapping. The preview gallery runs at <http://127.0.0.1:43123> and lists both scales, each hex, and measured OKLCH L.

## License

MIT
