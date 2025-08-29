export function TestPoint(point, position, size, scale) {
    const xEnd = position.x + (size.width * scale.horizontal);
    const yEnd = position.y + (size.height * scale.vertical);
    return (point.x >= Math.min(position.x, xEnd) &&
        point.x < Math.max(position.x, xEnd) &&
        point.y >= Math.min(position.y, yEnd) &&
        point.y < Math.max(position.y, yEnd));
}
