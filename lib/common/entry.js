"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineJSCanvas = void 0;
const inlinejs_1 = require("@benbraide/inlinejs");
const advance_point_1 = require("./utilities/advance-point");
const angle_1 = require("./utilities/angle");
const rotate_point_1 = require("./utilities/rotate-point");
const test_point_1 = require("./utilities/test-point");
const shape_collision_1 = require("./utilities/shape-collision");
const surface_1 = require("./components/surface");
const rect_1 = require("./components/rect");
const round_rect_1 = require("./components/round-rect");
const group_1 = require("./components/group");
const box_1 = require("./components/box");
const path_1 = require("./components/path");
const open_path_1 = require("./components/open-path");
const close_path_1 = require("./components/close-path");
const move_1 = require("./components/move");
const line_1 = require("./components/line");
const arc_1 = require("./components/arc");
const circle_1 = require("./components/circle");
const ellipse_1 = require("./components/ellipse");
const text_1 = require("./components/text");
const image_1 = require("./components/image");
const translate_1 = require("./components/translate");
const rotate_1 = require("./components/rotate");
const scale_1 = require("./components/scale");
const align_1 = require("./components/align");
const center_1 = require("./components/center");
const body_1 = require("./components/body");
const inline_1 = require("./components/inline");
function InlineJSCanvas() {
    (0, inlinejs_1.WaitForGlobal)().then(() => {
        (0, inlinejs_1.InitializeGlobalScope)('utilities', {
            advancePoint: advance_point_1.AdvancePoint,
            rotatePoint: rotate_point_1.RotatePoint,
            testPoint: test_point_1.TestPoint,
            resolveAngle: angle_1.ResolveAngle,
            collisions: {
                rectangles: shape_collision_1.CheckRectangleCollision,
                circles: shape_collision_1.CheckCircleCollision,
                mixed: shape_collision_1.CheckRectangleCircleCollision,
                intersection: shape_collision_1.GetIntersectionRectangle,
                direction: shape_collision_1.GetIntersectionDirection,
            },
        });
        (0, surface_1.CanvasSurfaceCompact)();
        (0, rect_1.CanvasRectCompact)();
        (0, round_rect_1.CanvasRoundRectCompact)();
        (0, group_1.CanvasGroupCompact)();
        (0, box_1.CanvasBoxCompact)();
        (0, path_1.CanvasPathCompact)();
        (0, open_path_1.CanvasOpenPathCompact)();
        (0, close_path_1.CanvasClosePathCompact)();
        (0, move_1.CanvasMoveCompact)();
        (0, line_1.CanvasLineCompact)();
        (0, arc_1.CanvasArcCompact)();
        (0, circle_1.CanvasCircleCompact)();
        (0, ellipse_1.CanvasEllipseCompact)();
        (0, text_1.CanvasTextCompact)();
        (0, image_1.CanvasImageCompact)();
        (0, translate_1.CanvasTranslateCompact)();
        (0, rotate_1.CanvasRotateCompact)();
        (0, scale_1.CanvasScaleCompact)();
        (0, align_1.CanvasAlignCompact)();
        (0, center_1.CanvasCenterCompact)();
        (0, body_1.CanvasBodyCompact)();
        (0, inline_1.CanvasInlineCompact)();
    });
}
exports.InlineJSCanvas = InlineJSCanvas;
