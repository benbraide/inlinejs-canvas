"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPoint = void 0;
function TestPoint(point, position, size, scale) {
    return (point.x >= position.x && point.y >= position.y && point.x < (position.x + (size.width * scale.horizontal)) && point.y < (position.y + (size.height * scale.vertical)));
}
exports.TestPoint = TestPoint;
