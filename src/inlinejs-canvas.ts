import { CanvasSurfaceCompact } from './components/surface';
import { CanvasRectCompact } from './components/rect';
import { CanvasRoundRectCompact } from './components/round-rect';
import { CanvasGroupCompact } from './components/group';
import { CanvasBoxCompact } from './components/box';
import { CanvasPathCompact } from './components/path';
import { CanvasOpenPathCompact } from './components/open-path';
import { CanvasClosePathCompact } from './components/close-path';
import { CanvasMoveCompact } from './components/move';
import { CanvasLineCompact } from './components/line';
import { CanvasArcCompact } from './components/arc';
import { CanvasCircleCompact } from './components/circle';
import { CanvasTextCompact } from './components/text';
import { CanvasTranslateCompact } from './components/translate';
import { CanvasRotateCompact } from './components/rotate';
import { CanvasScaleCompact } from './components/scale';
import { CanvasAlignCompact } from './components/align';
import { CanvasCenterCompact } from './components/center';
import { WaitForGlobal } from '@benbraide/inlinejs';

WaitForGlobal().then(() => {
    CanvasSurfaceCompact();
    CanvasRectCompact();
    CanvasRoundRectCompact();
    CanvasGroupCompact();
    CanvasBoxCompact();
    CanvasPathCompact();
    CanvasOpenPathCompact();
    CanvasClosePathCompact();
    CanvasMoveCompact();
    CanvasLineCompact();
    CanvasArcCompact();
    CanvasCircleCompact();
    CanvasTextCompact();
    CanvasTranslateCompact();
    CanvasRotateCompact();
    CanvasScaleCompact();
    CanvasAlignCompact();
    CanvasCenterCompact();
});
