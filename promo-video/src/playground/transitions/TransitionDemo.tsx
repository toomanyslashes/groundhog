import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { warmPalette } from "../../theme";
import { defaultFont } from "../../fonts";

const SceneBlock: React.FC<{ color: string; label: string; sublabel: string }> = ({
  color,
  label,
  sublabel,
}) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: color,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: defaultFont,
    }}
  >
    <div style={{ fontSize: 64, fontWeight: 700, color: "white" }}>{label}</div>
    <div style={{ fontSize: 32, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>{sublabel}</div>
  </div>
);

const p = warmPalette;
const TIMING = linearTiming({ durationInFrames: 15 });

export const TransitionFade: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.primary} label="Fade" sublabel="淡入淡出" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.accent} label="Scene B" sublabel="场景 B" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.green} label="Scene C" sublabel="场景 C" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const TransitionSlideLeft: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.primary} label="Slide Left" sublabel="左滑" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.accent} label="Scene B" sublabel="场景 B" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.green} label="Scene C" sublabel="场景 C" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const TransitionSlideUp: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.primary} label="Slide Up" sublabel="上滑" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.accent} label="Scene B" sublabel="场景 B" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.green} label="Scene C" sublabel="场景 C" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const TransitionWipe: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.primary} label="Wipe" sublabel="擦除" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe()} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.accent} label="Scene B" sublabel="场景 B" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe()} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.green} label="Scene C" sublabel="场景 C" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const TransitionClockWipe: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.primary} label="Clock Wipe" sublabel="时钟擦除" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={clockWipe({ width: 1080, height: 1920 })} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.accent} label="Scene B" sublabel="场景 B" />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={clockWipe({ width: 1080, height: 1920 })} timing={TIMING} />
    <TransitionSeries.Sequence durationInFrames={45}>
      <SceneBlock color={p.green} label="Scene C" sublabel="场景 C" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
