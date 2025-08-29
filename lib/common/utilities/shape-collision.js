"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIntersectionDirection = exports.GetIntersectionRectangle = exports.CheckRectangleCircleCollision = exports.CheckCircleCollision = exports.CheckRectangleCollision = void 0;
function CheckRectangleCollision(rect1, rect2, includeTouch = true) {
    if (includeTouch) {
        return (rect1.x <= (rect2.x + rect2.width) && (rect1.x + rect1.width) >= rect2.x && rect1.y <= (rect2.y + rect2.height) && (rect1.y + rect1.height) >= rect2.y);
    }
    return (rect1.x < (rect2.x + rect2.width) && (rect1.x + rect1.width) > rect2.x && rect1.y < (rect2.y + rect2.height) && (rect1.y + rect1.height) > rect2.y);
}
exports.CheckRectangleCollision = CheckRectangleCollision;
function CheckCircleCollision(circle1, circle2, includeTouch = true) {
    const distanceSq = (Math.pow((circle1.x - circle2.x), 2)) + (Math.pow((circle1.y - circle2.y), 2));
    const radiiSumSq = Math.pow((circle1.radius + circle2.radius), 2);
    return (includeTouch ? (distanceSq <= radiiSumSq) : (distanceSq < radiiSumSq));
}
exports.CheckCircleCollision = CheckCircleCollision;
function CheckRectangleCircleCollision(rect, circle, includeTouch = true) {
    const circleDistanceX = Math.abs(circle.x - rect.x - (rect.width / 2));
    const circleDistanceY = Math.abs(circle.y - rect.y - (rect.height / 2));
    if (circleDistanceX > ((rect.width / 2) + circle.radius)) {
        return false;
    }
    if (circleDistanceY > ((rect.height / 2) + circle.radius)) {
        return false;
    }
    if (includeTouch ? (circleDistanceX <= (rect.width / 2)) : (circleDistanceX < (rect.width / 2))) {
        return true;
    }
    if (includeTouch ? (circleDistanceY <= (rect.height / 2)) : (circleDistanceY < (rect.height / 2))) {
        return true;
    }
    const cornerDistanceSq = (Math.pow((circleDistanceX - rect.width / 2), 2)) + (Math.pow((circleDistanceY - rect.height / 2), 2));
    return (includeTouch ? (cornerDistanceSq <= (Math.pow(circle.radius, 2))) : (cornerDistanceSq < (Math.pow(circle.radius, 2))));
}
exports.CheckRectangleCircleCollision = CheckRectangleCircleCollision;
function GetIntersectionRectangle(rect1, rect2, includeTouch = true) {
    const left = Math.max(rect1.x, rect2.x), top = Math.max(rect1.y, rect2.y);
    const right = Math.min(rect1.x + rect1.width, rect2.x + rect2.width), bottom = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
    if (includeTouch ? (left <= right && top <= bottom) : (left < right && top < bottom)) {
        return {
            x: left,
            y: top,
            width: (right - left),
            height: (bottom - top),
        };
    }
    return null;
}
exports.GetIntersectionRectangle = GetIntersectionRectangle;
function GetIntersectionDirection(intersection, rect) {
    const rectCenterX = rect.x + (rect.width / 2), rectCenterY = rect.y + (rect.height / 2);
    const intersectionCenterX = intersection.x + (intersection.width / 2), intersectionCenterY = intersection.y + (intersection.height / 2);
    if (intersectionCenterX < rectCenterX) {
        if (intersectionCenterY < rectCenterY) {
            return 'nw';
        }
        if (intersectionCenterY > rectCenterY) {
            return 'sw';
        }
        return 'w';
    }
    if (intersectionCenterX > rectCenterX) {
        if (intersectionCenterY < rectCenterY) {
            return 'ne';
        }
        if (intersectionCenterY > rectCenterY) {
            return 'se';
        }
        return 'e';
    }
    if (intersectionCenterY < rectCenterY) {
        return 'n';
    }
    if (intersectionCenterY > rectCenterY) {
        return 's';
    }
    return '';
}
exports.GetIntersectionDirection = GetIntersectionDirection;
