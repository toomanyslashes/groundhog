import { Composition, Folder } from "remotion";
import { VIDEO_WIDTH, VIDEO_HEIGHT, VIDEO_FPS } from "./theme";

// --- Playground: Typography ---
import { FontShowcase } from "./playground/typography/FontShowcase";
import { FontComparison } from "./playground/typography/FontComparison";

// --- Playground: Colors ---
import { PaletteShowcase } from "./playground/colors/PaletteShowcase";
import { PaletteComparison } from "./playground/colors/PaletteComparison";
import { warmPalette, coolPalette, vibrantPalette } from "./theme";

// --- Playground: Animations ---
import { SpringDemo } from "./playground/animations/SpringDemo";
import { FadeSlideDemo } from "./playground/animations/FadeSlideDemo";
import { StaggerDemo } from "./playground/animations/StaggerDemo";
import { AnimComparison } from "./playground/animations/AnimComparison";

// --- Playground: Transitions ---
import {
  TransitionFade,
  TransitionSlideLeft,
  TransitionSlideUp,
  TransitionWipe,
  TransitionClockWipe,
} from "./playground/transitions/TransitionDemo";

// --- Scenes: Intro ---
import {
  IntroLogoBounce,
  IntroLogoFade,
  IntroTaglineType,
  IntroTaglineSlide,
  IntroFullA,
  IntroFullB,
  IntroFullC,
} from "./scenes/IntroScene";

// --- Scenes: VoiceMemo ---
import {
  VMWaveform,
  VMMicPulse,
  VMTextBubble,
  VMAISummary,
  VMFullA,
  VMFullB,
} from "./scenes/VoiceMemoScene";

// --- Scenes: Wellbeing ---
import {
  WBMoodGrid,
  WBWorkTimeBar,
  WBLineChart,
  WBFullA,
  WBFullB,
} from "./scenes/WellbeingScene";

// --- Scenes: NewsFeed ---
import {
  NFCardCascade,
  NFSourceBadge,
  NFGlossaryHighlight,
  NFFullA,
  NFFullB,
} from "./scenes/NewsFeedScene";

// --- Scenes: Todo ---
import {
  TDChecklistSlideIn,
  TDCheckmarkDraw,
  TDCalendarIcon,
  TDFullA,
  TDFullB,
} from "./scenes/TodoScene";

// --- Scenes: Chat ---
import {
  CHUserBubble,
  CHTypingDots,
  CHAIReply,
  CHPersonaAvatar,
  CHFullA,
  CHFullB,
} from "./scenes/ChatScene";

// --- Scenes: Outro ---
import {
  OutroIconsConverge,
  OutroAppName,
  OutroCTA,
  OutroFullA,
  OutroFullB,
} from "./scenes/OutroScene";

const W = VIDEO_WIDTH;
const H = VIDEO_HEIGHT;
const FPS = VIDEO_FPS;

// Short demo duration
const DEMO = 3 * FPS; // 3 seconds
const SCENE = 5 * FPS; // 5 seconds
const TRANS = 4 * FPS; // 4 seconds (3 scenes × ~1.5s with transitions)

export const Root: React.FC = () => {
  return (
    <>
      {/* ============================================================ */}
      {/* 0-Typography */}
      {/* ============================================================ */}
      <Folder name="0-Typography">
        <Composition
          id="Font-NotoSansSC"
          component={FontShowcase}
          defaultProps={{ fontKey: "notoSansSC" as const }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Font-ZCOOL-KuaiLe"
          component={FontShowcase}
          defaultProps={{ fontKey: "zcoolKuaiLe" as const }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Font-MaShanZheng"
          component={FontShowcase}
          defaultProps={{ fontKey: "maShanZheng" as const }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Font-LXGWWenKai"
          component={FontShowcase}
          defaultProps={{ fontKey: "lxgwWenKai" as const }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Font-Comparison"
          component={FontComparison}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
      </Folder>

      {/* ============================================================ */}
      {/* 1-Colors */}
      {/* ============================================================ */}
      <Folder name="1-Colors">
        <Composition
          id="Palette-Warm"
          component={PaletteShowcase}
          defaultProps={{ palette: warmPalette }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Palette-Cool"
          component={PaletteShowcase}
          defaultProps={{ palette: coolPalette }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Palette-Vibrant"
          component={PaletteShowcase}
          defaultProps={{ palette: vibrantPalette }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Palette-Comparison"
          component={PaletteComparison}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
      </Folder>

      {/* ============================================================ */}
      {/* 2-Animations */}
      {/* ============================================================ */}
      <Folder name="2-Animations">
        <Composition
          id="Anim-SpringSmooth"
          component={SpringDemo}
          defaultProps={{ preset: "smooth" as const }}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-SpringSnappy"
          component={SpringDemo}
          defaultProps={{ preset: "snappy" as const }}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-SpringBouncy"
          component={SpringDemo}
          defaultProps={{ preset: "bouncy" as const }}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-FadeSlideUp"
          component={FadeSlideDemo}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-ScalePop"
          component={SpringDemo}
          defaultProps={{ preset: "bouncy" as const }}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-Stagger-3f"
          component={StaggerDemo}
          defaultProps={{ delayFrames: 3 }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-Stagger-5f"
          component={StaggerDemo}
          defaultProps={{ delayFrames: 5 }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-Stagger-8f"
          component={StaggerDemo}
          defaultProps={{ delayFrames: 8 }}
          durationInFrames={DEMO}
          fps={FPS}
          width={W}
          height={H}
        />
        <Composition
          id="Anim-Comparison"
          component={AnimComparison}
          durationInFrames={4 * FPS}
          fps={FPS}
          width={W}
          height={H}
        />
      </Folder>

      {/* ============================================================ */}
      {/* 3-Transitions */}
      {/* ============================================================ */}
      <Folder name="3-Transitions">
        <Composition id="Trans-Fade" component={TransitionFade} durationInFrames={TRANS} fps={FPS} width={W} height={H} />
        <Composition id="Trans-SlideLeft" component={TransitionSlideLeft} durationInFrames={TRANS} fps={FPS} width={W} height={H} />
        <Composition id="Trans-SlideUp" component={TransitionSlideUp} durationInFrames={TRANS} fps={FPS} width={W} height={H} />
        <Composition id="Trans-Wipe" component={TransitionWipe} durationInFrames={TRANS} fps={FPS} width={W} height={H} />
        <Composition id="Trans-ClockWipe" component={TransitionClockWipe} durationInFrames={TRANS} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* 4-Scene-Intro */}
      {/* ============================================================ */}
      <Folder name="4-Scene-Intro">
        <Composition id="Intro-LogoBounce" component={IntroLogoBounce} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Intro-LogoFade" component={IntroLogoFade} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Intro-TaglineType" component={IntroTaglineType} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Intro-TaglineSlide" component={IntroTaglineSlide} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Intro-Full-A" component={IntroFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="Intro-Full-B" component={IntroFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="Intro-Full-C" component={IntroFullC} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* 5-Scene-VoiceMemo */}
      {/* ============================================================ */}
      <Folder name="5-Scene-VoiceMemo">
        <Composition id="VM-Waveform" component={VMWaveform} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="VM-MicPulse" component={VMMicPulse} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="VM-TextBubble" component={VMTextBubble} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="VM-AISummary" component={VMAISummary} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="VM-Full-A" component={VMFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="VM-Full-B" component={VMFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* 6-Scene-Wellbeing */}
      {/* ============================================================ */}
      <Folder name="6-Scene-Wellbeing">
        <Composition id="WB-MoodGrid" component={WBMoodGrid} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="WB-WorkTimeBar" component={WBWorkTimeBar} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="WB-LineChart" component={WBLineChart} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="WB-Full-A" component={WBFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="WB-Full-B" component={WBFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* 7-Scene-NewsFeed */}
      {/* ============================================================ */}
      <Folder name="7-Scene-NewsFeed">
        <Composition id="NF-CardCascade" component={NFCardCascade} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="NF-SourceBadge" component={NFSourceBadge} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="NF-GlossaryHighlight" component={NFGlossaryHighlight} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="NF-Full-A" component={NFFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="NF-Full-B" component={NFFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* 8-Scene-Todo */}
      {/* ============================================================ */}
      <Folder name="8-Scene-Todo">
        <Composition id="TD-ChecklistSlideIn" component={TDChecklistSlideIn} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="TD-CheckmarkDraw" component={TDCheckmarkDraw} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="TD-CalendarIcon" component={TDCalendarIcon} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="TD-Full-A" component={TDFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="TD-Full-B" component={TDFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* 9-Scene-Chat */}
      {/* ============================================================ */}
      <Folder name="9-Scene-Chat">
        <Composition id="CH-UserBubble" component={CHUserBubble} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="CH-TypingDots" component={CHTypingDots} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="CH-AIReply" component={CHAIReply} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="CH-PersonaAvatar" component={CHPersonaAvatar} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="CH-Full-A" component={CHFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="CH-Full-B" component={CHFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>

      {/* ============================================================ */}
      {/* A-Scene-Outro */}
      {/* ============================================================ */}
      <Folder name="A-Scene-Outro">
        <Composition id="Outro-IconsConverge" component={OutroIconsConverge} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Outro-AppName" component={OutroAppName} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Outro-CTA" component={OutroCTA} durationInFrames={DEMO} fps={FPS} width={W} height={H} />
        <Composition id="Outro-Full-A" component={OutroFullA} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
        <Composition id="Outro-Full-B" component={OutroFullB} durationInFrames={SCENE} fps={FPS} width={W} height={H} />
      </Folder>
    </>
  );
};
