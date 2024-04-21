import { InitializeGlobalScope, WaitForGlobal } from '@benbraide/inlinejs';
import { AdvancePoint } from './utilities/advance-point';
import { ResolveAngle } from './utilities/angle';
import { RotatePoint } from './utilities/rotate-point';
import { TestPoint } from './utilities/test-point';
import { CheckCircleCollision, CheckRectangleCircleCollision, CheckRectangleCollision, GetIntersectionDirection, GetIntersectionRectangle } from './utilities/shape-collision';
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
import { CanvasEllipseCompact } from './components/ellipse';
import { CanvasTextCompact } from './components/text';
import { CanvasImageCompact } from './components/image';
import { CanvasTranslateCompact } from './components/translate';
import { CanvasRotateCompact } from './components/rotate';
import { CanvasScaleCompact } from './components/scale';
import { CanvasAlignCompact } from './components/align';
import { CanvasCenterCompact } from './components/center';
import { CanvasBodyCompact } from './components/body';
import { CanvasInlineCompact } from './components/inline';
export function InlineJSCanvas() {
    WaitForGlobal().then(() => {
        InitializeGlobalScope('utilities', {
            advancePoint: AdvancePoint,
            rotatePoint: RotatePoint,
            testPoint: TestPoint,
            resolveAngle: ResolveAngle,
            collisions: {
                rectangles: CheckRectangleCollision,
                circles: CheckCircleCollision,
                mixed: CheckRectangleCircleCollision,
                intersection: GetIntersectionRectangle,
                direction: GetIntersectionDirection,
            },
        });
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
        CanvasEllipseCompact();
        CanvasTextCompact();
        CanvasImageCompact();
        CanvasTranslateCompact();
        CanvasRotateCompact();
        CanvasScaleCompact();
        CanvasAlignCompact();
        CanvasCenterCompact();
        CanvasBodyCompact();
        CanvasInlineCompact();
    });
}
