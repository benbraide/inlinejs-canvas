import { Property } from "@benbraide/inlinejs-element";
import { CanvasPaintModeType } from "../types";
import { CanvasShapeElement } from "./shape"
import { AssignContextValue, TryGuardContext } from "../utilities/context";

export class CanvasFullShapeElement extends CanvasShapeElement{
    @Property({ type: 'number', spread: 'size' })
    public width = 0;

    @Property({ type: 'number', spread: 'size' })
    public height = 0;

    @Property({ type: 'string' })
    public mode: CanvasPaintModeType = 'fill';

    @Property({ type: 'boolean' })
    public UpdateStrokeProperty(value: boolean){
        this.mode = (value ? 'stroke' : 'fill');
    }

    @Property({ type: 'boolean' })
    public UpdateFillProperty(value: boolean){
        this.mode = (value ? 'fill' : 'stroke');
    }

    @Property({ type: 'string' })
    public color = '';

    @Property({ type:'number', spread: 'line' })
    public lineWidth = 1;

    @Property({ type:'string', spread: 'line' })
    public lineCap: CanvasLineCap = 'butt';

    @Property({ type:'string', spread: 'line' })
    public lineJoin: CanvasLineJoin = 'miter';
    
    public constructor(){
        super();
    }

    protected Paint_(ctx: CanvasRenderingContext2D | Path2D){
        TryGuardContext(ctx, (ctx) => {
            ['lineWidth', 'lineCap', 'lineJoin'].forEach(prop => AssignContextValue(ctx, prop, this[prop]));

            (this.mode === 'stroke') && AssignContextValue(ctx, 'strokeStyle', (this.color || 'black'));
            (this.mode !== 'stroke') && AssignContextValue(ctx, 'fillStyle', (this.color || 'black'));
            
            this.Render_(ctx);
        });
    }
}
